import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Payment from "@/models/Payment";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userID: string } }
) => {
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
    const payments = await Payment.find({
      $or: [{ "to.userID": userID }, { "from.userID": userID }],
    }).sort({ updatedAt: -1 });

    if (payments.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "No payments have been made.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      payments,
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
