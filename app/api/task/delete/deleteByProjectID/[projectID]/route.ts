import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const DELETE = async (request: NextRequest, { params }: { params: { projectID: string } }) => {
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
    const deletedTasks = await Task.deleteMany({ projectID });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Tasks deleted successfully!",
      deletedCount: deletedTasks.deletedCount,
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
