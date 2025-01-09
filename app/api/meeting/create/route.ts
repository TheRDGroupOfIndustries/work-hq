import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import Project from "@/models/Project";
import User from "@/models/User";
import { CustomUser } from "@/lib/types";
import { transporter } from "@/app/api/core";
import { authOptions } from "@/lib/authOptions";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;

  const {
    title,
    meetingDescription,
    date,
    startTime,
    endTime,
    projectID,
    isInstant,
    attendees,
  } = await request.json();

  if (
    !title ||
    !meetingDescription ||
    !date ||
    !startTime ||
    !endTime ||
    !projectID ||
    isInstant === undefined
  ) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Missing required fields",
    });
  }

  await connectToMongoDB();

  try {
    let status: "upcoming" | "requested" | "cancelled" | "completed" | "inProgress";
    let updatedTitle = title;
    let updatedAttendees = attendees || [];

    if (user.role === "client") {
      status = "requested";
      const project = await Project.findById(projectID);
      if (!project) {
        throw new Error("Project not found");
      }
      updatedTitle = `${title} (${project.projectDetails.projectName})`;
      
      // Add CEO and manager to attendees
      const ceoAndManagers = await User.find({ role: { $in: ["ceo", "manager"] } });
      updatedAttendees = [...updatedAttendees, ...ceoAndManagers.map(user => user._id)];
    } else {
      status = new Date(date) > new Date() ? "upcoming" : "inProgress";
    }

    // Always add the creator to attendees
    if (!updatedAttendees.includes(user._id)) {
      updatedAttendees.push(user._id);
    }

    const meeting = new Meeting({
      title: updatedTitle,
      createdBy: user._id,
      projectID,
      meetingDescription,
      attendees: updatedAttendees,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status,
      isInstant,
    });

    const savedMeeting = await meeting.save();

    if (!savedMeeting) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Failed to create meeting!",
      });
    }

    if (user.role === "client") {
      const project = await Project.findById(projectID);
      if (!project) {
        throw new Error("Project not found");
      }
      const ceoAndManagers = await User.find({
        role: { $in: ["ceo", "manager"] },
      });

      for (const recipient of ceoAndManagers) {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: recipient.email,
          subject: "New Meeting Request",
          text: `Client ${user.firstName} ${user.lastName} requested a meeting on ${new Date(date).toLocaleDateString()} at ${new Date(startTime).toLocaleTimeString()} for project ${project.projectDetails.projectName}.`,
          html: `<p>Client ${user.firstName} ${user.lastName} requested a meeting on ${new Date(date).toLocaleDateString()} at ${new Date(startTime).toLocaleTimeString()} for project ${project.projectDetails.projectName}.</p>`,
        });
      }
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting created successfully!",
      meeting: savedMeeting,
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};