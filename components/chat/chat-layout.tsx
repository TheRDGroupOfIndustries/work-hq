"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Megaphone, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateGroupDialog } from "./create-group-dialog";
import { AddChatDialog } from "./add-chat-dialog";
import { ChatView } from "./chat-view";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ChatGroup {
  id: string;
  name: string;
  lastMessage?: string;
  updatedAt: string;
  image?: string;
  members: string[];
}

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddChat, setShowAddChat] = useState(false);
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchChats();
    if (params.chatId) {
      setSelectedChat(params.chatId as string);
    }
  }, [params.chatId]);

  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) throw new Error("Failed to fetch chats");
      const data = await response.json();
      setGroups(
        data.map(
          (channel: {
            id: string;
            data: {
              name: string;
              members: { user: { id: string; name: string } }[];
              image: string;
            };
            state: { messages: { text: string }[] };
            last_message_at: string;
            created_at: string;
          }) => ({
            id: channel.id,
            name:
              channel.data.name ||
              channel.data.members?.map((m) => m.user?.name).join(", ") ||
              "Unnamed Channel",
            lastMessage:
              channel.state.messages[channel.state.messages.length - 1]?.text,
            updatedAt: new Date(
              channel.last_message_at || channel.created_at
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            image: channel.data.image,
            members:
              channel.data.members?.map((m) => m.user?.id).filter(Boolean) ||
              [],
          })
        )
      );
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast({
        title: "Error",
        description: "Failed to load chats. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async (name: string, members: string[]) => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, members, isGroup: true }),
      });
      if (!response.ok) throw new Error("Failed to create group");
      await fetchChats();
      setShowCreateGroup(false);
      toast({
        title: "Success",
        description: "Group created successfully.",
      });
    } catch (error) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddChat = async (userId: string) => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: [userId], isGroup: false }),
      });
      if (!response.ok) throw new Error("Failed to create chat");
      await fetchChats();
      setShowAddChat(false);
      toast({
        title: "Success",
        description: "Chat added successfully.",
      });
    } catch (error) {
      console.error("Error creating chat:", error);
      toast({
        title: "Error",
        description: "Failed to add chat. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Chats</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateGroup(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Group
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddChat(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Chat
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="p-4 text-center">Loading chats...</div>
          ) : (
            <div className="p-2 space-y-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setSelectedChat(group.id);
                    setSelectedChat(group.id);
                    router.push(`/chat/${group.id}`);
                  }}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left",
                    selectedChat === group.id && "bg-accent"
                  )}
                >
                  {group.image ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={group.image} />
                      <AvatarFallback>{group.name[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Megaphone className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium truncate">{group.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {group.updatedAt}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {group.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="flex-1">
        {selectedChat ? (
          <ChatView chatId={selectedChat} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>

      <CreateGroupDialog
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
        onCreateGroup={handleCreateGroup}
      />
      <AddChatDialog
        open={showAddChat}
        onOpenChange={setShowAddChat}
        onAddChat={handleAddChat}
      />
    </div>
  );
}
