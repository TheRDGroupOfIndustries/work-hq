import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  //   console.log(email, password);

  await connectToMongoDB();

  const existingUser = await User.findOne({ email });

  // convert password into hash-code
  const hashPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashPassword;

  existingUser.resetPasswordToken = undefined;
  existingUser.resetPasswordTokenExpiry = undefined;

  try {
    await existingUser.save();

    return new NextResponse("Updated the Password!", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error : " + error, {
      status: 500,
    });
  }
};
