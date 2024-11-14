"use client";

import { CustomUser } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Channel as StreamChannel, StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  // ChannelList,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const chatClient = StreamChat.getInstance(apiKey);

const Chats = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const { theme } = useTheme();

  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState<StreamChannel | undefined>(undefined);

  useEffect(() => {
    // Fetch user token from API
    const initChat = async () => {
      if (!user?._id) {
        console.error("User ID is missing");
        return;
      }

      const response = await fetch("/api/chat-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      const { token } = await response.json();
      // console.log(token);

      // connecting user to Stream Chat
      await chatClient.connectUser(
        {
          id: user._id,
          name: user.first_name ?? "",
          image: user.profile_image ?? "/assets/user.png",
        },
        token
      );

      const channel = chatClient.channel("messaging", "general", {
        name: "General Chat",
      });
      setChannel(channel);
      setClientReady(true);
    };

    initChat();

    return () => {
      chatClient.disconnectUser();
    };
  }, [user._id, user.first_name, user.profile_image]);

  if (!clientReady) return <div>Loading chat...</div>;

  // const filters = { members: { $in: [user?._id] }, type: "messaging" };
  // const options = { presence: true, state: true };
  // const sort = { last_message_at: -1 as const };

  return (
    <div className="w-full h-[calc(100vh-58px)]">
      <Chat
        theme={`messaging ${theme === "dark" ? "dark" : "light"}`}
        client={chatClient}
      >
        {/* <ChannelList sort={sort} filters={filters} options={options} /> */}
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
};

export default Chats;
