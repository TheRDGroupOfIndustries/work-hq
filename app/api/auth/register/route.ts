import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import { sendOtpToPhone, transporter, verifyOtpFromPhone } from "../../core";

export const POST = async (request: NextRequest) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    isEmail,
    otp,
    checkOtpCode,
    role = "client",
  } = await request.json();
  console.log("role: ", role);
  // console.log(firstName,lastName,email,password,phone,isEmail,otp,checkOtpCode);

  await connectToMongoDB();

  if (isEmail) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists with this email!" }),
        { status: 200 }
      );
    }
  } else {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists with this phone number!" }),
        { status: 200 }
      );
    }
  }

  let otpCode = checkOtpCode || "";

  if (!otp) {
    console.log("sending otp");

    if (isEmail) {
      otpCode = Math.floor(100000 + Math.random() * 9000);
      const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${firstName}!!</h1>
      <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's an OTP for your email verification <b style="color: #2fff00;">${otpCode}</b><br /></span>`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Work HQ - Verify your e-mail",
        text: "Email Verification",
        html: body,
      });

      return new NextResponse(JSON.stringify({ otpCode }), {
        status: 201,
        // message: "Otp has been sent to your email for verification.",
      });
    } else {
      try {
        // sending otp to phone number
        const isOtpSent = await sendOtpToPhone(phone);

        if (isOtpSent) {
          return new NextResponse(JSON.stringify({ otpCode }), {
            status: 201,
          });
        }
      } catch (error) {
        console.log("Error sending OTP to phone:", error);
        return new NextResponse(
          JSON.stringify({ message: "Internal Server Error", error }),
          { status: 500 }
        );
      }
    }
  }

  // console.log(otp, " -> ", checkOtpCode);

  if (otp) {
    let newUser;
    const hashPassword = await bcrypt.hash(password, 5); // converting password into hash-code

    if (isEmail) {
      if (otp == checkOtpCode) {
        newUser = new User({
          username: firstName,
          firstName,
          lastName,
          email,
          loginStep: 0,
          password: hashPassword,
          auth_integrated: "email-password",
          role,
        });
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Invalid OTP has been entered for this e-mail!" }),
          { status: 402 }
        );
      }
    } else {
      const isOtpValid = await verifyOtpFromPhone(phone, otp);

      if (isOtpValid) {
        newUser = new User({
          username: firstName,
          firstName,
          lastName,
          phone,
          loginStep: 0,
          password: hashPassword,
          auth_integrated: "phone-password",
          role,
        });
      } else {
        return new NextResponse(
          JSON.stringify({ message: "Invalid OTP has been entered for this phone number!" }),
          { status: 402 }
        );
      }
    }

    try {
      await newUser.save();
      if (isEmail) {
        const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${firstName}!!</h1>
            <p style="color: #333; font-size: 18px; font-family: 'Arial', sans-serif;">Thanks for registering yourself to the RDGoIdust. Work HQ</p>`;

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Work HQ - Registration successful",
          text: "Registration successful",
          html: body,
        });
      }
      console.log("User Registered successfully!");
      return new NextResponse(
        JSON.stringify({ message: "User Registered successfully!" }),
        { status: 200 }
      );
    } catch (error) {
      console.log("Error saving new user:", error);
      return new NextResponse(
        JSON.stringify({ message: "Internal Server Error", error }),
        { status: 500 }
      );
    }
  }
  console.log("Unexpected error occurred");
  return new NextResponse(
    JSON.stringify({ message: "Internal Server Error" }),
    { status: 500 }
  );
};