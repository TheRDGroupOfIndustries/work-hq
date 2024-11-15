import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project, { ProjectDBTypes } from "@/models/Project";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  const {
    title,
    description,
    logo,
    start_date,
    end_date,
    technologies,
    milestones,
    files,
    project_ref,
    notes,
    progress = 0,
    status = "pending",
    client,
    vendor,
  }: ProjectDBTypes = await request.json();

  await connectToMongoDB();

  try {
    const project = new Project({
      title,
      description,
      logo,
      start_date,
      end_date,
      technologies,
      milestones,
      files,
      project_ref,
      notes,
      status,
      progress,
      client,
      vendor,
    });

    const savedProject = await project.save();

    if (!savedProject) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Failed to create project!",
      });
    }

    await User.findOneAndUpdate(client ? { _id: client } : { _id: vendor }, {
      $push: {
        projects: { _id: savedProject._id, title: savedProject.title },
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project created successfully!",
      project: savedProject,
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
