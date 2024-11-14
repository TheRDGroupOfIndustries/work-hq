import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project, { ProjectDBTypes } from "@/models/Project";

export const POST = async (request: NextRequest) => {
  const {
    title,
    description,
    client,
    manager,
    assigned_team,
    vendor,
    start_date,
    end_date,
    status,
    technologies,
    milestones,
    files,
    progress,
    notes,
    figma_link,
    figma_iframe_link,
    github_link,
    deployed_link,
  }: ProjectDBTypes = await request.json();

  await connectToMongoDB();

  try {
    const project = new Project({
      title,
      description,
      client,
      manager,
      assigned_team,
      vendor,
      start_date,
      end_date,
      status,
      technologies,
      milestones,
      files,
      progress,
      notes,
      figma_link,
      figma_iframe_link,
      github_link,
      deployed_link,
    });

    const savedProject = await project.save();

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
