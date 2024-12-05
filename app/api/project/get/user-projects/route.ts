import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const POST = async (req: NextRequest) => {
  const { userProjectsIds } = await req.json();

  try {
    await connectToMongoDB();

    const projects = await Project.find({ _id: { $in: userProjectsIds } })
      .select(
        "projectDetails.projectName projectDetails.category createdAt companyDetails.logo"
      )
      .sort({ _id: -1 })
      .lean(); // optional: return plain js objects instead of Mongoose documents

    // console.log(projects);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Projects fetched successfully!",
      projects,
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
