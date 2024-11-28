import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Notification from "@/models/Notification";

export const POST = async (request: NextRequest) => {
  const { time, title, description, type, icon, userID } = await request.json();

  if (!title || !description || !type || !userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Title, description, type, and userID are required",
    });
  }

  await connectToMongoDB();

  try {
    const notification = new Notification({
      time: time || new Date(),
      title,
      description,
      type,
      icon,
      userID,
    });

    const savedNotification = await notification.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Notification created successfully!",
      notification: savedNotification,
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