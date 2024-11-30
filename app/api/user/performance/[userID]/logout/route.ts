import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

interface UpdateQuery {
  workStatus: "loggedOut";
  [key: `workingHoursRanges.${number}.timeRange.${number}.endTime`]: string;
  'totalSpendHours.$[].totalHours'?: number;
}

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
    
    const currentRange = user.workingHoursRanges[user.workingHoursRanges.length - 1];
    const firstStartTime = new Date(currentRange.timeRange[0].startTime);
    
    // If not on break, set the end time of the last timeRange
    const updateQuery: UpdateQuery = {
      workStatus: "loggedOut"
    };

    if (user.workStatus !== "onBreak") {
      updateQuery[`workingHoursRanges.${user.workingHoursRanges.length - 1}.timeRange.${currentRange.timeRange.length - 1}.endTime`] = currentTime.toISOString();
    }

    // Calculate total hours from first start to last end
    const lastEndTime = user.workStatus === "onBreak" 
      ? new Date(currentRange.timeRange[currentRange.timeRange.length - 1].endTime)
      : currentTime;
    
    const totalHours = (lastEndTime.getTime() - firstStartTime.getTime()) / (1000 * 60 * 60);
    updateQuery['totalSpendHours.$[].totalHours'] = totalHours;

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $set: updateQuery },
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
