import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateString } from "@/lib/utils";
import { PayrollHistory } from "@/types";
import Image from "next/image";
import React from "react";

export default function AllTransactionsHistoryTable({
  payments = [],
  only = "all",
}: {
  payments: PayrollHistory[];
  only: "all" | "client" | "employee";
}) {
  return (
    <Table>
      <TableHeader className=" text-gray-600 border-0">
        <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
          <TableHead className=""></TableHead>

          {/* To show profiles */}
          {only === "all" && (
            <TableHead className="">Client/Employee</TableHead>
          )}
          {only === "client" && (
            <TableHead className="">Client/Vendor</TableHead>
          )}
          {only === "employee" && <TableHead className="">Employee</TableHead>}
          {only === "client" && <TableHead className="">Status</TableHead>}
          {only === "employee" && (
            <TableHead className="">Salary Month </TableHead>
          )}

          <TableHead className="">Transaction ID</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Transaction Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
        {payments.map((row, index) => (
          <TableRow
            key={index || row._id}
            className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
          >
            <TableCell className=" ">{`${index + 1}.`}</TableCell>
            <TableCell>
              <div className="w-full flex flex-row items-center gap-2">
                <Image
                  src={
                    row.to.userID?.profileImage
                      ? row.to.userID.profileImage
                      : "/assets/user.png"
                  }
                  alt="Profile Image"
                  width="20"
                  height="20"
                  className="w-10 h-10 rounded-full object-cover overflow-hidden"
                />
                <div className="flex flex-col">
                  <span className="text-dark-gray leading-5 light-graytext-base">
                    {row.to.userID?.firstName + " " + row.to.userID?.lastName}
                  </span>
                  <span className="line-clamp-1 text-sm text-light-gray">
                    {row.to.userID?.role}
                  </span>
                </div>
              </div>
            </TableCell>
            {only === "client" && (
              <TableCell
                className={`${
                  row.status === "fulfilled"
                    ? "text-[#34C759]"
                    : "text-primary-blue"
                }`}
              >
                {row.status}
              </TableCell>
            )}
            {only === "employee" && <TableCell>Salary Month</TableCell>}
            <TableCell>{row.transactionID}</TableCell>
            <TableCell>{row.amount + row.bonus}</TableCell>
            <TableCell>{formatDateString(row.paymentDate + "")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
