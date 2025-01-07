import React from "react";
import { formatDateString } from "@/lib/utils";
import { PaymentValues } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddPayment from "./addPayment";
import SquareButton from "@/components/reusables/wrapper/squareButton";

export default function PaymentRequest({
  payments,
  loading,
  error,
}: {
  payments: PaymentValues[];
  loading: boolean;
  error: string;
}) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* <h1 className="text-base font-semibold">Total Client Payments - 03</h1> */}
      {loading ? (
        <p className="p-2">Loading...</p>
      ) : error ? (
        <p className="p-2">{error}</p>
      ) : (
        <DataTableTasks payments={payments} />
      )}
    </div>
  );
}

function DataTableTasks({ payments }: { payments: PaymentValues[] }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Payment Subject</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Requested Date</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {payments.map((row, index) => (
            <TableRow
              key={row._id}
              className={`h-[60px] text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.paymentTitle}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{formatDateString(row.requestedDate + "")}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <SquareButton>
                      Add Payment
                    </SquareButton>
                  </DialogTrigger>
                  <DialogContent>
                    <AddPayment
                      paymentTitle={row.paymentTitle}
                      requestDescription={row.requestDescription}
                      amount={row.amount}
                      paymentID={row._id}
                    />
                  </DialogContent>
                </Dialog>
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
//     paymentSubject: "Phase 3 CSK Payment ",
//     amount: "30000",
//     requestedDate: "Apl 4, 2022",
//     action: "",
//   },
//   {
//     id: 2,
//     paymentSubject: "Phase 2 CSK Payment",
//     amount: "45200",
//     requestedDate: "Feb 4, 2022",
//     action: "",
//   },
//   {
//     id: 3,
//     paymentSubject: "Phase 1 CSK Payment",
//     amount: "45200",
//     requestedDate: "Jan 4, 2022",
//     action: "",
//   },
//   {
//     id: 1,
//     paymentSubject: "Phase 3 CSK Payment ",
//     amount: "30000",
//     requestedDate: "Apl 4, 2022",
//     action: "",
//   },
//   {
//     id: 2,
//     paymentSubject: "Phase 2 CSK Payment",
//     amount: "45200",
//     requestedDate: "Feb 4, 2022",
//     action: "",
//   },
//   {
//     id: 3,
//     paymentSubject: "Phase 1 CSK Payment",
//     amount: "45200",
//     requestedDate: "Jan 4, 2022",
//     action: "",
//   },
//   {
//     id: 1,
//     paymentSubject: "Phase 3 CSK Payment ",
//     amount: "30000",
//     requestedDate: "Apl 4, 2022",
//     action: "",
//   },
//   {
//     id: 2,
//     paymentSubject: "Phase 2 CSK Payment",
//     amount: "45200",
//     requestedDate: "Feb 4, 2022",
//     action: "",
//   },
//   {
//     id: 3,
//     paymentSubject: "Phase 1 CSK Payment",
//     amount: "45200",
//     requestedDate: "Jan 4, 2022",
//     action: "",
//   },
// ];
