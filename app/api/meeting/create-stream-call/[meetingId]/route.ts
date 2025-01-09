import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { authOptions } from "@/lib/authOptions";
import { serverVideoClient } from "@/utils/serverClient";

export const POST = async (
  request: NextRequest,
  { params }: { params: { meetingId: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const { meetingId } = params;

  await connectToMongoDB();

  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    // Create Stream call
    try {
      const call = serverVideoClient.call('default', meetingId);
      const streamCallData = await call.getOrCreate();
      
      // Update the meeting with just the Stream call ID
      meeting.streamCallId = streamCallData.call.id;
      await meeting.save();

      return NextResponse.json({
        status: 200,
        success: true,
        streamCallId: streamCallData.call.id,
      });
    } catch (error) {
      console.error("Error creating Stream call:", error);
      return NextResponse.json({
        status: 500,
        success: false,
        error: "Failed to create Stream call",
      });
    }
  } catch (error) {
    console.error("Error creating Stream call:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};