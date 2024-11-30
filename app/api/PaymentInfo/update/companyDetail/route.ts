import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import PaymentInfo from "@/models/PaymentInfo";

export const PUT = async (request: NextRequest) => {
  const { qrCode, ifsc, accountNo, upiID, phoneNo, bankName } = await request.json();

  if (!ifsc || !accountNo || !bankName) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

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

    paymentInfo.qrCode = qrCode || paymentInfo.qrCode;
    paymentInfo.ifsc = ifsc;
    paymentInfo.accountNo = accountNo;
    paymentInfo.upiID = upiID || paymentInfo.upiID;
    paymentInfo.phoneNo = phoneNo || paymentInfo.phoneNo;
    paymentInfo.bankName = bankName;

    const updatedPaymentInfo = await paymentInfo.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Company payment info updated successfully!",
      paymentInfo: updatedPaymentInfo,
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