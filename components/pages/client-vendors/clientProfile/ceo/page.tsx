"use client";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import { Ban, Mail, MessageCircleMore, Phone } from "lucide-react";
import React from "react";
import PaymentHistory from "../../components/PaymentHistory";
import Projects from "../../components/Projects";

export default function ClinetProfile() {
  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
    {
      buttonText: "Ban Clinet",
      icon: <Ban size={18} color="#FF3B30" />,
      color: "!text-[#FF3B30]",
      type: "withCustomTextColor",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];
  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <Container>
        <div className="w-full h-fit grid grid-cols-[1fr_2fr] p-4">
          <div className="h-full w-full flex flex-col items-center justify-center border-r border-[#9c9c9c] gap-4">
            <div className="w-[140px] h-[140px] rounded-full bg-[#d2d2d2]"></div>
            <h4 className="text-base text-dark-gray">Client</h4>
            <h6 className="text-base text-[#007AFF]">Client@gmail.com</h6>
            <div className="flex flex-row items-center gap-4 max-h-[100px]">
                <Phone />
                <Mail />
                <MessageCircleMore />
              </div>
          </div>
          <div className="h-full flex flex-col gap-2 items-center justify-center w-full">
            <Line/>
            <Line/>
            <Line/>
          </div>
        </div>
      </Container>
      <PaymentHistory/>
      <Projects/>
    </MainContainer>
  );
}


function Line(){
  return (
    <div className="flex flex-row items-center justify-between w-[70%]">
              <h6 className="text-base text-dark-gray">Total payments done</h6>
              <p className="self-end text-base text-gray-500">11</p>
            </div>
  )
}