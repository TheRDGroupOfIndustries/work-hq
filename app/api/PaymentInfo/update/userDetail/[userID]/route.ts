import PaymentInfo from "@/models/PaymentInfo";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { userID: string } }
) => {
  const { userID } = params;
  const { 
    qrCode, 
    ifsc, 
    accountNo, 
    upiID, 
    phoneNo, 
    bankName, 
    // isCompanyDetail  
  } =
    await request.json();

  if (!userID || !ifsc || !accountNo || !bankName) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

  await connectToMongoDB();

  try {
    let paymentInfo = await PaymentInfo.findOne({ userID });

    if (!paymentInfo) {
      paymentInfo = new PaymentInfo({
        userID,
        qrCode,
        ifsc,
        accountNo,
        upiID,
        phoneNo,
        bankName,
        // isCompanyDetail: isCompanyDetail ? true : false,
      });
    } else {
      paymentInfo.qrCode = qrCode || paymentInfo.qrCode;
      paymentInfo.ifsc = ifsc;
      paymentInfo.accountNo = accountNo;
      paymentInfo.upiID = upiID || paymentInfo.upiID;
      paymentInfo.phoneNo = phoneNo || paymentInfo.phoneNo;
      paymentInfo.bankName = bankName;
      // paymentInfo.isCompanyDetail = isCompanyDetail;
    }

    const updatedPaymentInfo = await paymentInfo.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User payment info updated successfully!",
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
