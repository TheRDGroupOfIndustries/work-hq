import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { taskID: string } }
) => {
  const { taskID } = params;
  const updates = await request.json();

  if (!taskID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Task ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskID, updates, {
      new: true,
    });

    if (!updatedTask) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Task not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task updated successfully!",
      task: updatedTask,
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
