import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;
  const { callId } = await request.json();

  if (!callId) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Call ID is required",
    });
  }

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

    // Remove user from joinedParticipants
    if (meeting.joinedParticipants?.includes(user._id)) {
      meeting.joinedParticipants = meeting.joinedParticipants.filter(
        (id: Types.ObjectId) => id.toString() !== user._id
      );
      await meeting.save();
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Successfully left the meeting",
    });
  } catch (error) {
    console.error('Error leaving meeting:', error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
}