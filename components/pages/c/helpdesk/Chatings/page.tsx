import MainContainer from "@/components/reusables/wrapper/mainContainer";
import Headline from "./components/headline";
import ChatArea from "./components/chatArea";
import InputArea from "./components/inputArea";
import SecureAndEncripted from "./components/SecureAndEncripted";
import { ROLE } from "@/tempData";

export default function Chatings() {
  return (
    <MainContainer role={ROLE}>
      <Headline />
      <div className="h-full w-full flex flex-col ">
        <SecureAndEncripted />
        <ChatArea />
        <InputArea />
      </div>
    </MainContainer>
  );
}
