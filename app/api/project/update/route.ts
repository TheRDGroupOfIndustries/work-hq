import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const PUT = async (request: NextRequest) => {
  const { _id, ...updateData } = await request.json();
  await connectToMongoDB();

  try {
    const existingProject = await Project.findById(_id);
    if (!existingProject) {
      return NextResponse.json({
        success: false,
        error: "Project not found!"
      });
    }

    const changedFields = [];

    // Handle projectDetails updates
    if (updateData.projectDetails) {
      Object.keys(updateData.projectDetails).forEach(key => {
        if (JSON.stringify(existingProject.projectDetails[key]) !== 
            JSON.stringify(updateData.projectDetails[key])) {
          existingProject.projectDetails[key] = updateData.projectDetails[key];
          changedFields.push(`projectDetails.${key}`);
        }
      });
    }

    // Handle companyDetails updates
    if (updateData.companyDetails) {
      Object.keys(updateData.companyDetails).forEach(key => {
        if (JSON.stringify(existingProject.companyDetails[key]) !== 
            JSON.stringify(updateData.companyDetails[key])) {
          existingProject.companyDetails[key] = updateData.companyDetails[key];
          changedFields.push(`companyDetails.${key}`);
        }
      });
    }

    // Handle developmentDetails updates
    if (updateData.developmentDetails) {
      Object.keys(updateData.developmentDetails).forEach(key => {
        if (JSON.stringify(existingProject.developmentDetails[key]) !== 
            JSON.stringify(updateData.developmentDetails[key])) {
          existingProject.developmentDetails[key] = updateData.developmentDetails[key];
          changedFields.push(`developmentDetails.${key}`);
        }
      });
    }

    // Handle projectID update
    if (updateData.projectID && existingProject.projectID !== updateData.projectID) {
      existingProject.projectID = updateData.projectID;
      changedFields.push('projectID');
    }

    if (updateData.teams) {
      const newTeams = updateData.teams.map((id: string) => id.toString());
      const existingTeams = existingProject.developmentDetails.teams.map((id: string) => id.toString());
      
      const additions = newTeams.filter((id: string) => !existingTeams.includes(id));
      const removals = existingTeams.filter((id: string) => !newTeams.includes(id));
      
      if (additions.length || removals.length) {
        existingProject.developmentDetails.teams = newTeams;
        changedFields.push("developmentDetails.teams");
      }
    }

    const updatedProject = await existingProject.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Project updated successfully!",
      project: updatedProject,
      updatedFields: changedFields
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!"
    });
  }
};
