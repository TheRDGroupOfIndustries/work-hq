"use client";
import Container from "@/components/reusables/wrapper/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

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
  const [payMentsRequest, setPayMentsRequest] = React.useState(advancePaymentRequest);
  const deleteFromList = (paymentID: string) => {
    const newList = advancePaymentRequest.filter((payment) => payment._id !== paymentID);
    setPayMentsRequest(newList);
  };
  return (
    <Container className="p-4 flex flex-col gap-4">
      <h1 className="text-base font-semibold">Total request - {payMentsRequest.length}</h1>
      <DataTableTasks payments={payMentsRequest} deleteFromList={deleteFromList} />
    </Container>
  );
}

function DataTableTasks({ payments, deleteFromList  }: { payments: PaymentValues[]; deleteFromList: (paymentID: string) => void }) {
  
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
          {payments?.map((row, index) => (
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
                <DeleteBTNDialog paymentID={row._id} deleteFromList={deleteFromList} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteBTNDialog({ paymentID, deleteFromList }: { paymentID: string; deleteFromList: (paymentID: string) => void }) {
  const [deleting, setDeleting] = React.useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/payment/delete/${paymentID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete advance payment request");
      }

      toast.success("Advance payment request delete successfully!");
      deleteFromList(paymentID);
      setDeleting(false);
      document.getElementById("close")?.click();
    } catch (error) {
      console.error("Error deleting advance payment request:", error);
      toast.error(
        "Failed to delete advance payment request. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="deleteBTN" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary-sky-blue shadow-neuro-3 p-4">
        <DialogHeader>
          <DialogTitle>Delete Ticket</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this ticket? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              disabled={deleting}
              id="close"
              variant="outline"
              className="disabled:cursor-not-allowed "
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={deleting}
            onClick={() => {
              handleDelete();
            }}
            className="disabled:cursor-not-allowed "
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
