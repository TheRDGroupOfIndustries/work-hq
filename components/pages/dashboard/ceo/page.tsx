'use client';
import Headline from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import React from "react";
import CompanyStatusSummary from "../components/companyStatusSummary";
import StatusCardsHeadline from "../components/StatusCardsHeadline";
import MidInformationCard from "../components/midInformationCard";
import TotalProject from "@/components/icons/TotalProject";
import TotalEmployees from "@/components/icons/TotalEmployees";
import TotalClientsAndVendors from "@/components/icons/TotalClientsAndVendors";
import EmployeesAndClientList from "../components/EmployeesAndClientList";

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
      icon: TotalProject ,
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
  ]
  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="CEO Dashboard"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <StatusCardsHeadline/>
      <CompanyStatusSummary/>
      <MidInformationCard client={false} midCardData={midCardData}  />
      <div className="flex flex-row gap-4">
        <EmployeesAndClientList list={list} redirect="/dev/project/have-todo-here/" title="Employees List"/>
        <EmployeesAndClientList list={list} redirect="" title="Employees List"/>
      </div>
    </MainContainer>
  );
}



