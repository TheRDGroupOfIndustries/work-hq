import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project, { ProjectDBTypes } from "@/models/Project";
import User from "@/models/User";
import { nanoid } from "nanoid";

export const POST = async (request: NextRequest) => {
  const {
    projectDetails,
    companyDetails,
    developmentDetails,
  }: ProjectDBTypes = await request.json();

  await connectToMongoDB();

  try {
    let projectId = nanoid(8); // Generate a unique 8-digit alphanumeric project ID

    while (await Project.findOne({ projectID: projectId })) {
      projectId = nanoid(8);
    } 


    const project = new Project({
      projectID: projectId,
      projectDetails,
      companyDetails,
      developmentDetails,
    });

    const savedProject = await project.save();

    if (!savedProject) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Failed to create project!",
      });
    }

    await User.findOneAndUpdate(
      { _id: companyDetails.clientID },
      {
        $push: {
          allProjects: savedProject._id,
        },
      }
    );

    if (projectDetails.hasVendor && projectDetails.vendorID) {
      await User.findOneAndUpdate(
        { _id: projectDetails.vendorID },
        {
          $push: {
            projects: { _id: savedProject._id, title: projectDetails.projectName },
          },
        }
      );
    }

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