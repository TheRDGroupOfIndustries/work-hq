import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const DELETE = async (request: NextRequest, { params }: { params: { taskID: string } }) => {
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
    const deletedTask = await Task.findByIdAndDelete(taskID);

    if (!deletedTask) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Task not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task deleted successfully!",
      task: deletedTask,
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
