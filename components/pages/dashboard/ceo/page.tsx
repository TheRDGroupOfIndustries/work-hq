'use client';
import Headline from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import React from "react";
import CompanyStatusSummary from "../components/companyStatusSummary";

export default function Dashboard() {
  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
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
      <Status/>
      <CompanyStatusSummary/>
    </MainContainer>
  );
}

function Status() {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">Today's Status</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Working Employees</span>
              <span className="text-light-gray">04</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Working Hours</span>
              <span className="text-light-gray">04 hours</span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">All Project Status</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Current Figma Links</span>
              <span className="text-light-gray">04</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Live Deployment Links</span>
              <span className="text-light-gray">04</span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="h-full w-full flex flex-col gap-2">
          <h1 className="text-base font-semibold">Today Meetings</h1>
          <div className="flex flex-col  font-normal">
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Meetings to attend</span>
              <span className="text-light-gray">04</span>
            </div>
            <div className="flex flex-row text-base items-center w-full justify-between">
              <span className="text-light-gray">Meetings completed</span>
              <span className="text-light-gray">04</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


