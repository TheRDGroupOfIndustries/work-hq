import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meet from "@/models/Meet";

export const GET = async (
  request: NextRequest,
  { params }: { params: { project_id: string } }
) => {
  await connectToMongoDB();

  try {
    const meet = await Meet.find({ project: params.project_id });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meet fetched successfully!",
      meet,
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
