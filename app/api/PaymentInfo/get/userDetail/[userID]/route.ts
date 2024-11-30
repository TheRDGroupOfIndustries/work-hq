import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import PaymentInfo from "@/models/PaymentInfo";

export const GET = async (request: NextRequest, { params }: { params: { userID: string } }) => {
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
    const paymentInfo = await PaymentInfo.findOne({ userID });

    if (!paymentInfo) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User payment info not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      paymentInfo,
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