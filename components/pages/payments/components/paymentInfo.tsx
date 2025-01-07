"use client";

import React, { useEffect, useState } from "react";
import { PaymentInfoValues } from "@/lib/types";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { useDispatch } from "react-redux";
import { setPaymentInfoValues } from "@/redux/slices/ceo";

export default function PaymentInfo() {
  const [companyDetail, setCompanyDetail] = useState<PaymentInfoValues | null>(
    null
  );
  const dispatch = useDispatch();

  const reduxCompanyDetail = useSelector(
    (state: RootState) => state.ceo.paymentInfoValues
  );

  useEffect(() => {
    async function fetchCompanyDetail() {
      try {
        const response = await fetch("/api/PaymentInfo/get/companyDetail");
        const data = await response.json();
        setCompanyDetail(data?.paymentInfo as PaymentInfoValues);
        dispatch(setPaymentInfoValues(data?.paymentInfo as PaymentInfoValues));
      } catch (error) {
        console.error("Error fetching company detail:", error);
      }
    }

    if (reduxCompanyDetail) {
      setCompanyDetail(reduxCompanyDetail);
    } else {
      fetchCompanyDetail();
    }

  }, [dispatch, reduxCompanyDetail]);

  // console.log(companyDetail);

  return (
    <div className="p-5 flex flex-col gap-3">
      <h4 className="text-lg font-medium font-dark-gray">
        Company Payment Details
      </h4>
      <p className="text-sm ">OR Code</p>
      <div className="ratio-square bg-slate-400 size-[200px] rounded-xl shadow-[10px_10px_20px_0px_#1c2c4766,-5px_-5px_15px_0px_#d8d8d8] overflow-hidden">
        {companyDetail?.qrCode ? (
          <Image
            src={companyDetail?.qrCode || "/assets/user.png"}
            alt="company logo"
            width={400}
            height={400}
            className="w-full h-full"
          ></Image>
        ) : (
          <div className="w-full h-full flex-center">
            <p className="text-sm font-medium text-gray-950">
              No QR Code Available
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4 grid-cols-2">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            IFSC Code
          </Label>
          <input
            type="text"
            disabled
            value={companyDetail?.ifsc || "No IFSC Code Available"}
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
            value={
              companyDetail?.accountNo || "No Account Number Available"
            }
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
            value={companyDetail?.upiID || "No UPI ID Available"}
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
            value={companyDetail?.phoneNo || "No Phone Number Available"}
            placeholder="e.g. Johan"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
          />
        </div>
      </div>
    </div>
  );
}
