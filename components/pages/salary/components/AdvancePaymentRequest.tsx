import Container from "@/components/reusables/wrapper/Container";
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
import { PaymentValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import React from "react";

// const dataFilesTasks = [
//   {
//     id: 1,
//     requestName: "Financial Issue",
//     discription: "This is the description here about the task...",
//     status: "Pending",
//     requestedOn: "Jan 4, 2022",
//     amount: "5000",
//   },
//   {
//     id: 2,
//     requestName: "Financial Issue",
//     discription: "This is the description here about the task...",
//     status: "Fulfilled",
//     requestedOn: "Jan 4, 2022",
//     amount: "5000",
//   },
//   {
//     id: 3,
//     requestName: "Financial Issue",
//     discription: "This is the description here about the task...",
//     status: "Approved",
//     requestedOn: "Jan 4, 2022",
//     amount: "5000",
//   },
//   {
//     id: 4,
//     requestName: "Financial Issue",
//     discription: "This is the description here about the task...",
//     status: "Rejected",
//     requestedOn: "Jan 4, 2022",
//     amount: "5000",
//   },
// ];

export default function AdvancePaymentRequest({
  advancePaymentRequest,
}: {
  advancePaymentRequest: PaymentValues[];
}) {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <h1 className="text-base font-semibold">Total request - 03</h1>
      <DataTableTasks payments={advancePaymentRequest} />
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
            <TableHead className="">Request Name</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Requested On</TableHead>
            <TableHead className="">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {payments.map((row, index) => (
            <TableRow
              key={index || row._id}
              className={`h-[60px]  text-[#1E1B39] hover:shadow-neuro-3  rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="flex flex-col text-[#1E1B39] text-base font-medium">
                  <p>{row.paymentTitle}</p>
                  <p className="text-[#344054] line-clamp-1">
                    {row.requestDescription}
                  </p>
                </div>
              </TableCell>
              <TableCell
                className={`
                  ${row.status === "approved" && "text-blue-600"}
                  ${row.status === "fulfilled" && "text-green-600"}
                  ${row.status === "requested" && "text-yellow-600"}
                  ${row.status === "rejected" && "text-red-600"}
                  ${row.status === "cancelled" && "text-red-600"}
                  `}
              >
                {row.status}
              </TableCell>
              <TableCell>
                {formatDateString(row.requestedDate + "") || "N/A"}
              </TableCell>
              <TableCell>{row.amount}</TableCell>
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
