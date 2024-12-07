import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import PaymentInfo from "@/models/PaymentInfo";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const paymentInfo = await PaymentInfo.findOne({ isCompanyDetail: true });

    if (!paymentInfo) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Company payment info not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      paymentInfo,
      message: "Company payment info.",
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
