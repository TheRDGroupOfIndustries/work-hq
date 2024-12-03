'use client';
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import Headline from "./components/headline";
import { ROLE } from "@/tempData";
import RaiseTicket from "./components/raiseTicket";
import { useState } from "react";

export default function Helpdesk() {
  const [isRaiseTicketOpen, setIsRaiseTicketOpen] = useState(false);
  return (
    <MainContainer role={ROLE}>
      {isRaiseTicketOpen && <RaiseTicket setIsRaiseTicketOpen={setIsRaiseTicketOpen} />}
      <Headline setIsRaiseTicketOpen={setIsRaiseTicketOpen}/>
    </MainContainer>
  );
}
