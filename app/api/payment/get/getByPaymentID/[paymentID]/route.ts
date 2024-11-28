import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Payment from "@/models/Payment";

export const GET = async (request: NextRequest, { params }: { params: { paymentID: string } }) => {
  const { paymentID } = params;

  if (!paymentID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Payment ID is required",
    });
  }

  await connectToMongoDB();

  try {
    const payment = await Payment.findById(paymentID);

    if (!payment) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Payment not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      payment,
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