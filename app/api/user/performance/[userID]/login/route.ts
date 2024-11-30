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
    const currentTime = new Date();
    
    const user = await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          workStatus: "loggedIn",
          'workingHoursRanges': [{
            date: currentTime,
            timeRange: [{
              startTime: currentTime.toISOString(),
              endTime: ""
            }]
          }],
          'totalSpendHours': [{
            date: currentTime,
            totalHours: 0,
            loggedInTime: currentTime.getTime()
          }]
        }
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      user,
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
