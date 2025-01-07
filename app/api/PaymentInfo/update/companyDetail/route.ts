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
    let paymentInfo = await PaymentInfo.findOne({ isCompanyDetail: true });

    if (!paymentInfo) {
      // Create new payment info if not found
      paymentInfo = new PaymentInfo({
        qrCode,
        ifsc,
        accountNo,
        upiID,
        phoneNo,
        bankName,
        isCompanyDetail: true, // Ensure this flag is set for identification
      });

      const newPaymentInfo = await paymentInfo.save();

      return NextResponse.json({
        status: 201,
        success: true,
        message: "New company payment info created successfully!",
        paymentInfo: newPaymentInfo,
      });
    }

    // Update existing payment info
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
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
