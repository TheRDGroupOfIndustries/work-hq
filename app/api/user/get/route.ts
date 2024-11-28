import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const users = await User.find().select(
      "username firstName lastName email phone role clients vendorID allProjects myProjects workStatus"
    );

    return NextResponse.json({
      status: 200,
      success: true,
      users,
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
