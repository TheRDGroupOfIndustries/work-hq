import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const GET = async (request: NextRequest, { params }: { params: { taskID: string } }) => {
  const { taskID } = params;

  if (!taskID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Task ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const task = await Task.findById(taskID);

    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Task not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      task,
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
