import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const PUT = async (request: NextRequest) => {
  const { _id, additionalFiles } = await request.json();

  console.log(additionalFiles);
  await connectToMongoDB();

  try {
    const existingProject = await Project.findById(_id);
    if (!existingProject) {
      return NextResponse.json({
        success: false,
        error: "Project not found!",
      });
    }

    // push new additional files to the existing array
    if (additionalFiles && Array.isArray(additionalFiles)) {
      existingProject.projectDetails.additionalFiles.push(...additionalFiles);
    }

    const updatedProject = await existingProject.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Additional files added successfully!",
      project: updatedProject,
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
