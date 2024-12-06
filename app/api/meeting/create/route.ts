import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";

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
  
  const {
    title,
    meetingDescription,
    date,
    startTime,
    endTime,
    projectID,
    isInstant,
    createdBy
  } = await request.json();

  // Validate required fields
  if (!title || !meetingDescription || !date || !startTime || !endTime || !projectID || createdBy === undefined || isInstant === undefined) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Missing required fields",
    });
  }

  await connectToMongoDB();

  try {
    let status: "upcoming" | "requested" | "overdue" | "completed" | "inProgress";

    if (["client", "vendor", "vendorClient"].includes(user.role)) {
      status = "requested";
    } else {
      if (date && new Date(date) > new Date()) {
        status = "requested";
      } else {
        status = "inProgress";
      }
    }

    // Create meeting document
    const meeting = new Meeting({
      title,
      createdBy,
      projectID,
      meetingDescription,
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