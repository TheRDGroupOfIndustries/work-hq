import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";

export async function POST() {
  await connectToMongoDB();

  try {
    const meetings = await Meeting.find({
      status: { $in: ["upcoming", "inProgress"] },
      endTime: { $lte: new Date() },
    });

    for (const meeting of meetings) {
      if (meeting.endTime <= new Date()) {
        meeting.status = "completed";
        await meeting.save();
      } else if (meeting.startTime <= new Date() && meeting.endTime > new Date()) {
        meeting.status = "inProgress";
        await meeting.save();
      }
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meeting statuses updated successfully",
    });
  } catch (error) {
    console.error("Error updating meeting statuses:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Error updating meeting statuses",
    });
  }
}