import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const GET = async (
  request: NextRequest,
  { params }: { params: { projectID: string } }
) => {
  const { projectID } = params;

  if (!projectID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Project ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const tasks = await Task.find({ projectID });

    if (tasks.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "No tasks found for this project ID",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
