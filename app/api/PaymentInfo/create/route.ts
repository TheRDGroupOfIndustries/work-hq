import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import PaymentInfo from "@/models/PaymentInfo";

export const POST = async (request: NextRequest) => {
  const { qrCode, ifsc, accountNo, upiID, phoneNo, bankName, userID, isCompanyDetail } = await request.json();

  if (!ifsc || !accountNo || !bankName || isCompanyDetail === undefined) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

  await connectToMongoDB();

  try {
    const paymentInfo = new PaymentInfo({
      qrCode,
      ifsc,
      accountNo,
      upiID,
      phoneNo,
      bankName,
      userID,
      isCompanyDetail,
    });

    const savedPaymentInfo = await paymentInfo.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Payment info created successfully!",
      paymentInfo: savedPaymentInfo,
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