import Payment from "@/models/Payment";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
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
      isRequested,
    } = await request.json();

    const missingFields = [];
    if (!paymentTitle) missingFields.push("paymentTitle");
    if (!status) missingFields.push("status");
    if (!type) missingFields.push("type");
    if ( 
      !from 
      || !from.role 
      // || !from.userID 
    ) {
      missingFields.push("from (role and userID required)");
    }
    if (!amount || amount <= 0) missingFields.push("amount");
    if (!to || !to.role) missingFields.push("to (role required)");

    if (missingFields.length > 0) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: `Required fields are missing or invalid: ${missingFields.join(
          ", "
        )}`,
      });
    }

    // Establish MongoDB connection
    await connectToMongoDB();

    // Create a new payment record
    const payment = new Payment({
      paymentTitle,
      status,
      type,
      from,
      amount,
      transactionID,
      paymentProof,
      to,
      isRequested,
      paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      requestedDate: requestedDate ? new Date(requestedDate) : new Date(),
      bonus: bonus || 0,
      requestDescription: requestDescription || "",
    });

    // Save payment to the database
    const savedPayment = await payment.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Payment created successfully!",
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: "Something went wrong!",
      },
      { status: 500 }
    );
  }
};
