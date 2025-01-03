"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import { useChat } from "@/context/ChatProvider";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatArea from "../../bigChat/components/chatArea";
import SecureAndEncripted from "../../bigChat/components/SecureAndEncripted";
// import InputArea from "../../bigChat/components/inputArea";
import Headline from "../../bigChat/components/headline";

export default function Chatings() {
  const { client, setActiveChannel, activeChannel } = useChat();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (client && id) {
      const loadChannel = async () => {
        try {
          const channel = client.channel('messaging', id as string);
          await channel.watch();
          setActiveChannel(channel);
        } catch (error) {
          console.error("Error loading channel:", error);
        } finally {
          setLoading(false);
        }
      };
      loadChannel();
    }
  }, [client, id, setActiveChannel]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activeChannel) {
    return <div>Channel not found</div>;
  }

  return (
    <MainContainer role={ROLE}>
      <Headline />
      <div className="h-full w-full flex flex-col">
        <SecureAndEncripted />
        <ChatArea />
        {/* <InputArea /> */}
      </div>
    </MainContainer>
  );
}