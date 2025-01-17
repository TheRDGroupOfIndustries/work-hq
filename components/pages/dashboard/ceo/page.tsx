"use client";
import TotalClientsAndVendors from "@/components/icons/TotalClientsAndVendors";
import TotalEmployees from "@/components/icons/TotalEmployees";
import TotalProject from "@/components/icons/TotalProject";
import AllProjectListTable from "@/components/reusables/components/AllProjectListTable";
import AllTransactionsHistoryTable from "@/components/reusables/components/AllTransactionsHistoryTable";
import Headline from "@/components/reusables/components/headline";
import HelpDeskTicketsListTable, {
} from "@/components/reusables/components/HelpDeskTicketsListTable";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { CustomUser, ProjectValues, TicketValues } from "@/lib/types";
import {
  setAllProjectsList,
  setClientAndVendorList,
  setEmployeesList,
  setHelpdeskTicketsList,
  setPayrollHistoryList,
} from "@/redux/slices/ceo";
import { ROLE } from "@/tempData";
import { PayrollHistory } from "@/types";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CompanyStatusSummary from "../components/companyStatusSummary";
import EmployeesAndClientList from "../components/EmployeesAndClientList";
import MidInformationCard, {
  MidInformationCardProps,
} from "../components/midInformationCard";
import StatusCardsHeadline from "../components/StatusCardsHeadline";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<CustomUser[] | []>([]);
  const [allProjects, setAllProjects] = useState<ProjectValues[] | []>([]);
  const [tickets, setTickets] = useState<TicketValues[] | []>([]);
  const [payrollHistory, setPayrollHistory] = useState<PayrollHistory[] | []>(
    []
  );
  const [midCardData, setMidCardData] = useState<MidInformationCardProps[]>([
    {
      title: "Total Project",
      icon: TotalProject,
      data: 0,
    },
    {
      title: "Total Employees",
      icon: TotalEmployees,
      data: 0,
    },
    {
      title: "Total Client/Vendors",
      icon: TotalClientsAndVendors,
      data: 0,
    },
  ]);
  const dispatch = useDispatch();
  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ];

  // Fetch all data when the component mounts or updates
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Set loading state to true while fetching data
        setLoading(true);

        // Fetch users, projects, and payments concurrently using Promise.all
        const [userRes, projectRes, paymentRes, ticketRes] = await Promise.all([
          // Fetch users from /api/user/get endpoint
          fetch("/api/user/get", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          // Fetch projects from /api/project endpoint
          fetch("/api/project", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          // Fetch payments from /api/payment/get endpoint
          fetch("/api/payment/get", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch("/api/ticket/get", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        // Parse JSON responses from each endpoint
        const [userData, projectData, paymentData, ticketData] =
          await Promise.all([
            userRes.json(),
            projectRes.json(),
            paymentRes.json(),
            ticketRes.json(),
          ]);

        // Handle user data
        if (userRes.ok) {
          // Set all users state
          setAllUsers(userData.users);

          // Filter and dispatch users by roles
          dispatch(
            setEmployeesList(
              // Filter users with role "developer"
              userData.users.filter(
                (user: CustomUser) => user.role === "developer" || user.role === "manager"
              )
            )
          );

          dispatch(
            setClientAndVendorList(
              // Filter users with roles "client" or "vendor"
              userData.users.filter(
                (user: CustomUser) =>
                  user.role === "client" || user.role === "vendor"
              )
            )
          );

          // Update mid card data with user counts
          setMidCardData((prevData) => {
            const newDatac = prevData;
            newDatac[1].data = userData.users.filter(
              (user: CustomUser) =>
                user.role === "developer" || user.role === "manager"
            ).length;
            newDatac[2].data = userData.users.filter(
              (user: CustomUser) =>
                user.role === "client" || user.role === "vendor"
            ).length;
            return newDatac;
          });
        } else {
          // Log error if user data fetch fails
          console.error("Failed to fetch users:", userData.message);
        }

        // Handle project data
        if (projectRes.ok) {
          // Set all projects state
          setAllProjects(projectData.projects);

          setMidCardData((prevData) => {
            const newDatac = prevData;
            newDatac[0].data = projectData.projects.length;

            return newDatac;
          });

          // Dispatch all projects list
          dispatch(setAllProjectsList(projectData.projects));
        } else {
          // Log error if project data fetch fails
          console.error("Failed to fetch projects:", projectData.message);
        }

        // Handle payment data
        if (paymentRes.ok) {
          // Log payment data (no further processing)
          setPayrollHistory(paymentData.payments);
          console.log("setPayrollHistory", paymentData.payments);
          dispatch(setPayrollHistoryList(projectData.payments));
        } else {
          // Log error if payment data fetch fails
          console.error("Failed to fetch payments:", paymentData.payments);
        }

        // Handle ticket data
        if (ticketRes) {
          // Log payment data (no further processing)
          setTickets(ticketData.tickets);
          dispatch(setHelpdeskTicketsList(ticketData.tickets));
        } else {
          // Log error if ticket data fetch fails
          console.error("Failed to fetch tickets:", ticketData.message);
        }
      } catch (error) {
        // Log any errors that occur during data fetching
        console.error("Error fetching data:", error);
      } finally {
        // Set loading state to false after data fetching completes
        setLoading(false);
      }
    };

    // Call the fetchAllData function
    fetchAllData();
  }, [dispatch]);

  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="CEO Dashboard"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <StatusCardsHeadline />
      <CompanyStatusSummary />
      <MidInformationCard client={false} midCardData={midCardData} />
      <div className="flex flex-row gap-4">
        <EmployeesAndClientList
          list={allUsers.filter(
            (user) => user.role === "developer" || user.role === "manager"
          )}
          redirect="/dev/project/have-todo-here/"
          title="Employees List"
        />
        <EmployeesAndClientList
          list={allUsers.filter(
            (user) => user.role === "client" || user.role === "vendor"
          )}
          redirect=""
          title="Client/Vendor List"
        />
      </div>
      <ProjectList list={allProjects} loading={loading} />
      <HelpdeskTicketsList tickets={tickets} />
      <PayrollList payrollHistory={payrollHistory} />
    </MainContainer>
  );
}

function ProjectList({
  list,
  loading,
}: {
  list: ProjectValues[];
  loading: boolean;
}) {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="uppercase text-lg font-semibold">Projects list</h2>
          <MoveRight
            onClick={() => {
              router.push("");
            }}
            color="var(--light-gray)"
            className="cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col gap-4 overflow-y-scroll px-2">
          <AllProjectListTable  list={list} loading={loading}  />
        </div>
      </div>
    </Container>
  );
}

function HelpdeskTicketsList({ tickets }: { tickets: TicketValues[] }) {
  const router = useRouter();

  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="uppercase text-lg font-semibold">
            Helpdesk Tickets list
          </h2>
          <MoveRight
            onClick={() => {
              router.push("");
            }}
            color="var(--light-gray)"
            className="cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col gap-4 px-2 overflow-y-scroll">
          <HelpDeskTicketsListTable filteredTickets={tickets} />
        </div>
      </div>
    </Container>
  );
}

function PayrollList({ payrollHistory }: { payrollHistory: PayrollHistory[] }) {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col w-full h-[500px] gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="uppercase text-lg font-semibold">Payroll History</h2>
          <MoveRight
            onClick={() => {
              router.push("");
            }}
            color="var(--light-gray)"
            className="cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col gap-4 overflow-y-scroll px-2">
          <AllTransactionsHistoryTable only="all" payments={payrollHistory} />
        </div>
      </div>
    </Container>
  );
}
