"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import PaymentInfo from "./../components/paymentInfo";
import MyPayments from "./../components/myPayments";
import PaymentRequest from "./../components/paymentRequest";
import AddPayment from "./../components/addPayment";
import Headline from "@/components/reusables/components/headline";
import { useSession } from "next-auth/react";
import { CustomUser, PaymentValues } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Payments() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [payments, setPayments] = useState<PaymentValues[]>([]);
  const onlyRequestedPayments: PaymentValues[] = payments.filter(
    (payment) => payment.status === "requested"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchPayments() {
      if (!user?._id) return;
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `/api/payment/get/getByUserID/${user?._id}`
        );
        const data = await response.json();
        console.log(data);

        if (data.status === 404) {
          setError(data?.error || "No payments have been made.");
          setPayments([]);
          return;
        }
        setPayments(data?.payments || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("An error occurred while fetching payments.");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, [user?._id]);

  const headLineButtons = [
    {
      buttonText: "Add Payment",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
      dialogContent: <AddPayment />,
    },
  ];

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Payments"
        subTitle="Project / Payments"
        buttonObjects={headLineButtons}
      />
      <Tabs defaultValue="paymentInfo" className="">
        <TabsList className="flex rounded-none h-[65px]  shadow-[3px_3px_10px_0px_#789BD399_inset,-5px_-5px_15px_0px_#FFFFFF] rounded-t-xl flex-row items-center justify-around w-full  bg-transparent text-base font-semibold text-black px-0 my-">
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="paymentInfo"
          >
            Company Payment Info
          </TabsTrigger>
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="myPayments"
          >
            My Payments
          </TabsTrigger>
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="paymentRequest"
          >
            Payment Requests
          </TabsTrigger>
          <TabsTrigger
            className={`${
              ROLE === VENDOR
                ? "data-[state=active]:border-vendor-dark"
                : "data-[state=active]:border-primary-blue"
            } `}
            value="clientPayments"
          >
            Client Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paymentInfo">
          <PaymentInfo />
        </TabsContent>
        <TabsContent value="myPayments">
          <MyPayments
            payments={payments || []}
            loading={loading}
            error={error}
          />
        </TabsContent>
        <TabsContent value="paymentRequest">
          <PaymentRequest
            payments={onlyRequestedPayments || []}
            loading={loading}
            error={
              !onlyRequestedPayments?.length
                ? "No Payment Requests are made"
                : error
            }
          />
        </TabsContent>
        <TabsContent value="clientPayments">
          <MyPayments
            payments={payments || []}
            loading={loading}
            error={error}
          />
        </TabsContent>
      </Tabs>
    </MainContainer>
  );
}
