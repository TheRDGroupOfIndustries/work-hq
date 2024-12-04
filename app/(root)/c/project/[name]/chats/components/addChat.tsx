'use client';
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Users } from 'lucide-react';
import { useState, useEffect } from "react";
import { useChat } from "@/context/ChatProvider";
import { User } from "stream-chat";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddChat({
  setIsAddChatOpen,
}: {
  setIsAddChatOpen: (value: boolean) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");
  const [isGroupChat, setIsGroupChat] = useState(false);
  const { client, createChat, createGroupChat } = useChat();
  const router = useRouter();

  useEffect(() => {
    if (client) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`/api/users?query=${searchQuery}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUsers(data as User[]);
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error("Failed to fetch users. Please try again.");
        }
      };
      fetchUsers();
    }
  }, [client, searchQuery]);

  const handleCreateChat = async (userId: string) => {
    if (!userId) {
      toast.error("Invalid user selected");
      return;
    }

    try {
      const channel = await createChat(userId);
      if (channel) {
        setIsAddChatOpen(false);
        router.push(`/c/project/something/chats/${channel.id}`);
      } else {
        throw new Error("Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Failed to create chat. Please try again.");
    }
  };

  const handleCreateGroupChat = async () => {
    if (groupName.trim() === "" || selectedUsers.length === 0) {
      toast.error("Please enter a group name and select at least one user.");
      return;
    }

    try {
      const channel = await createGroupChat(groupName, selectedUsers.map(user => user.id));
      if (channel) {
        setIsAddChatOpen(false);
        router.push(`/c/project/something/chats/${channel.id}`);
      } else {
        throw new Error("Failed to create group chat");
      }
    } catch (error) {
      console.error("Error creating group chat:", error);
      toast.error("Failed to create group chat. Please try again.");
    }
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers(prev =>
      prev.some(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <div
      onClick={() => setIsAddChatOpen(false)}
      className="z-5 absolute flex items-center justify-center right-0 bottom-0 left-0 h-[calc(100vh-70px)] w-full bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 w-[733px] m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
      >
        <h1 className="text-2xl font-semibold text-dark-gray">
          {isGroupChat ? "Create Group Chat" : "Add A Chat"}
        </h1>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center">
            <span className="relative w-full">
              <input
                placeholder="Search by name or role"
                className="bg-[#E4EEFE] w-full py-3 px-6 pl-11 outline-none shadow_search border-[#C1C7CD] rounded-xl placeholder:text-[#697077] placeholder:font-medium placeholder:text-base"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                color="#697077"
                strokeWidth={2.6}
                className="absolute h-[20px] w-[20px] top-[14px] left-4 font-medium"
              />
            </span>
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => setIsGroupChat(!isGroupChat)}
            >
              <Users className="mr-2 h-4 w-4" />
              {isGroupChat ? "Single Chat" : "Group Chat"}
            </Button>
          </div>
          {isGroupChat && (
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mb-2"
            />
          )}
          <ScrollArea className="h-[40vh]">
            <div className="flex flex-col p-3">
              {users.length > 0 ? (
                users.map((user) => (
                  <Card
                    key={user.id}
                    user={user}
                    onSelect={isGroupChat ? () => toggleUserSelection(user) : () => handleCreateChat(user.id)}
                    isSelected={selectedUsers.some(u => u.id === user.id)}
                    isGroupChat={isGroupChat}
                  />
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="flex justify-between">
          <SquareButton className="text-[#6A6A6A]" onClick={() => setIsAddChatOpen(false)}>
            Cancel
          </SquareButton>
          {isGroupChat && (
            <SquareButton className="bg-primary-blue text-white" onClick={handleCreateGroupChat}>
              Create Group
            </SquareButton>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ user, onSelect, isSelected, isGroupChat }: { user: User; onSelect: (user: User) => void; isSelected?: boolean; isGroupChat: boolean }) {
  if (!user) return null;
  return (
    <div
      className={`w-full p-1 hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr] cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
      onClick={() => onSelect(user)}
    >
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full overflow-hidden">
          {user.image ? (
            <img
              src={user.image as string || ''}
              alt={user.name || 'User'}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col py-2 justify-between">
        <h1 className="line-clamp-1 flex text-lg font-semibold text-dark-gray mx-5">
          {user.name || user.id || 'Unnamed User'}
          {user.role && <span className="font-normal"> ({user.role})</span>}
        </h1>
        <h4 className="text-base line-clamp-1 text-dark-gray mx-5">
          {user.online ? '🟢 Online' : '🔴 Offline'}
        </h4>
      </div>
      {isGroupChat && (
        <div className="flex items-center justify-end pr-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => { }}
            className="h-5 w-5"
          />
        </div>
      )}
    </div>
  );
}