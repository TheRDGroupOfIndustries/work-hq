"use client";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import PaymentDetails from "@/components/reusables/components/paymentDetails";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomUser, PaymentValues } from "@/lib/types";
import { formatDateString } from "@/lib/utils";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AdvancePaymentRequest from "../components/AdvancePaymentRequest";
import EditSalaryMethod from "../components/EditSalaryMethod";
import RequestAdvancePayment from "../components/RequestAdvancePayment";
import SalaryHistory from "../components/SalaryHistory";

export default function Salary() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [payments, setPayments] = useState<PaymentValues[]>([]);

  useEffect(() => {
    const fetchUpcomingSalaryDetails = async () => {
      if (!user?._id) return;
      const response = await fetch(`/api/payment/get/getByUserID/${user?._id}`,{
        cache: "no-store"
      });
      const data = await response.json();

      console.log("payments", data);

      setPayments(data.payments || []);
    };
    fetchUpcomingSalaryDetails();
  }, [user?._id]);

  const upcomingSalaryDetails: PaymentValues | undefined = payments?.find(
    (payment: PaymentValues) => payment.status === "upcoming"
  );

  const salaryHistory: PaymentValues[] = payments?.filter(
    (payment: PaymentValues) => payment.status === "fulfilled"
  );

  const advancePaymentRequest: PaymentValues[] = payments?.filter(
    (payment: PaymentValues) => payment.isRequested
  );

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
      Rs.
      <Container>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col  border-r border-dark-gray">
            <h1 className="text-lg font-medium">Upcoming Salary</h1>
            <p className="text-base font-normal">
              Total Amount:{" "}
              <span className="font-semibold text-2xl">
                ₹ {upcomingSalaryDetails?.amount.toLocaleString() || "N/A"}
              </span>
            </p>
          </div>

          <div className="w-full flex flex-col">
            <div className="w-[80%] text-base text-dark-gray mx-auto grid grid-cols-2 gap-2">
              <Label>Title:</Label>
              <Label className="text-right">
                {upcomingSalaryDetails?.paymentTitle || "N/A"}
              </Label>

              <Label>Total Amount:</Label>
              <Label className="text-right">
                ₹ {upcomingSalaryDetails?.amount.toLocaleString() || "N/A"}
              </Label>

              <Label>Bonus:</Label>
              <Label className="text-green-600 text-right">
                ₹ {upcomingSalaryDetails?.bonus?.toLocaleString() || "N/A"}
              </Label>

              <Label>Salary Date:</Label>
              <Label className="text-right">
                {formatDateString(upcomingSalaryDetails?.paymentDate + "") ||
                  "N/A"}
              </Label>
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
          <SalaryHistory payments={salaryHistory} />
        </TabsContent>
        <TabsContent value="advancePaymentRequest">
          <AdvancePaymentRequest
            advancePaymentRequest={advancePaymentRequest}
          />
        </TabsContent>
      </Tabs>
    </MainContainer>
  );
}
