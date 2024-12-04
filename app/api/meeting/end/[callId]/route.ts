import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";
import { serverVideoClient } from "@/utils/serverClient";

export const POST = async (
  request: NextRequest,
  { params }: { params: { callId: string } }
) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;
  const { callId } = params;

  await connectToMongoDB();

  try {
    const meeting = await Meeting.findOne({ streamCallId: callId });
    if (!meeting) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    // Check if user is allowed to end the meeting
    const canEnd = meeting.createdBy.toString() === user._id ||
                   ["manager", "ceo"].includes(user.role);

    if (!canEnd) {
      return NextResponse.json({
        status: 403,
        success: false,
        error: "Not authorized to end this meeting",
      });
    }

    // End the call
    const call = serverVideoClient.call("default", callId);
    await call.endCall();

    // Get recording information
    const recordings = await call.queryRecordings();
    if (recordings.recordings.length > 0) {
      const latestRecording = recordings.recordings[recordings.recordings.length - 1];
      meeting.recordingUrl = latestRecording.url;
    }

    // Update meeting status
    meeting.status = "completed";
    await meeting.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting ended successfully",
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