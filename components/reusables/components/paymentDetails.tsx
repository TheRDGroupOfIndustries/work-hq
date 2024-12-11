"use client";

import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useState } from "react";
import { CustomUser, PaymentInfoValues } from "@/lib/types";
import { useSession } from "next-auth/react";

export default function PaymentDetails({ title }: { title: string }) {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [userPaymentInfo, setUserPaymentInfo] =
    useState<PaymentInfoValues | null>(null);

  useEffect(() => {
    async function fetchUserDevPaymentInfo() {
      try {
        const response = await fetch(
          `/api/PaymentInfo/get/userDetail/${user?.id}`
        );
        const data = await response.json();
        setUserPaymentInfo(data?.paymentInfo as PaymentInfoValues);
      } catch (error) {
        console.error("Error fetching company detail:", error);
      }
    }

    fetchUserDevPaymentInfo();
  }, [user?.id]);

  console.log(userPaymentInfo);
  return (
    <div className="p-5 flex flex-col gap-3">
      <h4 className="text-lg font-medium font-dark-gray">{title}</h4>
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
            defaultValue={userPaymentInfo?.ifsc}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
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
            defaultValue={userPaymentInfo?.accountNo}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">UPI ID</Label>
          <input
            type="text"
            disabled
            defaultValue={userPaymentInfo?.upiID}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
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
            defaultValue={userPaymentInfo?.phoneNo}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
    </div>
  );
}
