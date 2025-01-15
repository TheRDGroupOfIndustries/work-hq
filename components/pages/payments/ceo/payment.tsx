"use client";

import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomUser } from "@/lib/types";
import { PayrollHistory, Role } from "@/types";
import { CircleAlert, SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import AddEmployeeSalary from "../components/AddEmployeeSalary";
import AdvancePaymentRequests from "../components/AdvancePaymentRequests";
import AllTransactionsHistory from "../components/allTransactionsHistory";
import ClientAllTransactionsHistory from "../components/clientAllTransactionHistory";
import EmployeeAllTransactionsHistory from "../components/employeeAllTransactionHistory";
import PaymentInfo from "../components/paymentInfo";
import PaymentRequestClient from "../components/PaymentRequestClient";
import EditCompanyPaymentDetails from "../components/EditCompanyPaymentDetails";
export default function Payment() {
  const [payrollHistory, setPayrollHistory] = React.useState<
    PayrollHistory[] | []
  >([]);
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const headLineButtonsCEO = [
    {
      buttonText: "Edit Method",
      icon: <SquarePen size={20} color={"var(--primary-blue)"} />,
      onNeedIcon: false,
      dialogContent: <EditCompanyPaymentDetails/>,
    },
  
    {
      buttonText: "Add Payment",
      onNeedIcon: false,
      dialogContent: <AddEmployeeSalary />,
    },
    {
      buttonText: "Conpany Payment",
      icon: <CircleAlert size={20} />,
      type: "lightGray",
      onNeedIcon: false,
      dialogContent: <PaymentRequestClient />,
    },
  ] as ButtonObjectType[];

  const headLineButtonsManager = [
    {
      buttonText: "Conpany Payment",
      icon: <CircleAlert size={20} />,
      type: "lightGray",
      onNeedIcon: false,
      dialogContent: <PaymentRequestClient />,
    },
    {
      buttonText: "Add Payment",
      onNeedIcon: false,
      dialogContent: <AddEmployeeSalary />,
    },
  ] as ButtonObjectType[];

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const response = await fetch("/api/payment/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await response.json();

        setPayrollHistory(data.payments);
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    fetchPayrollHistory();
  }, []);

  return (
    <MainContainer>
      {user?.role === "ceo" && (
        <Headline
          role={user.role as Role}
          title="Payments Management"
          subTitle="Project / Chats"
          buttonObjects={headLineButtonsCEO}
        />
      )}
      {user?.role === "manager" && (
        <Headline
          role={user.role as Role}
          title="Payments"
          subTitle="All Projects / Payments"
          buttonObjects={headLineButtonsManager}
        />
      )}

      <Tabs defaultValue="yourAddedMethod" className="mt-5">
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
          <PaymentInfo />
        </TabsContent>
        <TabsContent value="transactionsHistory">
          <AllTransactionsHistory payrollHistory={payrollHistory} />
        </TabsContent>
        <TabsContent value="clientPayments">
          <ClientAllTransactionsHistory
            payrollHistory={payrollHistory.filter(
              (payment) => payment.to.role === "company"
            )}
          />
        </TabsContent>
        <TabsContent value="employeeSalaries">
          <EmployeeAllTransactionsHistory
            payrollHistory={payrollHistory.filter(
              (payment) =>
                payment.to.role === "developer" && !payment.isRequested
            )}
          />
        </TabsContent>
        <TabsContent value="advancePaymentRequest">
          <AdvancePaymentRequests
            payrollHistory={payrollHistory.filter(
              (payment) =>
                payment.to.role === "developer" &&
                payment.isRequested &&
                payment.status === "requested"
            )}
          />
        </TabsContent>
      </Tabs>
    </MainContainer>
  );
}
