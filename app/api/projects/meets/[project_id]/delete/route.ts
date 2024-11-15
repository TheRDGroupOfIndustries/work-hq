import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meet from "@/models/Meet";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { project_id: string } }
) => {
  const { meet_ids} = await request.json();

  await connectToMongoDB();

  try {
    const result = await Meet.updateOne(
      { project: params.project_id },
      { $pull: { meetings: { _id: { $in: meet_ids } } } }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Meetings deleted successfully!",
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
