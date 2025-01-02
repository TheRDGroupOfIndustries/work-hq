"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { useState, useEffect } from "react";
import Headline from "../components/headline";
import { ROLE } from "@/tempData";
import AddChat from "../components/addChat";
import { useRouter } from "next/navigation";
import { useChat } from "@/context/ChatProvider";
import { Channel, DefaultGenerics } from "stream-chat";
import Image from "next/image";
import { useProjectContext } from "@/context/ProjectProvider";
import ChatSkeleton from "../components/ChatSkeleton";

export default function Chats() {
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [channels, setChannels] = useState<Channel<DefaultGenerics>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { client, setActiveChannel } = useChat();
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();

  useEffect(() => {
    const fetchChannels = async () => {
      if (!selectedProjectDetails?._id) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/chats?projectId=${selectedProjectDetails._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (client) {
      fetchChannels();
    }
  }, [client, selectedProjectDetails]);

  const handleChannelClick = (channel: Channel<DefaultGenerics>) => {
    setActiveChannel(channel);
    router.push(
      `/c/project/${selectedProjectDetails?._id}/chats/${channel.id}`
    );
  };

  return (
    <MainContainer role={ROLE}>
      {isAddChatOpen && <AddChat setIsAddChatOpen={setIsAddChatOpen} />}

      <Headline role={ROLE} setIsAddChatOpen={setIsAddChatOpen} />
      {isLoading ? (
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      ) : (
        channels.map((channel) => (
          <Card
            key={channel.id}
            channel={channel}
            onClick={() => handleChannelClick(channel)}
          />
        ))
      )}
    </MainContainer>
  );
}

interface CardProps {
  channel: Channel<DefaultGenerics>;
  onClick: () => void;
}

function Card({ channel, onClick }: CardProps) {
  const isGroupChat = channel.data?.name !== undefined;
  const channelName = isGroupChat ? channel.data?.name : getOtherMemberName(channel);
  const lastMessage = channel.state.messages[channel.state.messages.length - 1];
  const hasAttachment = lastMessage?.attachments && lastMessage.attachments.length > 0;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full py-1 pl-4 hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr_minmax(92px,_100px)]"
    >
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full overflow-hidden">
          {channel.data?.image ? (
            <Image
              src={(channel.data?.image as string) || ""}
              alt={channelName || "Channel"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-400 rounded-full flex items-center justify-center">
              <p className="text-white text-2xl font-bold">
                {channelName?.charAt(0) || 'C'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col py-3 justify-between">
        <h1 className="text-lg font-semibold text-dark-gray mx-5">
          {channelName || "Unnamed Channel"}
          {isGroupChat && <span className="font-normal ml-2">(Group)</span>}
        </h1>
        <h4 className="text-base text-dark-gray mx-5">
          {hasAttachment ? "Sent an attachment" : lastMessage?.text || "No messages yet"}
        </h4>
      </div>

      <div className="flex justify-end items-center mr-5 py-2">
        {/* You can add additional information here if needed */}
      </div>
    </div>
  );
}

function getOtherMemberName(channel: Channel<DefaultGenerics>): string {
  const currentUserId = channel._client?.userID;
  if (!currentUserId) {
    return "Unknown User";
  }
  const members = Object.values(channel.state.members);
  const otherMember = members.find(member => member.user?.id !== currentUserId);
  return otherMember?.user?.name || "Unknown User";
}