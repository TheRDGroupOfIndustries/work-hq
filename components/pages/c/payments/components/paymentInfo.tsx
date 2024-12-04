import { Label } from "@/components/ui/label";
import React from "react";

export default function PaymentInfo() {
  return (
    <div className="p-5 flex flex-col gap-3">
      <h4 className="text-lg font-medium font-dark-gray">
        Company Payment Details
      </h4>
      <p className="text-sm ">OR Code</p>
      <div className="ratio-square bg-slate-400 size-[200px]"></div>

      <div className="grid gap-4 grid-cols-2">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            IFSC Code
          </Label>
          <input
            type="text"
            disabled
            defaultValue={"SBIN0000000"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Account Number
          </Label>
          <input
            type="text"
            disabled
            defaultValue={"0000000000"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            UPI ID
          </Label>
          <input
            type="text"
            disabled
            defaultValue={"johan@upi"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Phone Number
          </Label>
          <input
            type="text"
            disabled
            defaultValue={"+92 0000000000"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
    </div>
  );
}
