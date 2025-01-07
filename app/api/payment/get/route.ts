import Payment from "@/models/Payment";
import connectToMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const payments = await Payment.find()
      .populate(
        "from.userID",
        "firstName lastName role profileImage position email"
      )
      .populate(
        "to.userID",
        "firstName lastName role profileImage position email"
      )
      .sort({ updatedAt: -1 });

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
