import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const PUT = async (request: NextRequest) => {
  const {
    _id,
    title,
    description,
    client,
    manager,
    assigned_team,
    vendor,
    ceo,
    start_date,
    end_date,
    status,
    budget,
    technologies,
    milestones,
    files,
    progress,
    notes,
  } = await request.json();

  await connectToMongoDB();

  try {
    const existingProject = await Project.findById(_id);

    if (!existingProject) {
      return NextResponse.json({
        success: false,
        error: "Project not found!",
      });
    }

    // const updatedFields: ProjectValues = {};
    const changedFields = [];

    if (existingProject.title !== title) {
      existingProject.title = title;
      changedFields.push("title");
    }
    if (existingProject.description !== description) {
      existingProject.description = description;
      changedFields.push("description");
    }
    if (existingProject.client !== client) {
      existingProject.client = client;
      changedFields.push("client");
    }
    if (existingProject.manager !== manager) {
      existingProject.manager = manager;
      changedFields.push("manager");
    }
    if (existingProject.assigned_team !== assigned_team) {
      existingProject.assigned_team = assigned_team;
      changedFields.push("assigned_team");
    }
    if (existingProject.vendor !== vendor) {
      existingProject.vendor = vendor;
      changedFields.push("vendor");
    }
    if (existingProject.ceo !== ceo) {
      existingProject.ceo = ceo;
      changedFields.push("ceo");
    }
    if (existingProject.start_date !== start_date) {
      existingProject.start_date = start_date;
      changedFields.push("start_date");
    }
    if (existingProject.end_date !== end_date) {
      existingProject.end_date = end_date;
      changedFields.push("end_date");
    }
    if (existingProject.status !== status) {
      existingProject.status = status;
      changedFields.push("status");
    }
    if (existingProject.budget !== budget) {
      existingProject.budget = budget;
      changedFields.push("budget");
    }
    if (existingProject.technologies !== technologies) {
      existingProject.technologies = technologies;
      changedFields.push("technologies");
    }
    if (existingProject.milestones !== milestones) {
      existingProject.milestones = milestones;
      changedFields.push("milestones");
    }
    if (existingProject.files !== files) {
      existingProject.files = files;
      changedFields.push("files");
    }
    if (existingProject.progress !== progress) {
      existingProject.progress = progress;
      changedFields.push("progress");
    }
    if (existingProject.notes !== notes) {
      existingProject.notes = notes;
      changedFields.push("notes");
    }

    const updatedProject = await existingProject.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project updated successfully!",
      project: updatedProject,
      updatedFields: changedFields,
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
