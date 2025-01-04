import AllTransactionsHistoryTable from "@/components/reusables/components/AllTransactionsHistoryTable";
import Container from "@/components/reusables/wrapper/Container";
import { PayrollHistory } from "@/types";
import React from "react";

export default function EmployeeAllTransactionsHistory({
  payrollHistory,
}: {
  payrollHistory: PayrollHistory[];
}) {
  // run logic
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className=" text-base font-medium">Total transactions - {payrollHistory.length}</h2>
        </div>
        <div className="w-full flex flex-col gap-4 px-2">
          <AllTransactionsHistoryTable only="employee" payments={payrollHistory} />
        </div>
      </div>
    </Container>
  );
}