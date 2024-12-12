"use client";
import TotalClientsAndVendors from "@/components/icons/TotalClientsAndVendors";
import TotalEmployees from "@/components/icons/TotalEmployees";
import TotalProject from "@/components/icons/TotalProject";
import AllProjectListTable from "@/components/reusables/components/AllProjectListTable";
import Headline from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { useProjectContext } from "@/context/ProjectProvider";
import { ROLE } from "@/tempData";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CompanyStatusSummary from "../components/companyStatusSummary";
import EmployeesAndClientList from "../components/EmployeesAndClientList";
import MidInformationCard from "../components/midInformationCard";
import StatusCardsHeadline from "../components/StatusCardsHeadline";
import HelpDeskTicketsListTable, { Ticket } from "@/components/reusables/components/HelpDeskTicketsListTable";
import { useSession } from "next-auth/react";
import AllTransactionsHistoryTable from "@/components/reusables/components/AllTransactionsHistoryTable";

export default function Dashboard() {
  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ];

  const midCardData = [
    {
      title: "Tptal Project",
      icon: TotalProject,
      data: "58",
    },
    {
      title: "Total Employees",
      icon: TotalEmployees,
      data: 55,
    },
    {
      title: "Total Client/Vendors",
      icon: TotalClientsAndVendors,
      data: "8",
    },
  ];

  const list = [
    {
      name: "John Doe",
      info: "Project Manager",
    },
    {
      name: "John Doe",
      info: "Project Manager",
    },
    {
      name: "John Doe",
      info: "Project Manager",
    },
  ];
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
          list={list}
          redirect="/dev/project/have-todo-here/"
          title="Employees List"
        />
        <EmployeesAndClientList
          list={list}
          redirect=""
          title="Employees List"
        />
      </div>
      <ProjectList />
      <HelpdeskTicketsList />
      <PayrollList />
    </MainContainer>
  );
}

function ProjectList() {
  const router = useRouter();
  const { userAllProjects, setSelectedProject } = useProjectContext();
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
        <div className="w-full flex flex-col gap-4 px-2">
          <AllProjectListTable
            setSelectedProject={setSelectedProject}
            list={userAllProjects}
          />
        </div>
      </div>
    </Container>
  );
}

function HelpdeskTicketsList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (session?.user?._id) {
        try {
          const response = await fetch(`/api/ticket/get`);
          if (!response.ok) {
            throw new Error('Failed to fetch tickets');
          }
          const data = await response.json();
          setTickets(data.tickets || []);
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      }     
    };

    fetchTickets();
  }, [session]);
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
        <div className="w-full flex flex-col gap-4 px-2">
        <HelpDeskTicketsListTable filteredTickets={tickets} />
        </div>
      </div>
    </Container>
  );
}

function PayrollList() {
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
        <div className="w-full flex flex-col gap-4 px-2">
        <AllTransactionsHistoryTable payments={[]} />
        </div>
      </div>
    </Container>
  );
}
