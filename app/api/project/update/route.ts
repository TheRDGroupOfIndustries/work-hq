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

    const changedFields = [];

    if (existingProject.title !== title) {
      existingProject.title = title;
      changedFields.push("title");
    }
    if (existingProject.description !== description) {
      existingProject.description = description;
      changedFields.push("description");
    }
    if (existingProject.client.toString() !== client) {
      existingProject.client = client;
      changedFields.push("client");
    }
    if (existingProject.manager.toString() !== manager) {
      existingProject.manager = manager;
      changedFields.push("manager");
    }
    if (
      JSON.stringify(existingProject.assigned_team) !==
      JSON.stringify(assigned_team)
    ) {
      existingProject.assigned_team = assigned_team;
      changedFields.push("assigned_team");
    }
    if (existingProject.vendor?.toString() !== vendor) {
      existingProject.vendor = vendor;
      changedFields.push("vendor");
    }
    if (
      existingProject.start_date.toISOString() !==
      new Date(start_date).toISOString()
    ) {
      existingProject.start_date = start_date;
      changedFields.push("start_date");
    }
    if (
      existingProject.end_date?.toISOString() !==
      new Date(end_date).toISOString()
    ) {
      existingProject.end_date = end_date;
      changedFields.push("end_date");
    }
    if (existingProject.status !== status) {
      existingProject.status = status;
      changedFields.push("status");
    }
    if (
      JSON.stringify(existingProject.technologies) !==
      JSON.stringify(technologies)
    ) {
      existingProject.technologies = technologies;
      changedFields.push("technologies");
    }
    if (
      JSON.stringify(existingProject.milestones) !== JSON.stringify(milestones)
    ) {
      existingProject.milestones = milestones;
      changedFields.push("milestones");
    }
    if (JSON.stringify(existingProject.files) !== JSON.stringify(files)) {
      existingProject.files = files;
      changedFields.push("files");
    }
    if (existingProject.progress !== progress) {
      existingProject.progress = progress;
      changedFields.push("progress");
    }
    if (JSON.stringify(existingProject.notes) !== JSON.stringify(notes)) {
      existingProject.notes = notes;
      changedFields.push("notes");
    }
    if (existingProject.figma_link !== figma_link) {
      existingProject.figma_link = figma_link;
      changedFields.push("figma_link");
    }
    if (existingProject.figma_iframe_link !== figma_iframe_link) {
      existingProject.figma_iframe_link = figma_iframe_link;
      changedFields.push("figma_iframe_link");
    }
    if (existingProject.github_link !== github_link) {
      existingProject.github_link = github_link;
      changedFields.push("github_link");
    }
    if (existingProject.deployed_link !== deployed_link) {
      existingProject.deployed_link = deployed_link;
      changedFields.push("deployed_link");
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
