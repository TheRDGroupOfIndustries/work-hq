import Container from "@/components/reusables/wrapper/Container";
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
  } from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react';
import { PaymentValues } from "@/lib/types";
import React from "react";




export default function PaymentHistory({payments}:{payments: PaymentValues[]}) {
  return (
    <Container className="p-4 flex flex-col gap-4">
    <h1 className="text-base font-semibold">Total Payments - {payments.length}</h1>
    <DataTableTasks payments={payments} />
  </Container>
  )
}


function DataTableTasks({payments}:{payments: PaymentValues[]}) {
    return (
      <div className="w-full">
        <Table>
          <TableHeader className=" text-gray-600 border-0">
            <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="">Subject</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Project</TableHead>
              <TableHead className="">Transaction ID</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead className="">Transaction Date</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
            {payments.map((row, index) => (
              <TableRow
                key={row._id}
                className={`h-[60px]  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
              >
                <TableCell className=" ">{`${index + 1}.`}</TableCell>
                <TableCell >{row.paymentTitle}</TableCell>
                <TableCell className={`${row.status === "fulfilled" ? "!text-green-400" : "!text-primary-blue"}`}>{row.status}</TableCell>
                <TableCell>{"k"}</TableCell>
                <TableCell>{row.transactionID}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{ ""}</TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button  className="h-8 w-8 p-0">
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
      </div>
    );
  }
