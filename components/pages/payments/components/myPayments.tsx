"use client";

import Image from "next/image";
import { PaymentValues } from "@/lib/types";

export default function MyPayments({
  payments,
  loading,
  error,
}: {
  payments: PaymentValues[];
  loading: boolean;
  error: string;
}) {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading ? (
        <p className="p-2">Loading...</p>
      ) : error ? (
        <p className="p-2">{error}</p>
      ) : (
        payments.map((payment, index) => (
          <Card key={index} paymentDetails={payment} />
        ))
      )}
    </div>
  );
}

function Card({ paymentDetails }: { paymentDetails: PaymentValues }) {
  return (
    <div className="min-w-[200px] p-4 bg-primary-sky-blue shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_20px_0px_#FFFFFFCC] rounded-xl flex flex-col gap-4">
      <div className="rounded-xl h-[200px] w-full bg-slate-400 overflow-hidden">
        <Image
          src={paymentDetails?.paymentProof || "/temp/test.png"}
          className="h-full w-full rounded-xl object-cover"
          width={200}
          height={200}
          alt=""
        />
      </div>
      <h2 className="text-base text-light-gray">Payment Details</h2>
      <div className="text-sm flex flex-col gap-2">
        <p>{`Transaction ID: ${paymentDetails?.transactionID}`}</p>
        <p>{`Subject: ${paymentDetails?.requestDescription || "subject"}`}</p>
        <p>{`Date: ${paymentDetails?.paymentDate}`}</p>
        <p>{`Amount: ${paymentDetails?.amount}/-`}</p>
      </div>
    </div>
  );
}

// const paymentData = [
//   {
//     transactionId: "01234567891",
//     subject: "Milestone 1 Payment",
//     date: "01 January, 2024",
//     amount: 5000,
//   },
//   {
//     transactionId: "01234567892",
//     subject: "Milestone 2 Payment",
//     date: "15 January, 2024",
//     amount: 7500,
//   },
//   {
//     transactionId: "01234567891",
//     subject: "Milestone 1 Payment",
//     date: "01 January, 2024",
//     amount: 5000,
//   },
//   {
//     transactionId: "01234567892",
//     subject: "Milestone 2 Payment",
//     date: "15 January, 2024",
//     amount: 7500,
//   },
//   {
//     transactionId: "01234567891",
//     subject: "Milestone 1 Payment",
//     date: "01 January, 2024",
//     amount: 5000,
//   },
//   {
//     transactionId: "01234567892",
//     subject: "Milestone 2 Payment",
//     date: "15 January, 2024",
//     amount: 7500,
//   },
// ];
