import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { formatDateString } from "@/lib/utils";
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

export default function AllTransactionsHistoryTable({payments = []}:) {
  return (
    <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Client/Employee</TableHead>
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
              <TableCell>{row.paymentTitle}</TableCell>
              <TableCell>
                <div className="w-full flex flex-row items-center gap-2">
                  <Image
                    src={"/assets/user.png"}
                    alt="Profile Image"
                    width="20"
                    height="20"
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                  <div className="flex flex-col">
                    <span className="text-dark-gray leading-5 light-graytext-base">
                      kk
                    </span>
                    <span className="line-clamp-1 text-sm text-light-gray">
                    kk
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.transactionID}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{formatDateString(row.paymentDate + "")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
