"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Container from "@/components/reusables/wrapper/Container";
import { Button } from "@/components/ui/button";
import { formatDateString } from "@/lib/utils";
import { PayrollHistory } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import FulfillEmployeeAdvanceRequest from "./FulfillEmployeeAdvanceRequest";

export default function AdvancePaymentRequests({
  payrollHistory,
}: {
  payrollHistory: PayrollHistory[];
}) {
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className=" text-base font-medium">
            Total transactions - {payrollHistory.length}{" "}
          </h2>
        </div>
        <div className="w-full h-full flex flex-col gap-4 px-2">
          <DataTable payments={payrollHistory} />
        </div>
      </div>
    </Container>
  );
}

function DataTable({ payments }: { payments: PayrollHistory[] }) {
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
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10   ">
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
            <TableCell>{formatDateString(row.requestedDate + "")}</TableCell>
            <TableCell>
              <div className="flex flex-row items-center gap-2">
                <ApproveBTN
                  paymentID={row._id}
                  employeeName={
                    row.to.userID?.firstName + " " + row.to.userID?.lastName
                  }
                  employeeId={row.to.userID?._id}
                  amount={row.amount}
                  title={row.paymentTitle}
                  description={row.requestDescription}
                />
                <DeleteBTN
                  paymentID={row._id}
                  title={row.paymentTitle}
                  description={row.requestDescription}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ApproveBTN({
  paymentID,
  employeeName,
  employeeId,
  amount,
  title,
  description,
}: {
  paymentID: string;
  employeeName: string;
  employeeId: string;
  amount: number;
  title: string;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default">Approve</Button>
      </DialogTrigger>
      <DialogContent>
        <FulfillEmployeeAdvanceRequest
          paymentID={paymentID}
          employeeName={employeeName}
          employeeId={employeeId}
          amount={amount}
          title={title}
          description={description}
        />
      </DialogContent>
    </Dialog>
  );
}

function DeleteBTN({
  paymentID,
  title,
  description,
}: {
  paymentID: string;
  title: string;
  description: string;
}) {
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const payload = {
      status: "rejected",
    };
    try {
      const response = await fetch(`/api/payment/update/${paymentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to reject advance payment request");
      }
      setDeleting(false);
      toast.success("Advance payment request reject successfully");
      document.getElementById("close")?.click();        
    } catch (error) {
      console.error("Error reject advance payment request:", error);
      toast.error(
        "Failed to reject advance payment request. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">
          <Trash2 color="#fff" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[733px]  m-4 bg-background flex flex-col rounded-3xl p-5 lg:p-6">
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <div className="bg-slate-600 h-[1px] mt-3"></div>
        <DialogDescription className="my-3">
          <h1 className="text-lg font-bold mb-2">{title}</h1>
          <p className="text-base leading-relaxed max-h-[60vh] overflow-y-scroll">{description}</p>
        </DialogDescription>
        <DialogFooter>
          <Button
            disabled={deleting}
            onClick={handleDelete}
            variant="destructive"
          >
            {deleting ? "Reject..." : "Reject"}
          </Button>
          <DialogClose asChild>
            <Button id="close" disabled={deleting}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
