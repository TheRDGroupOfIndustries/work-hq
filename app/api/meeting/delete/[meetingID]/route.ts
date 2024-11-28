import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";

export const DELETE = async (request: NextRequest, { params }: { params: { meetingID: string } }) => {
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
    const result = await Meeting.deleteOne({
      _id: meetingID,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting deleted successfully!",
      result,
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