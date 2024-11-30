import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

interface UpdateFields {
  status: "inProgress";
  workingSince: Date;
  estimatedTime: number;
  assignedTo?: string;  // Optional field
}

export const PUT = async (request: NextRequest) => {

  const { taskId, estimatedTime, assignedTo } = await request.json();

  if (!taskId || !estimatedTime) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

  await connectToMongoDB();

  try {
    const updateFields: UpdateFields = {
      status: "inProgress",
      workingSince: new Date(),
      estimatedTime,
    };

    // If assignedTo is provided, update the assigned user
    if (assignedTo) {
      updateFields.assignedTo = assignedTo;
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateFields },
      { new: true }
    );

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
