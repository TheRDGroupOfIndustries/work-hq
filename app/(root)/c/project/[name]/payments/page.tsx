import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Headline from "./components/headline";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";

export default function Payments() {
  return (
    <MainContainer role={ROLE}>
      <Headline />
      <Tabs defaultValue="allMetting" className="">
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
        </TabsList>
        <TabsContent value="paymentInfo">kl</TabsContent>
        <TabsContent value="myPayments">45</TabsContent>
        <TabsContent value="paymentRequest">66</TabsContent>
      </Tabs>
    </MainContainer>
  );
}
