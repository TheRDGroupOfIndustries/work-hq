import React from "react";
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
import { MoreVertical } from "lucide-react";
import Container from "@/components/reusables/wrapper/Container";
import { PaymentValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";

export default function SalaryHistory({
  payments,
}: {
  payments: PaymentValues[];
}) {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <h1 className="text-base font-semibold">Total Client Payments - 03</h1>
      <DataTableTasks payments={payments} />
    </Container>
  );
}

function DataTableTasks({ payments }: { payments: PaymentValues[] }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Salary Month</TableHead>
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
    </div>
  );
}

// const dataFilesTasks = [
//   {
//     id: 1,
//     salaryMonth: "September",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
//   {
//     id: 2,
//     salaryMonth: "October",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
//   {
//     id: 3,
//     salaryMonth: "November",
//     transactionId: "#01234567891",
//     amount: "5000",
//     transactionDate: "01 January, 2024",
//   },
// ];
