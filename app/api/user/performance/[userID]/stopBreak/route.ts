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
    
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          workStatus: "loggedIn"
        },
        $push: {
          [`workingHoursRanges.${user.workingHoursRanges.length - 1}.timeRange`]: {
            startTime: currentTime.toISOString(),
            endTime: ""
          }
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
