import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task, { TaskDBTypes } from "@/models/Task";
import { Schema } from "mongoose";

export const GET = async (
  request: NextRequest,
  { params }: { params: { projectID: string } }
) => {
  await connectToMongoDB();

  try {
    // Get all tasks for the project that have assignedTo field
    const tasks = await Task.find({
      projectID: params.projectID,
      assignedTo: { $exists: true, $ne: null }
    }).populate('assignedTo', 'name email role avatar'); // Add fields you need from User

    // Group tasks by user and their status
    const memberTasks = tasks.reduce((acc, task) => {
      const userId = task.assignedTo._id.toString();

      if (!acc[userId]) {
        acc[userId] = {
          userDetails: {
            _id: task.assignedTo._id,
            name: task.assignedTo.name,
            email: task.assignedTo.email,
            role: task.assignedTo.role,
            avatar: task.assignedTo.avatar,
          },
          tasks: {
            completed: [],
            inProgress: [],
            pending: [],
          }
        };
      }

      // Add task to the corresponding status array
      acc[userId].tasks[task.status].push(task);

      return acc;
    }, {} as Record<string, {
      userDetails: {
        _id: Schema.Types.ObjectId;
        name: string;
        email: string;
        role: string;
        avatar?: string;
      };
      tasks: {
        completed: TaskDBTypes[];
        inProgress: TaskDBTypes[];
        pending: TaskDBTypes[];
      };
    }>);

    // Convert to array
    const membersArray = Object.values(memberTasks);

    return NextResponse.json({
      status: 200,
      success: true,
      members: membersArray
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Failed to fetch member tasks"
    });
  }
};