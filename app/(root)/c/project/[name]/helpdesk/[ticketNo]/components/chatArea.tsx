'use client';

import { useEffect, useState } from 'react';
import { useChat } from '@/context/ChatProvider';
import { Channel, StreamChat, MessageResponse, Event } from 'stream-chat';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from 'next/navigation';

type CustomMessageType = {
  id: string;
  text: string;
  user: {
    id: string;
    name: string | undefined; // Allow name to be undefined
  } | null;
  created_at: string | Date;
};

export default function ChatArea() {
  const { client, activeChannel, setActiveChannel } = useChat();
  const [messages, setMessages] = useState<CustomMessageType[]>([]);
  const { ticketNo } = useParams();

  useEffect(() => {
    if (client && ticketNo) {
      const channelId = Array.isArray(ticketNo) ? ticketNo[0] : ticketNo;
      const channel = client.channel('messaging', channelId);
      const messageHandler = (event: Event) => {
        if (event.type === 'message.new' && event.message) {
          const message = event.message;
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: message.id,
              text: message.text || '',
              user: message.user && message.user.name
                ? {
                    id: message.user.id,
                    name: message.user.name,
                  }
                : null,
              created_at: message.created_at || new Date(),
            },
          ]);
        }
      };
  
      channel.watch().then(() => {
        setActiveChannel(channel);
        channel.on('message.new', messageHandler);  // Listen for 'message.new' event
      });
  
      return () => {
        channel.off('message.new', messageHandler);  // Remove the listener for 'message.new' event
      };
    }
  }, [client, ticketNo, setActiveChannel]);

  useEffect(() => {
    if (activeChannel) {
      activeChannel.query({ messages: { limit: 30 } }).then((response) => {
        const formattedMessages: CustomMessageType[] = response.messages.map((msg) => ({
          id: msg.id,
          text: msg.text || '',
          user: msg.user
            ? {
                id: msg.user.id,
                name: msg.user.name || undefined, // Allow name to be undefined
              }
            : null,
          created_at: msg.created_at || new Date(),
        }));
        setMessages(formattedMessages);
      });
    }
  }, [activeChannel]);

  return (
    <div className="flex-1 w-full h-full border">
      <ScrollArea className="h-[40vh] w-full rounded-md">
        <div className="h-full w-full flex flex-col gap-5 pb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ${
                message.user?.id === client?.userID ? 'self-end mr-2' : 'ml-2'
              } shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#f6ffffcc] p-2`}
            >
              <div className="flex flex-row text-xs text-[#858585] items-center justify-between gap-4">
                <p>{message.user?.name || 'Unknown'}</p>
                <p>{new Date(message.created_at).toLocaleTimeString()}</p>
              </div>
              <div className="text-sm font-medium text-[#1E1B39]">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}