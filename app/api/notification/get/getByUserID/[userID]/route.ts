import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Notification from "@/models/Notification";

export const GET = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  await connectToMongoDB();

  try {
    const notifications = await Notification.find({ userID: params.userID });

    return NextResponse.json({
      status: 200,
      success: true,
      notifications,
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