import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Notification from "@/models/Notification";

export const DELETE = async (request: NextRequest, { params }: { params: { notificationID: string } }) => {
  await connectToMongoDB();

  try {
    const result = await Notification.deleteOne({ _id: params.notificationID });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Notification not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Notification deleted successfully!",
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