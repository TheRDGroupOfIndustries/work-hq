"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Container from "@/components/reusables/wrapper/Container";
import { formatDateString } from "@/lib/utils";
import { PayrollHistory } from "@/types";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdvancePaymentRequests({
  payrollHistory,
}: {
  payrollHistory: PayrollHistory[];
}) {
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className=" text-base font-medium">Total transactions -</h2>
        </div>
        <div className="w-full flex flex-col gap-4 px-2">
          <DataTable payments={payrollHistory} />
        </div>
      </div>
    </Container>
  );
}

function DataTable({ payments }: { payments: PayrollHistory[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Table>
      <TableHeader className=" text-gray-600 border-0">
        <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
          <TableHead className=""></TableHead>
          <TableHead className="">Employee</TableHead>

          <TableHead className="">Request</TableHead>
          <TableHead className="">Request Id</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Requested Date</TableHead>
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
            <TableCell>
              {" "}
              <div className="flex flex-col">
                <span className="text-dark-gray leading-5 light-graytext-base">
                  {row.paymentTitle}
                </span>
                <span className="line-clamp-1 text-sm text-light-gray">
                  {row.requestDescription}
                </span>
              </div>
            </TableCell>
            <TableCell>{row.transactionID}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{formatDateString(row.paymentDate + "")}</TableCell>
            <TableCell>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-md z-50">
                    <ul className="py-1">
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => alert("Action 1 clicked")}
                        >
                          Accept
                        </button>
                      </li>
                      <li>
                        <button
                          className="block w-full bg-red-500 text-slate-50 text-left px-4 py-2 text-sm hover:bg-red-400"
                          onClick={() => alert("Action 2 clicked")}
                        >
                          Reject
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
