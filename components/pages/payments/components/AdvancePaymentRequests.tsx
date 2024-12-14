// This is for ceo side
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Container from "@/components/reusables/wrapper/Container";
import { PaymentValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AllTransactionsHistory() {
  // run logic
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className=" text-base font-medium">Total transactions -</h2>
        </div>
        <div className="w-full flex flex-col gap-4 px-2">
          <DataTable payments={[]} />
        </div>
      </div>
    </Container>
  );
}

function DataTable({ payments = [] }: { payments: PaymentValues[] }) {
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
                  src={"/assets/user.png"}
                  alt="Profile Image"
                  width="20"
                  height="20"
                  className="w-10 h-10 rounded-full object-cover overflow-hidden"
                />
                <div className="flex flex-col">
                  <span className="text-dark-gray leading-5 light-graytext-base">
                    Client 2 Name
                  </span>
                  <span className="line-clamp-1 text-sm text-light-gray">
                    Position
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {" "}
              <div className="flex flex-col">
                <span className="text-dark-gray leading-5 light-graytext-base">
                title
                </span>
                <span className="line-clamp-1 text-sm text-light-gray">
                  des
                </span>
              </div>
            </TableCell>
            <TableCell>{row.transactionID}</TableCell>
            <TableCell>{row.status}</TableCell>
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
  );
}
