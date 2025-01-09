import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const developers = await User.find({ role: "developer" })
    .populate("myProjects", "projectDetails.projectName")
    // .select(
    //   "username firstName lastName email phone role myProjects workStatus performance position"
    // );

    if (developers.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No developers found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      developers,
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
