import Project from "@/models/Project";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { _id: string } }
) => {
  await connectToMongoDB();

  try {
    const project = await Project.findById(params._id)
    .populate({
      path: "developmentDetails.tasks",
      match: {}, // No `$exists` here; populate will ignore missing fields automatically
    })
    .populate({
      path: "developmentDetails.teams",
      populate: {
        path: "tasks",
        match: {}, // No `$exists` here either
        select: "status",
      },
    });


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
