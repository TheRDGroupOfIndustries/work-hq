import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const DELETE = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  const { userID } = params;

  if (!userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "User ID is required.",
    });
  }

  await connectToMongoDB();

  try {
    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong.",
    });
  }
};
