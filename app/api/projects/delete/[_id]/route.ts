import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { _id: string } }
) => {
  try {
    await connectToMongoDB();
    const project = await Project.findByIdAndDelete(params._id);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project deleted successfully!",
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
