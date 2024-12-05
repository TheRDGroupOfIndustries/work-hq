import MainContainer from "@/components/reusables/wrapper/mainContainer";
import ChatArea from "@/components/pages/bigChat/components/chatArea";
import InputArea from "@/components/pages/bigChat/components/inputArea";
import SecureAndEncripted from "@/components/pages/bigChat/components/SecureAndEncripted";
import { ROLE } from "@/tempData";
import Headline from "@/components/reusables/components/headline";
import TicketInfo from "@/components/pages/bigChat/components/ticketInfo";

export default function Chatings() {
  const headLineButtons = [
    { buttonText: "Ticket Info", lightGrayColor: true, onNeedIcon: true, onClick: () => console.log("Export Report"), dialogContent: <TicketInfo/> },
  ];
  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} title="Helpdest Tickets" subTitle="Project / Chats" buttonObjects={headLineButtons} />

      <div className="h-full w-full flex flex-col ">
        <SecureAndEncripted />
        <ChatArea />
        <InputArea />
      </div>
    </MainContainer>
  );
}
