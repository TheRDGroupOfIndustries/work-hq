import MainContainer from "@/components/reusables/wrapper/mainContainer";
import ChatArea from "./components/chatArea";
import InputArea from "./components/inputArea";
import SecureAndEncripted from "./components/SecureAndEncripted";
import { ROLE } from "@/tempData";
import Headline from "@/components/reusables/components/headline";

export default function Chatings() {
  
  return (
    <MainContainer role={ROLE}>
        <Headline role={ROLE} title="Managing Director" subTitle="Project / Chats" />
      <div className="h-full w-full flex flex-col ">
        <SecureAndEncripted />
        <ChatArea />
        <InputArea />
      </div>
    </MainContainer>
  );
}
