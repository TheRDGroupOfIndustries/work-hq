import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const PUT = async (request: NextRequest) => {
  try {
    const { email, first_name, last_name, password } = await request.json();
    // console.log(email, first_name, last_name, password);

    await connectToMongoDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("Error: User doesn't exist!", { status: 400 });
    }

    const updatedFields: string[] = [];

    if (first_name && existingUser.first_name !== first_name) {
      existingUser.first_name = first_name;
      updatedFields.push("first_name");
    }
    if (last_name && existingUser.last_name !== last_name) {
      existingUser.last_name = last_name;
      updatedFields.push("last_name");
    }

    if (password) {
      existingUser.password = await bcrypt.hash(password, 5);
      if (!existingUser.integrationsAuth.includes("email-password")) {
        existingUser.integrationsAuth.push("email-password");
      }
      updatedFields.push("password");
    }

    await existingUser.save();

    return new NextResponse(
      `Updated ${updatedFields.join(", ")} successfully!`,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating user!", { status: 500 });
  }
};
