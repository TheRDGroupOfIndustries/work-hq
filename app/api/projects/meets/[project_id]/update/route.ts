import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meet from "@/models/Meet";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { project_id: string } }
) => {
  const { meet_id, title, link, date, time, status } = await request.json();
  await connectToMongoDB();

  try {
    const meet = await Meet.findOne(
      { project: params.project_id },
      { meetings: { $elemMatch: { _id: meet_id } } }
    );

    const currentMeeting = meet.meetings[meet.meetings.length - 1];
    const updatedFields = {
      title: title || currentMeeting.title,
      link: link || currentMeeting.link,
      date: date || currentMeeting.date,
      time: time || currentMeeting.time,
      status: status || currentMeeting.status,
    };

    let changes: Record<string, unknown> = {};
    
    changes = Object.keys(updatedFields).reduce(
      (acc: Record<string, unknown>, key) => {
        if ((updatedFields[key as keyof typeof updatedFields] !== currentMeeting[key as keyof typeof currentMeeting]) !== updatedFields[key as keyof typeof updatedFields]) {
          acc[key] = updatedFields[key as keyof typeof updatedFields];
        }
        return acc;
      },
      changes
    );

    if (Object.keys(changes).length > 0) {
      const updatedMeet = await Meet.updateOne(
        { project: params.project_id },
        { $set: { "meetings.$[elem]": changes } }
      );

      return NextResponse.json({
        status: 200,
        success: true,
        message: "Meet updated successfully!",
        updatedMeet,
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
