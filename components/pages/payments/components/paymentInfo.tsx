"use client";

import React, { useEffect, useState } from "react";
import { PaymentInfoValues } from "@/lib/types";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function PaymentInfo() {
  const [companyDetail, setCompanyDetail] = useState<PaymentInfoValues | null>(
    null
  );

  useEffect(() => {
    async function fetchCompanyDetail() {
      try {
        const response = await fetch("/api/PaymentInfo/get/companyDetail");
        const data = await response.json();
        setCompanyDetail(data?.paymentInfo as PaymentInfoValues);
      } catch (error) {
        console.error("Error fetching company detail:", error);
      }
    }

    fetchCompanyDetail();
  }, []);

  console.log(companyDetail);

  return (
    <div className="p-5 flex flex-col gap-3">
      <h4 className="text-lg font-medium font-dark-gray">
        Company Payment Details
      </h4>
      <p className="text-sm ">OR Code</p>
      <div className="ratio-square bg-slate-400 size-[200px] rounded-xl shadow-[10px_10px_20px_0px_#1c2c4766,-5px_-5px_15px_0px_#d8d8d8] overflow-hidden">
        <Image
          src={companyDetail?.qrCode || "/assets/user.png"}
          alt="company logo"
          width={400}
          height={400}
          className="w-full h-full"
        ></Image>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            IFSC Code
          </Label>
          <input
            type="text"
            disabled
            defaultValue={companyDetail?.ifsc || "SBIN0000000"}
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
            defaultValue={companyDetail?.accountNo || "0000000000"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">UPI ID</Label>
          <input
            type="text"
            disabled
            defaultValue={companyDetail?.upiID || "ashri@upi"}
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
            defaultValue={companyDetail?.phoneNo || "+91 123456789"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
    </div>
  );
}
