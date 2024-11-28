import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Notification from "@/models/Notification";

export const DELETE = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  await connectToMongoDB();

  try {
    const result = await Notification.deleteMany({ userID: params.userID });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Notifications deleted successfully!",
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