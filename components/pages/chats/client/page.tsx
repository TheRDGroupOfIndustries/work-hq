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

export default function Chats() {
  const [isAddChatOpen, setIsAddChatOpen] = useState(false);
  const [channels, setChannels] = useState<Channel<DefaultGenerics>[]>([]);
  const { client, setActiveChannel } = useChat();
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("/api/chats");
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    if (client) {
      fetchChannels();
    }
  }, [client]);

  const handleChannelClick = (channel: Channel<DefaultGenerics>) => {
    setActiveChannel(channel);
    router.push(
      `/c/project/${selectedProjectDetails?._id}/chats/${channel.id}`
    );
  };

  // const headLineButtons = [
  //   {
  //     buttonText: "Add Chat",
  //     type: "lightGray",
  //     onNeedIcon: false,
  //     onClick: () => alert("Clicked"),
  //     dialogContent: <AddChat setIsAddChatOpen={setIsAddChatOpen} />,
  //   },
  // ];
  return (
    <MainContainer role={ROLE}>
      {isAddChatOpen && <AddChat setIsAddChatOpen={setIsAddChatOpen} />}

      <Headline role={ROLE} setIsAddChatOpen={setIsAddChatOpen} />
      {channels.map((channel) => (
        <Card
          key={channel.id}
          channel={channel}
          onClick={() => handleChannelClick(channel)}
        />
      ))}
    </MainContainer>
  );
}

interface CardProps {
  channel: Channel;
  onClick: () => void;
}

function Card({ channel, onClick }: CardProps) {
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
              alt={channel.data?.name || "Channel"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-400 rounded-full flex items-center justify-center">
              <p className="text-white text-2xl font-bold">
                {channel.data?.name?.charAt(0)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col py-3 justify-between">
        <h1 className="text-lg font-semibold text-dark-gray mx-5">
          {channel.data?.name || "Unnamed Channel"}
          <span className="font-normal">
            {channel.data?.role ? `(${channel.data.role})` : ""}
          </span>
        </h1>
        <h4 className="text-base text-dark-gray mx-5">
          {channel.state.messages[channel.state.messages.length - 1]?.text ||
            "No messages yet"}
        </h4>
      </div>

      <div className="flex justify-end items-center mr-5 py-2">
        {/* <span className="self-end text-base text-dark-gray">
          {new Date(channel?.lastMessage()?.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span> */}
      </div>
    </div>
  );
}
