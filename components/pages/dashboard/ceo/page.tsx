'use client';
import Headline from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import React from "react";
import CompanyStatusSummary from "../components/companyStatusSummary";
import StatusCardsHeadline from "../components/StatusCardsHeadline";

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
      <StatusCardsHeadline/>
      <CompanyStatusSummary/>
    </MainContainer>
  );
}



