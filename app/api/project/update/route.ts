import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";
import User from "@/models/User";

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
      // console.log("newTeams", newTeams);
    
      const existingTeams = existingProject.developmentDetails.teams.map((id: string) => id.toString());
      // console.log("existingTeams", existingTeams);
    
      // Add new IDs that are not already in existingTeams
      const additions = newTeams.filter((id: string) => !existingTeams.includes(id));
      // console.log("additions", additions);
    
      // Remove IDs from existingTeams that are not in newTeams
      const removals = existingTeams.filter((id: string) => !newTeams.includes(id));
      // console.log("removals", removals);
    
      // Update existingTeams only with additions
      if (additions.length || removals.length) {
        existingProject.developmentDetails.teams = [
          ...existingTeams, // Retain existing teams
          ...additions,     // Add only new unique IDs
        ];
        changedFields.push("developmentDetails.teams");

        // Add new project in user myProjects array
        if (additions.length) {
          await Promise.all(
            additions.map(async (id: string) => {
              const user = await User.findById(id);
              if (user) {
                if (!user.myProjects.includes(existingProject._id)) {
                  user.myProjects.push(existingProject._id);
                }
                await user.save();
                return user;
              }
              return null;
            })
          );
        }
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
