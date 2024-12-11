"use client";

import React from "react";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { SquarePen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SalaryHistory from "../components/SalaryHistory";
import AdvancePaymentRequest from "../components/AdvancePaymentRequest";
import EditSalaryMethod from "../components/EditSalaryMethod";
import RequestAdvancePayment from "../components/RequestAdvancePayment";
import PaymentDetails from "@/components/reusables/components/paymentDetails";
import { Label } from "@/components/ui/label";

export default function Salary() {
  const headLineButtons = [
    {
      buttonText: "Edit Method",
      icon: <SquarePen />,
      onNeedIcon: false,
      dialogContent: <EditSalaryMethod />,
    },
    {
      buttonText: "Request Advance Payment",
      type: "withCustomColor",
      onNeedIcon: true,
      dialogContent: <RequestAdvancePayment />,
    },
  ] as ButtonObjectType[];
  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="Profile"
        subTitle="Project / profile"
        buttonObjects={headLineButtons}
      />

      <Container>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col  border-r border-dark-gray">
            <h1 className="text-lg font-medium">Upcoming Salary</h1>
            <p className="text-base font-normal">
              Total Amount:{" "}
              <span className="font-semibold text-2xl">Rs. 50,000</span>
            </p>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-[80%] text-base text-dark-gray mx-auto grid grid-cols-2 gap-2">
              <Label>Title:</Label>
              <Label>January Month Salary</Label>

              <Label>Total Amount:</Label>
              <Label>Rs. 50,000</Label>

              <Label>Bonus:</Label>
              <Label>Rs. 10,000</Label>

              <Label>Salary Date:</Label>
              <Label>24th January, 2022</Label>
            </div>
          </div>
        </div>
      </Container>

      <Tabs defaultValue="paymentDetail" className="mt-5">
        <TabsList className="flex rounded-none h-[65px]  shadow-neuro-4 rounded-t-xl flex-row items-center justify-around w-full  bg-transparent text-base font-semibold text-black px-0 my-">
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="paymentDetail"
          >
            Your Payment Details
          </TabsTrigger>
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="salaryHistory"
          >
            SalaryHistory
          </TabsTrigger>
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="advancePaymentRequest"
          >
            Advance Payment Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paymentDetail">
          <PaymentDetails title="Payment Details" />
        </TabsContent>
        <TabsContent value="salaryHistory">
          <SalaryHistory />
        </TabsContent>
        <TabsContent value="advancePaymentRequest">
          <AdvancePaymentRequest />
        </TabsContent>
      </Tabs>
    </MainContainer>
  );
}
