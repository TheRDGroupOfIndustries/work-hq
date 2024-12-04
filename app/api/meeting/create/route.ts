import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";
import { serverVideoClient, createVideoToken } from "@/utils/serverClient";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;
  const project_id = request.headers.get("project_id");
  
  if (!project_id) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Project ID is required",
    });
  }

  const {
    title,
    meetingDescription,
    date,
    startTime,
    endTime,
    attendees,
    isInstant,
  } = await request.json();

  await connectToMongoDB();

  try {
    let status: "upcoming" | "requested" | "overdue" | "completed" | "inProgress";

    if (["client", "vendor", "vendorClient"].includes(user.role)) {
      status = "requested";
    } else {
      if (date && new Date(date) > new Date()) {
        status = "upcoming";
      } else {
        status = "inProgress";
      }
    }

    // Create Stream call
    const callId = `meeting-${Date.now()}`;
    const call = serverVideoClient.call("default", callId);
    const streamToken = createVideoToken(user._id);

    // Create meeting document
    const meeting = new Meeting({
      title,
      createdBy: user._id,
      projectID: project_id,
      meetingDescription,
      attendees: ["client", "vendor", "vendorClient"].includes(user.role) ? [] : attendees,
      date,
      startTime,
      endTime,
      status,
      isInstant,
      streamCallId: callId,
      streamToken,
    });

    const savedMeeting = await meeting.save();

    if (!savedMeeting) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "Failed to create meeting!",
      });
    }

    // Set call data
    await call.update({
      custom: {
        meetingId: savedMeeting._id.toString(),
        projectId: project_id,
        createdBy: user._id,
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting created successfully!",
      meeting: savedMeeting,
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