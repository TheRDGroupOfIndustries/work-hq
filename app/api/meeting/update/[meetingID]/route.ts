import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import User from "@/models/User";
import Project from "@/models/Project";
import { transporter } from "@/app/api/core";
import { CustomUser } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { meetingID: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;
  const { meetingID } = params;
  const { status, attendees } = await request.json();

  if (attendees && !["ceo", "manager"].includes(user.role)) {
    return NextResponse.json({
      status: 403,
      success: false,
      error: "Only CEO and managers can modify attendees",
    });
  }

  await connectToMongoDB();

  try {
    const meeting = await Meeting.findById(meetingID).populate(
      "createdBy projectID attendees"
    );

    if (!meeting) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    if (status) meeting.status = status;
    if (attendees) meeting.attendees = attendees;
    await meeting.save();

    // Send email to the client
    const client = await User.findById(meeting.createdBy);
    const project = await Project.findById(meeting.projectID);

    if (status === "upcoming") {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: client.email,
        subject: "Meeting Request Accepted",
        text: `Your request for the meeting for the project ${project.projectDetails.projectName} has been accepted.`,
        html: `<p>Your request for the meeting for the project ${project.projectDetails.projectName} has been accepted.</p>`,
      });
    } else if (status === "cancelled") {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: client.email,
        subject: "Meeting Request Rejected",
        text: `Your request for the meeting for the project ${project.projectDetails.projectName} has been rejected.`,
        html: `<p>Your request for the meeting for the project ${project.projectDetails.projectName} has been rejected.</p>`,
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting updated successfully!",
      meeting,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
