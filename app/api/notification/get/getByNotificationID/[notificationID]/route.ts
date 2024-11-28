import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Notification from "@/models/Notification";

export const GET = async (request: NextRequest, { params }: { params: { notificationID: string } }) => {
  await connectToMongoDB();

  try {
    const notification = await Notification.findById(params.notificationID);

    if (!notification) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Notification not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      notification,
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