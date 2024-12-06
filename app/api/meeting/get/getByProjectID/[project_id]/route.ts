import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";

export const GET = async (
  request: NextRequest,
  { params }: { params: { project_id: string } }
) => {
  await connectToMongoDB();

  try {
    const meetings = await Meeting.find({ projectID: params.project_id });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meet fetched successfully!",
      meet: meetings,
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