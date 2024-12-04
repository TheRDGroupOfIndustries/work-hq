"use client";

import { useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useChatContext } from "@/context/ChatProvider";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateChannelDialog } from "./CreateChannelDialog";
import { ChannelList } from "./ChannelList";

import "stream-chat-react/dist/css/v2/index.css";

export function ChatContainer() {
  const { client, activeChannel, setActiveChannel } = useChatContext();
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <Chat client={client}>
        <div className="w-80 flex flex-col border-r">
          <div className="p-4 border-b">
            <Button
              onClick={() => setIsCreateChannelOpen(true)}
              className="w-full"
              variant="outline"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Channel
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ChannelList onChannelSelect={setActiveChannel} />
          </div>
        </div>

        <div className="flex-1">
          {activeChannel ? (
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a channel to start messaging
              </p>
            </div>
          )}
        </div>
      </Chat>

      <CreateChannelDialog
        open={isCreateChannelOpen}
        onOpenChange={setIsCreateChannelOpen}
      />
    </div>
  );
}
