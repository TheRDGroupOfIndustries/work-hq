'use client';
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import { useState, useEffect } from "react";
import { useChat } from "@/context/ChatProvider";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useProjectContext } from "@/context/ProjectProvider";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface User {
  _id: string,
  firstName: string,
  lastName: string,
  role: string,
  profileImage: string
}

interface AddChatProps {
  setIsAddChatOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingChannels: any[];
}

interface Project {
  _id: string;
  projectDetails: {
    projectName: string;
  };
}

export default function AddChat({ setIsAddChatOpen, existingChannels }: AddChatProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const { client, createChat, checkExistingChannel } = useChat();
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch('/api/project');
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data.projects);
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
    
        fetchProjects();
      }, []);

  useEffect(() => {
    if (client) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`/api/users?query=${searchQuery}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (userRole === 'developer') {
            setUsers(data.filter((user: User) => ['developer', 'manager', 'ceo'].includes(user.role)));
          } else {
            setUsers(data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error("Failed to fetch users. Please try again.");
        }
      };
      fetchUsers();
    }
  }, [client, searchQuery, userRole]);

  const handleCreateChat = async (userId: string) => {
    if (!userId) {
      toast.error("Invalid user selected");
      return;
    }

    try {
      const existingChannel = checkExistingChannel(userId, existingChannels);
      if (existingChannel) {
        setIsAddChatOpen(false);
        if(userRole === 'ceo' || userRole === 'manager') {
          router.push(`/ceo/chats/${existingChannel.id}`)
        } else if (userRole === 'client') {
          router.push(`/c/project/${selectedProjectDetails?._id}/chats/${existingChannel.id}`)
        } else if (userRole === 'developer') {
          router.push(`/dev/project/${selectedProjectDetails?._id}/chats/${existingChannel.id}`)
        }
        return;
      }

      const channel = await createChat(userId, selectedProject);
      if (channel) {
        setIsAddChatOpen(false);
        if (userRole === 'ceo' || userRole === 'manager') {
          router.push(`/ceo/chats/${channel.id}`)
        } else if (userRole === 'client') {
          router.push(`/c/project/${selectedProjectDetails?._id}/chats/${channel.id}`)
        } else if (userRole === 'developer') {
          router.push(`/dev/project/${selectedProjectDetails?._id}/chats/${channel.id}`)
        }
      } else {
        throw new Error("Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Failed to create chat. Please try again.");
    }
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
          Add A Chat
        </h1>
        <div className="flex flex-col gap-3 w-full">
          {(userRole === 'ceo' || userRole === 'manager') && (
            <Select onValueChange={(value) => setSelectedProject(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.projectDetails.projectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
          </div>
          <ScrollArea className="h-[40vh]">
            <div className="flex flex-col p-3">
              {users.length > 0 ? (
                users.map((user) => (
                  <Card
                    key={user._id}
                    user={user}
                    onSelect={() => handleCreateChat(user._id)}
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
        </div>
      </div>
    </div>
  );
}

function Card({ user, onSelect }: { user: User; onSelect: (user: User) => void }) {
  if (!user) return null;
  return (
    <div
      className={`w-full p-1 hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr] cursor-pointer`}
      onClick={() => onSelect(user)}
    >
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full overflow-hidden">
          {user.profileImage ? (
            <Image
              fill
              src={user.profileImage as string || ''}
              alt={user.profileImage || 'User'}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col py-2 justify-between">
        <h1 className="line-clamp-1 flex text-lg font-semibold text-dark-gray mx-5">
          {user.firstName + " " + user.lastName || user._id || 'Unnamed User'}
          {user.role && <span className="font-normal"> ({user.role})</span>}
        </h1>
      </div>
    </div>
  );
}