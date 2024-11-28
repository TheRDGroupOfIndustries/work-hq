import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Payment from "@/models/Payment";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const payments = await Payment.find();

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