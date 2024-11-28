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
  console.log("user session server side: ", user);

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
    link,
    meetingDescription,
    date,
    startTime,
    endTime,
    attendees,
  } = await request.json();

  await connectToMongoDB();

  try {
    let status: "upcoming" | "requested" | "overdue" | "completed" | "inProgress";
    let isInstant = false;

    if (["client", "vendor", "vendorClient"].includes(user.role)) {
      status = "requested";
      isInstant = false;
    } else {
      if (date && new Date(date) > new Date()) {
        status = "upcoming";
      } else {
        status = "inProgress";
        isInstant = true;
      }
    }

    const meeting = new Meeting({
      title,
      link,
      createdBy: user._id,
      projectID: project_id,
      meetingDescription,
      attendees: ["client", "vendor", "vendorClient"].includes(user.role) ? [] : attendees,
      date,
      startTime,
      endTime,
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