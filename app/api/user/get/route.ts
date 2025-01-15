import User from "@/models/User";
import connectToMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const users = await User.find()
      .select(
        "username firstName lastName email phone role clients vendorID allProjects myProjects workStatus profileImage position"
      )
      .populate("myProjects", "projectDetails.projectName");

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
