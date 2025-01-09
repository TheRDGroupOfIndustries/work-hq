import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";
import { createVideoToken, serverVideoClient } from "@/utils/serverClient";
import { authOptions } from "@/lib/authOptions";
import { GetCallResponse } from '@stream-io/video-client';

// Extend the GetCallResponse type to include recording_started_at
interface ExtendedCallResponse extends GetCallResponse {
  recording_started_at: string | null;
}

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

  const user = session.user as CustomUser;
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

    // Check if user is allowed to join
    const canJoin = meeting.attendees.includes(user._id) || 
                    meeting.createdBy.toString() === user._id ||
                    ["manager", "ceo"].includes(user.role);

    if (!canJoin) {
      return NextResponse.json({
        status: 403,
        success: false,
        error: "Not authorized to join this meeting",
      });
    }

    // Generate Stream token for the user
    let streamToken;
    try {
      streamToken = createVideoToken(user._id.toString());
    } catch (error) {
      console.error('Error creating video token:', error);
      return NextResponse.json({
        status: 500,
        success: false,
        error: "Failed to create video token",
      });
    }

    // Add user to joinedParticipants if not already present
    if (!meeting.joinedParticipants?.includes(user._id)) {
      meeting.joinedParticipants = [...(meeting.joinedParticipants || []), user._id];
      await meeting.save();
    }

    // Check if the meeting is being recorded
    const call = serverVideoClient.call("default", meeting.streamCallId);
    const callState = await call.get() as ExtendedCallResponse;
    const isRecording = callState.recording_started_at !== null;

    return NextResponse.json({
      status: 200,
      success: true,
      streamToken,
      callId: meeting.streamCallId,
      isRecording,
    });
  } catch (error) {
    console.error('Error joining meeting:', error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};