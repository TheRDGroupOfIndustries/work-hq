import SquareButton from "@/components/reusables/wrapper/squareButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import React from "react";

const dataFilesTasks = [
  {
    id: 1,
    paymentSubject: "Phase 3 CSK Payment ",
    amount: "30000",
    requestedDate: "Apl 4, 2022",
    action: "",
  },
  {
    id: 2,
    paymentSubject: "Phase 2 CSK Payment",
    amount: "45200",
    requestedDate: "Feb 4, 2022",
    action: "",
  },
  {
    id: 3,
    paymentSubject: "Phase 1 CSK Payment",
    amount: "45200",
    requestedDate: "Jan 4, 2022",
    action: "",
  },
  {
    id: 1,
    paymentSubject: "Phase 3 CSK Payment ",
    amount: "30000",
    requestedDate: "Apl 4, 2022",
    action: "",
  },
  {
    id: 2,
    paymentSubject: "Phase 2 CSK Payment",
    amount: "45200",
    requestedDate: "Feb 4, 2022",
    action: "",
  },
  {
    id: 3,
    paymentSubject: "Phase 1 CSK Payment",
    amount: "45200",
    requestedDate: "Jan 4, 2022",
    action: "",
  },
  {
    id: 1,
    paymentSubject: "Phase 3 CSK Payment ",
    amount: "30000",
    requestedDate: "Apl 4, 2022",
    action: "",
  },
  {
    id: 2,
    paymentSubject: "Phase 2 CSK Payment",
    amount: "45200",
    requestedDate: "Feb 4, 2022",
    action: "",
  },
  {
    id: 3,
    paymentSubject: "Phase 1 CSK Payment",
    amount: "45200",
    requestedDate: "Jan 4, 2022",
    action: "",
  },
];

export default function PaymentRequest() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-base font-semibold">Total Client Payments - 03</h1>
      <DataTableTasks />
    </div>
  );
}

function DataTableTasks() {
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
          {dataFilesTasks.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.paymentSubject}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.requestedDate}</TableCell>
              <TableCell>
                {" "}
                <SquareButton
                //   role={role}
                  onClick={() => {
                    console.log("Export Report");
                  }}
                >
                  <Plus
                    // color={
                    //   role === VENDOR
                    //     ? "var(--vendor-dark)"
                    //     : "var(--primary-blue)"
                    // }

                    color="var(--primary-blue)"
                  />
                  Add Payment
                </SquareButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
