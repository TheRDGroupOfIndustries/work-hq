import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Payment from "@/models/Payment";

export const PUT = async (request: NextRequest, { params }: { params: { paymentID: string } }) => {
  const { paymentID } = params;
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

    const updatedFields = {
      paymentTitle: paymentTitle || payment.paymentTitle,
      status: status || payment.status,
      type: type || payment.type,
      from: from || payment.from,
      amount: amount || payment.amount,
      transactionID: transactionID || payment.transactionID,
      paymentProof: paymentProof || payment.paymentProof,
      to: to || payment.to,
      paymentDate: paymentDate || payment.paymentDate,
      requestedDate: requestedDate || payment.requestedDate,
      bonus: bonus || payment.bonus,
      requestDescription: requestDescription || payment.requestDescription,
    };

    let changes: Record<string, unknown> = {};

    changes = Object.keys(updatedFields).reduce(
      (acc: Record<string, unknown>, key) => {
        if (updatedFields[key as keyof typeof updatedFields] !== payment[key as keyof typeof payment]) {
          acc[key] = updatedFields[key as keyof typeof updatedFields];
        }
        return acc;
      },
      changes
    );

    if (Object.keys(changes).length > 0) {
      const updatedPayment = await Payment.updateOne(
        { _id: paymentID },
        { $set: changes }
      );

      return NextResponse.json({
        status: 200,
        success: true,
        message: "Payment updated successfully!",
        updatedPayment,
        updatedFields: changes,
      });
    } else {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "No changes detected.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};