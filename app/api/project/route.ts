import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const projects = await Project.find();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Projects fetched successfully!",
      projects,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
