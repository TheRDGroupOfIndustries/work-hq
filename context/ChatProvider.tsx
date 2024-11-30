"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { StreamChat, Channel, ChannelFilters, User } from "stream-chat";
import { useSession } from "next-auth/react";

interface ChatContextType {
  client: StreamChat | null;
  setActiveChannel: (channel: Channel) => void;
  activeChannel: Channel | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?._id) return;

    const initChat = async () => {
      try {
        const response = await fetch("/api/chat/token");
        const { token } = await response.json();

        const streamClient = StreamChat.getInstance(
          process.env.NEXT_PUBLIC_STREAM_API_KEY!
        );

        await streamClient.connectUser(
          {
            id: session.user._id,
            name: session.user.firstName || session.user.name || 'User',
            image: session.user.profile_image || session.user.image || "/placeholder.svg",
          },
          token
        );

        setClient(streamClient);
      } catch (error) {
        console.error("Error connecting to Stream:", error);
      }
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [session?.user?._id]);

  return (
    <ChatContext.Provider value={{ client, activeChannel, setActiveChannel }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
};