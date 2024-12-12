import Headline, { ButtonObjectType } from '@/components/reusables/components/headline';
import MainContainer from '@/components/reusables/wrapper/mainContainer';
import { ROLE } from '@/tempData';
import { SquarePen } from 'lucide-react';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTransactionsHistory from '../components/allTransactionsHistory';
export default function Payment() {
  const headLineButtons = [
    {
      buttonText: "Edit Method",
      icon: <SquarePen />,
      onNeedIcon: false,
      dialogContent: <div>PA</div>,
    },
  ]  as ButtonObjectType[];

  return (
    <MainContainer >
      <Headline
        role={ROLE}
        title="Payments Management"
        subTitle="Project / Chats"
        buttonObjects={headLineButtons}
      />

<Tabs defaultValue="paymentDetail" className="mt-5">
        <TabsList className="flex rounded-none h-[65px]  shadow-neuro-4 rounded-t-xl flex-row items-center justify-around w-full  bg-transparent text-base font-semibold text-black px-0 my-">
          <TabsTrigger
            className={` data-[state=active]:border-primary-blue `}
            value="yourAddedMethod"
          >
            Your Added Method
          </TabsTrigger>
          <TabsTrigger
              className={` data-[state=active]:border-primary-blue `}
            value="transactionsHistory"
          >
            Transactions History
          </TabsTrigger>
          <TabsTrigger
              className={` data-[state=active]:border-primary-blue `}
            value="clientPayments"
          >
            Client Payments
          </TabsTrigger>
          <TabsTrigger
              className={` data-[state=active]:border-primary-blue `}
            value="employeeSalaries"
          >
            Employee Salaries
          </TabsTrigger>
          <TabsTrigger
            className={` data-[state=active]:border-primary-blue `}
            value="advancePaymentRequest"
          >
            Advance Payment Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yourAddedMethod">
          {/* it is same as your payment info can you handle it */}
        </TabsContent>
        <TabsContent value="transactionsHistory">
          <AllTransactionsHistory/>
        </TabsContent>
        <TabsContent value="clientPayments">
          
        </TabsContent>
        <TabsContent value="employeeSalaries">
          
        </TabsContent>
        <TabsContent value="advancePaymentRequest">
          
        </TabsContent>
      </Tabs>
    </MainContainer>
  )
}

