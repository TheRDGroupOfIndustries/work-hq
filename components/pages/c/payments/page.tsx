'use client';
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import PaymentInfo from "./components/paymentInfo";
import MyPayments from "./components/myPayments";
import PaymentRequest from "./components/paymentRequest";
import AddPayment from "./components/addPayment";
import Headline from "@/components/reusables/components/headline";

export default function Payments() {
  const headLineButtons = [
    { buttonText: "Add Payment", lightGrayColor: false, onNeedIcon: false, onClick: () => console.log("Export Report"), dialogContent: <AddPayment/> },
  ];
  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} title="Helpdest Tickets" subTitle="Project / Chats" buttonObjects={headLineButtons} />
      <Tabs defaultValue="paymentInfo" className="">
        <TabsList className="flex rounded-none h-[65px]  shadow-[3px_3px_10px_0px_#789BD399_inset,-5px_-5px_15px_0px_#FFFFFF] rounded-t-xl flex-row items-center justify-around w-full  bg-transparent text-base font-semibold text-black px-0 my-">
          <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="paymentInfo">Company Payment Info</TabsTrigger>
          <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="myPayments">My Payments</TabsTrigger>
          <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="paymentRequest">Payment Requests</TabsTrigger>
          <TabsTrigger className={`${
                ROLE === VENDOR
                  ? "data-[state=active]:border-vendor-dark"
                  : "data-[state=active]:border-primary-blue"
              } `} value="clientPayments">Client Payments</TabsTrigger>        
        </TabsList>
        <TabsContent value="paymentInfo"><PaymentInfo/></TabsContent>
        <TabsContent value="myPayments"><MyPayments/></TabsContent>
        <TabsContent value="paymentRequest"><PaymentRequest/></TabsContent>
        <TabsContent value="clientPayments">Same as My Payments</TabsContent>
      </Tabs>
    </MainContainer>
  );
}
