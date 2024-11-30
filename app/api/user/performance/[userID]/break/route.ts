import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const PUT = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  const { userID } = params;

  if (!userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "User ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const user = await User.findById(userID);
    const currentTime = new Date();
    
    // Get the current working hours range
    const currentRange = user.workingHoursRanges[user.workingHoursRanges.length - 1];
    const startTime = new Date(currentRange.timeRange[currentRange.timeRange.length - 1].startTime);
    
    // Calculate total hours
    const totalHours = (currentTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) + user.totalSpendHours[user.totalSpendHours.length - 1].totalHours;

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          workStatus: "onBreak",
          [`workingHoursRanges.${user.workingHoursRanges.length - 1}.timeRange.${currentRange.timeRange.length - 1}.endTime`]: currentTime.toISOString(),
          'totalSpendHours.$[].totalHours': totalHours
        }
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
