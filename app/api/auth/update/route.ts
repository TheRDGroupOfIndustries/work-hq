import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const PUT = async (request: NextRequest) => {
  try {
    const { email, firstName, lastName, password } = await request.json();
    // console.log(email, firstName, lastName, password);

    await connectToMongoDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("Error: User doesn't exist!", { status: 400 });
    }

    const updatedFields: string[] = [];

    if (firstName && existingUser.firstName !== firstName) {
      existingUser.firstName = firstName;
      updatedFields.push("firstName");
    }
    if (lastName && existingUser.lastName !== lastName) {
      existingUser.lastName = lastName;
      updatedFields.push("lastName");
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
