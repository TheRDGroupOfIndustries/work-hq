import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";

export const POST = async (request: NextRequest, { params }: { params: { projectID: string } }) => {
  const { projectID } = params;
  const { taskNo, issueSubject, estimatedTime, assignedTo, status, createdBy } = await request.json();

  if (!taskNo || !issueSubject || !estimatedTime || !assignedTo || !status || !createdBy || !projectID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

  await connectToMongoDB();

  try {
    const task = new Task({
      taskNo,
      issueSubject,
      estimatedTime,
      assignedTo,
      status,
      createdBy,
      projectID,
      createdAt: new Date(),
    });

    const savedTask = await task.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Task created successfully!",
      task: savedTask,
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
