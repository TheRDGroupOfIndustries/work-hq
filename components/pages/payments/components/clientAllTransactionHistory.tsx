"use client";
import AllTransactionsHistoryTable from "@/components/reusables/components/AllTransactionsHistoryTable";
import Container from "@/components/reusables/wrapper/Container";
import { PayrollHistory } from "@/types";
import React from "react";

export default function ClientAllTransactionsHistory({
  payrollHistory,
}: {
  payrollHistory: PayrollHistory[];
}) {

  // console.log("ClientAllTransactionsHistory", payrollHistory);
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className=" text-base font-medium">Total transactions - {payrollHistory.length}</h2>
        </div>
        <div className="w-full flex flex-col gap-4 overflow-y-scroll px-2">
          <AllTransactionsHistoryTable
            only="client"
            payments={payrollHistory}
          />
        </div>
      </div>
    </Container>
  );
}
