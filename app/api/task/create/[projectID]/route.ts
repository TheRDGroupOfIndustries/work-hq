import Project from "@/models/Project";
import Task from "@/models/Task";
import User from "@/models/User";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { projectID: string } }
) => {
  const { projectID } = params;
  const {
    issueSubject,
    estimatedTime,
    assignedTo,
    status,
    createdBy,
    priority,
    dueDate,
  } = await request.json();

  // Validate required fields
  if (
    !issueSubject ||
    typeof estimatedTime !== "number" ||
    !assignedTo ||
    !status ||
    !createdBy ||
    !projectID ||
    !priority
  ) {
    return NextResponse.json(
      {
        status: 400,
        success: false,
        error: "Required fields are missing or invalid",
      },
      { status: 400 }
    );
  }

  // Connect to the database
  await connectToMongoDB();

  try {
    // Fetch the current task count for the project
    const taskCount = await Task.countDocuments({ projectID });

    // Create a new task
    const task = new Task({
      taskNo: taskCount + 1, // Increment task number
      priority,
      issueSubject,
      estimatedTime,
      assignedTo,
      status,
      createdBy,
      projectID,
      dueDate,
      createdAt: new Date(),
    });

    const savedTask = await task.save();

    await User.findByIdAndUpdate(
      assignedTo,
      { $push: { tasks: savedTask._id } },
      { new: true }
    )

    await Project.findByIdAndUpdate(
      projectID,
      { $push: { "developmentDetails.tasks": savedTask._id } },
      { new: true }
    )

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Task created successfully!",
        task: savedTask,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: "Something went wrong while creating the task!",
      },
      { status: 500 }
    );
  }
};
