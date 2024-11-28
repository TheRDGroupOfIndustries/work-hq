import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";

export const PUT = async (request: NextRequest, { params }: { params: { meetingID: string } }) => {
  const { meetingID } = params;
  const { project_id, title, link, date, startTime, endTime, status } = await request.json();

  if (!project_id) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Project ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const meeting = await Meeting.findOne({ _id: meetingID, projectID: project_id });

    if (!meeting) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Meeting not found",
      });
    }

    const updatedFields = {
      title: title || meeting.title,
      link: link || meeting.link,
      date: date || meeting.date,
      startTime: startTime || meeting.startTime,
      endTime: endTime || meeting.endTime,
      status: status || meeting.status,
    };

    let changes: Record<string, unknown> = {};

    changes = Object.keys(updatedFields).reduce(
      (acc: Record<string, unknown>, key) => {
        if (updatedFields[key as keyof typeof updatedFields] !== meeting[key as keyof typeof meeting]) {
          acc[key] = updatedFields[key as keyof typeof updatedFields];
        }
        return acc;
      },
      changes
    );

    if (Object.keys(changes).length > 0) {
      const updatedMeeting = await Meeting.updateOne(
        { _id: meetingID, projectID: project_id },
        { $set: changes }
      );

      return NextResponse.json({
        status: 200,
        success: true,
        message: "Meeting updated successfully!",
        updatedMeeting,
        updatedFields: changes,
      });
    } else {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "No changes detected.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};