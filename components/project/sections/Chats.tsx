"use client";

import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Channel as StreamChannel, StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { CustomUser } from "@/lib/types";
import "stream-chat-react/dist/css/v2/index.css";
import { useProjectContext } from "@/context/ProjectProvider";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const chatClient = StreamChat.getInstance(apiKey);

const Chats = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const { selectedProject } = useProjectContext();
  const { theme } = useTheme();

  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState<StreamChannel | undefined>(undefined);
  const [clientConnected, setClientConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const initChat = useCallback(async () => {
    try {
      if (!user?._id || !selectedProject) {
        console.error("User ID or Project ID is missing");
        return;
      }

      const response = await fetch("/api/projects/chat-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          projectId: selectedProject,
          projectTitle: selectedProject,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error(data.error);
        return;
      }

      // connecting user if not already connected
      if (!chatClient?.userID) {
        await chatClient.connectUser(
          {
            id: user._id,
            name: user.firstName || "User Name",
            image: user.profileImage || "/assets/user.png",
          },
          data.token
        );
        setClientConnected(true);
      }

      const newChannel = chatClient.channel(
        "messaging",
        selectedProject || "project-id"
      );
      await newChannel.watch();
      setChannel(newChannel);
      setClientReady(true);
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  }, [
    user._id,
    user.firstName,
    user.profileImage,
    selectedProject,
  ]);

  useEffect(() => {
    initChat();

    return () => {
      chatClient.disconnectUser();
      setClientConnected(false);
      setClientReady(false);
    };
  }, [
    user._id,
    user.firstName,
    user.profileImage,
    selectedProject,
    initChat,
  ]);

  // reconnecting if the client disconnects unexpectedly
  useEffect(() => {
    const handleReconnect = async () => {
      if (!clientConnected && !reconnecting) {
        setReconnecting(true);
        await initChat();
        setReconnecting(false);
      }
    };

    chatClient.on("connection.changed", ({ online }) => {
      if (!online) handleReconnect();
    });

    return () => {
      chatClient.off("connection.changed", handleReconnect);
    };
  }, [clientConnected, initChat, reconnecting]);

  if (!clientReady || reconnecting) {
    return (
      <div className="flex items-center justify-center h-full">
        {reconnecting ? "Reconnecting chat..." : "Loading chat..."}
      </div>
    );
  }

  return (
    <Chat
      theme={`${theme === "dark" || theme === "system"
        ? "str-chat__theme-dark"
        : "str-chat__theme-light"
        }`}
      client={chatClient}
    >
      <div className="flex w-full h-full">
        {channel ? (
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            No channel available
          </div>
        )}
      </div>
    </Chat>
  );
};

export default Chats;