import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Task from "@/models/Task";
import User from "@/models/User";
import Project from "@/models/Project";

export const PUT = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  const { userID } = params;
  const { taskId } = await request.json();

  if (!taskId) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Task ID is required",
    });
  }

  await connectToMongoDB();

  try {
    // Get the task first to get projectID
    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Task not found",
      });
    }

    // Get user and project
    const [user, project] = await Promise.all([
      User.findById(userID),
      Project.findById(task.projectID)
    ]);

    if (!user || !project) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User or Project not found",
      });
    }

    let totalHoursSpend = 0;

    if (user.workStatus !== "onBreak") {
      const workingSince = new Date(task.workingSince);
      const currentTime = new Date();

      // Get today's total break time from user's totalSpendHours
      const todaySpendHours = user.totalSpendHours?.find(
        (sh: { date: string; totalHours: number }) => 
          new Date(sh.date).toDateString() === new Date().toDateString()
      );

      if (todaySpendHours) {
        const totalWorkTime = currentTime.getTime() - workingSince.getTime();
        // const loggedInTime = new Date(todaySpendHours.loggedInTime).getTime();
        const breakTime = totalWorkTime - (todaySpendHours.totalHours * 60 * 60 * 1000);
        
        // Calculate total hours excluding break time
        totalHoursSpend = (totalWorkTime - breakTime) / (1000 * 60 * 60);
      } else {
        // If no breaks, simply calculate total time
        totalHoursSpend = (currentTime.getTime() - workingSince.getTime()) / (1000 * 60 * 60);
      }
    }

    // Calculate performance index
    const performanceScore = calculatePerformance(totalHoursSpend, task.estimatedTime);

    // Get all completed tasks for this user
    const completedTasks = await Task.find({
      assignedTo: userID,
      status: "completed"
    });

    // Calculate average performance including the current task
    const totalPerformance = completedTasks.reduce((sum, task) => {
      const taskPerformance = calculatePerformance(task.totalHoursSpend || 0, task.estimatedTime);
      return sum + taskPerformance;
    }, performanceScore);

    const averagePerformance = Math.round(totalPerformance / (completedTasks.length + 1));

    // Update project hours
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    let projectUpdate;
    if (project.developmentDetails?.projectHours?.some(
      (ph: { date: string }) => new Date(ph.date).getTime() === today.getTime()
    )) {
      // Update existing date's hours
      projectUpdate = await Project.findByIdAndUpdate(
        task.projectID,
        {
          $inc: {
            'developmentDetails.projectHours.$[elem].totalHours': totalHoursSpend
          }
        },
        {
          arrayFilters: [{ 'elem.date': today }],
          new: true
        }
      );
    } else {
      // Add new date entry
      projectUpdate = await Project.findByIdAndUpdate(
        task.projectID,
        {
          $push: {
            'developmentDetails.projectHours': {
              date: today,
              totalHours: totalHoursSpend
            }
          }
        },
        { new: true }
      );
    }

    // Update both task and user
    const [updatedTask] = await Promise.all([
      Task.findByIdAndUpdate(
        taskId,
        {
          $set: {
            status: "completed",
            totalHoursSpend
          }
        },
        { new: true }
      ),
      User.findByIdAndUpdate(
        userID,
        {
          $set: {
            performance: averagePerformance
          }
        },
        { new: true }
      )
    ]);

    return NextResponse.json({
      status: 200,
      success: true,
      task: updatedTask,
      currentTaskPerformance: performanceScore,
      overallPerformance: averagePerformance,
      projectHours: projectUpdate.developmentDetails.projectHours
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

function calculatePerformance(actualHours: number, estimatedMinutes: number): number {
  // Convert estimated time from minutes to hours
  const estimatedHours = estimatedMinutes / 60;
  
  // Calculate percentage difference
  const timeDifference = Math.abs(actualHours - estimatedHours);
  const percentageDeviation = (timeDifference / estimatedHours) * 100;
  
  // Base performance score (100% - deviation)
  let performance = Math.max(0, 100 - percentageDeviation);
  
  // Bonus for completing earlier (but not too early)
  if (actualHours < estimatedHours) {
    // Maximum 10% bonus for early completion
    const earlyBonus = Math.min(
      10,
      ((estimatedHours - actualHours) / estimatedHours) * 20
    );
    performance = Math.min(100, performance + earlyBonus);
  }
  
  // Penalty for very early completion (might indicate poor estimation)
  if (actualHours < estimatedHours * 0.5) {
    performance *= 0.8; // 20% penalty for completing in less than half the estimated time
  }
  
  // Penalty for very late completion
  if (actualHours > estimatedHours * 2) {
    performance *= 0.7; // 30% penalty for taking more than double the estimated time
  }
  
  return Math.round(performance);
}
