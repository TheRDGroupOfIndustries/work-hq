"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateString, salaryMonth } from "@/lib/utils";
import { PayrollHistory } from "@/types";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React from "react";
import SquareButton from "../wrapper/squareButton";

export default function AllTransactionsHistoryTable({
  payments = [],
  only = "all",
}: {
  payments: PayrollHistory[];
  only: "all" | "client" | "employee";
}) {
  console.log("AllTransactionsHistory", payments);
  return (
    <Table>
      <TableHeader className=" text-gray-600 border-0">
        <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
          <TableHead className=""></TableHead>

          {/* To show profiles */}
          {only === "all" && (
            <TableHead className="">Client/Employee</TableHead>
          )}
          {only === "client" && (
            <TableHead className="">Client/Vendor</TableHead>
          )}
          {only === "employee" && <TableHead className="">Employee</TableHead>}
          {only === "client" && <TableHead className="">Status</TableHead>}
          {only === "employee" && (
            <TableHead className="">Salary Month </TableHead>
          )}

          <TableHead className="">Transaction ID</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Transaction Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
        {payments.map((row, index) => {
          return (
            <TableRow
              key={index || row._id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="w-full flex flex-row items-center gap-2">
                  <Image
                    src={`${
                      row.type === "salary"
                        ? row.to?.userID?.profileImage || "/assets/user.png"
                        : row.from?.userID?.profileImage || "/assets/user.png"
                    }`}
                    alt="Profile Image"
                    width="20"
                    height="20"
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                  <div className="flex flex-col">
                    <span className="text-dark-gray leading-5 light-graytext-base">
                      {row.type === "salary"
                        ? row.to.userID?.firstName +
                          " " +
                          row.to.userID?.lastName
                        : row.from.userID?.firstName +
                          " " +
                          row.from.userID?.lastName}
                    </span>
                    <span className="line-clamp-1 text-sm text-light-gray">
                      {row.type !== "salary" ? row.from.role : row.to.role}
                    </span>
                  </div>
                </div>
              </TableCell>
              {only === "client" && (
                <TableCell
                  className={`${
                    row.status === "fulfilled"
                      ? "text-[#34C759]"
                      : "text-primary-blue"
                  }`}
                >
                  {row.status}
                </TableCell>
              )}
              {only === "employee" && (
                <TableCell>{salaryMonth(row.createdAt + "")}</TableCell>
              )}
              <TableCell>{row.transactionID}</TableCell>
              <TableCell>{row.amount + row.bonus}</TableCell>
              <TableCell>{formatDateString(row.createdAt + "")}</TableCell>
              <TableCell className="">
                <Details payments={row} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function Details({ payments }: { payments: PayrollHistory }) {       
  return (
    <Dialog>
      {/* Prevent DropdownMenu from closing */}
      <DialogTrigger asChild>
        <EllipsisVertical className=" cursor-pointer" />
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[633px] max-w-[633px] max-h-[90vh] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
      >
        <h1 className="text-2xl font-semibold text-dark-gray">
          Manage Clients Projects
        </h1>
        <div className="flex flex-col gap-3 overflow-y-auto">
          <div className="w-full flex flex-col gap-3 px-3">
            <Label className="text-base font-medium text-gray-800">
              Payment proof
            </Label>
            <div className=" h-[200px] w-full  shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg relative ">
              <Image
                src={payments.paymentProof || "/assets/user.png"}
                alt="Profile Image"
                fill
                className="rounded-lg overflow-hidden  "
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 py-5 px-3 ">

            <div className="w-full flex flex-col gap-3 ">
              <Label className="text-base font-medium text-gray-800">
                Payment Title
              </Label>
              <input
                type="text"
                disabled
                value={payments.paymentTitle}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Type
              </Label>
              <input
                type="text"
                disabled
                value={payments.type}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3 col-span-2">
              <Label className="text-base font-medium text-gray-800">
                RequestDescription
              </Label>
              <input
                type="text"
                disabled
                value={payments.requestDescription}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                ProjectID
              </Label>
              <input
                type="text"
                disabled
                value={payments._id}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Is Requested
              </Label>
              <input
                type="text"
                disabled
                value={payments.isRequested ? "true" : "false"}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Status
              </Label>
              <input
                type="text"
                disabled
                value={payments.status}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Transaction ID
              </Label>
              <input
                type="text"
                disabled
                value={payments.transactionID}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>


            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Amount
              </Label>
              <input
                type="text"
                disabled
                value={payments.amount}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3 ">
              <Label className="text-base font-medium text-gray-800">
                Bonus
              </Label>
              <input
                type="text"
                disabled
                value={payments.bonus}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>


            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Payment by
              </Label>
              <input
                type="text"
                disabled
                value={
                  payments.from.userID?.firstName +
                  " " +
                  payments.from.userID?.lastName
                }
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Payment to
              </Label>
              <input
                type="text"
                disabled
                value={
                  payments.to.userID?.firstName +
                  " " +
                  payments.to.userID?.lastName
                }
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

          

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Payment Date
              </Label>
              <input
                type="text"
                disabled
                value={formatDateString(payments.paymentDate)}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <Label className="text-base font-medium text-gray-800">
                Requested Date
              </Label>
              <input
                type="text"
                disabled
                value={formatDateString(payments.requestedDate)}
                className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
                required
              />
            </div>

          
            
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
              Close
            </SquareButton>                        
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
