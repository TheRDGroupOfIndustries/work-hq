import MainContainer from "@/components/reusables/wrapper/mainContainer";

import { ROLE } from "@/tempData";
import Headline from "@/components/reusables/components/headline";
import ChatArea from "@/components/pages/bigChat/components/chatArea";
import SecureAndEncripted from "@/components/pages/bigChat/components/SecureAndEncripted";
import InputArea from "@/components/pages/bigChat/components/inputArea";

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
