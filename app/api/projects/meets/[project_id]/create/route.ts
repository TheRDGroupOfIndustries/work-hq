import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meet from "@/models/Meet";

export const POST = async (
  request: NextRequest,
  { params }: { params: { project_id: string } }
) => {
  const { project_title, title, link, date, time, status } =
    await request.json();
  await connectToMongoDB();

  try {
    let meet = await Meet.findOne({ project: params.project_id });

    if (meet) {
      meet.meetings.push({ title, link, date, time, status });
    } else {
      meet = new Meet({
        project: params.project_id,
        project_title,
        members: [],
        meetings: [
          {
            title,
            link,
            date,
            time,
            status,
          },
        ],
      });
    }
    await meet.save();

    const updatedMeet = await Meet.findOne({ project: params.project_id });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meet updated successfully!",
      updatedMeet,
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
