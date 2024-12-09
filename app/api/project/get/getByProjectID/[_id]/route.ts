import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const GET = async (
  request: NextRequest,
  { params }: { params: { _id: string } }
) => {
  await connectToMongoDB();

  try {
    const project = await Project.findById(params._id);

    if (!project) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Project not found!",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project fetched successfully!",
      project,
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
