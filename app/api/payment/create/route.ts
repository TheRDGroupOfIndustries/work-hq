import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Payment from "@/models/Payment";

export const POST = async (request: NextRequest) => {
  const {
    paymentTitle,
    status,
    type,
    from,
    amount,
    transactionID,
    paymentProof,
    to,
    paymentDate,
    requestedDate,
    bonus,
    requestDescription,
  } = await request.json();

  if (!paymentTitle || !status || !type || !from || !amount || !to) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing",
    });
  }

  await connectToMongoDB();

  try {
    const payment = new Payment({
      paymentTitle,
      status,
      type,
      from,
      amount,
      transactionID,
      paymentProof,
      to,
      paymentDate,
      requestedDate,
      bonus,
      requestDescription,
    });

    const savedPayment = await payment.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Payment created successfully!",
      payment: savedPayment,
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