import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";

export const GET = async (request: NextRequest, { params }: { params: { meetingID: string } }) => {
  const { meetingID } = params;

  if (!meetingID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Meeting ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const meeting = await Meeting.findById(meetingID);

    if (!meeting) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
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