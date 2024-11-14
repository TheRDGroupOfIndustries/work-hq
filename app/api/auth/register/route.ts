import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import { sendOtpToPhone, transporter, verifyOtpFromPhone } from "../../core";

export const POST = async (request: NextRequest) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    isEmail,
    otp,
    checkOtpCode,
  } = await request.json();

  // console.log(first_name,last_name,email,password,phone_number,isEmail,otp,checkOtpCode);

  await connectToMongoDB();

  if (isEmail) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists with this email!", {
        status: 400,
      });
    }
  } else {
    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      return new NextResponse("User already exists with this phone number!", {
        status: 400,
      });
    }
  }

  let otpCode = checkOtpCode || "";

  if (!otp) {
    console.log("sending otp");

    if (isEmail) {
      otpCode = Math.floor(100000 + Math.random() * 9000);
      const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${first_name}!!</h1>
      <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's an OTP for your email verification <b style="color: #2fff00;">${otpCode}</b><br /></span>`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Work HQ - Verify your e-mail",
        text: "Email Verification",
        html: body,
      });

      return new NextResponse(JSON.stringify(otpCode), {
        status: 201,
        // message: "Otp has been sent to your email for verification.",
      });
    } else {
      try {
        // sending otp to phone number
        const isOtpSent = await sendOtpToPhone(phone_number);

        if (isOtpSent) {
          return new NextResponse(JSON.stringify(otpCode), {
            status: 201,
          });
        }
      } catch (error) {
        return new NextResponse("Internal Server Error : " + error, {
          status: 500,
        });
      }
    }
  }

  // console.log(otp, " -> ", checkOtpCode);

  if (otp) {
    let newUser;
    const hashPassword = await bcrypt.hash(password, 5); // converting password into hash-code

    if (isEmail) {
      if (otp == checkOtpCode) {
        const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${first_name}!!</h1>
            <p style="color: #333; font-size: 18px; font-family: 'Arial', sans-serif;">Thanks for registering yourself to the RDGoIdust. Work HQ</p>`;

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Work HQ - Registeration successful",
          text: "Registeration successful",
          html: body,
        });

        newUser = new User({
          first_name,
          last_name,
          email,
          password: hashPassword,
          auth_integrated: "email-password",
        });
      } else {
        return new NextResponse(
          "InValid OTP has been entered for this e-mail!",
          { status: 402 }
        );
      }
    } else {
      const isOtpValid = await verifyOtpFromPhone(phone_number, otp);

      if (isOtpValid) {
        newUser = new User({
          first_name,
          last_name,
          phone_number,
          password: hashPassword,
          auth_integrated: "phone-password",
        });
      } else {
        return new NextResponse(
          "InValid OTP has been entered for this phone number!",
          { status: 402 }
        );
      }
    }

    try {
      await newUser.save();
      return new NextResponse("User Registered successfully!", {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("Internal Server Error : " + error, {
        status: 500,
      });
    }
  }
  return new NextResponse("Internal Server Error!", { status: 500 });
};
