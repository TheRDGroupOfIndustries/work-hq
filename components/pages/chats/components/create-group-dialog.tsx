"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/context/ChatProvider";
import { useProjectContext } from "@/context/ProjectProvider";
import { ChevronDown, Search, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage: string;
}

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Project {
  _id: string;
  projectDetails: {
    projectName: string;
  };
}

export default function CreateGroupDialog({
  open,
  onOpenChange,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { createGroupChat } = useChat();
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (selectedUsers.length === 0) {
      toast.error("Please select at least one member");
      return;
    }

    try {
      let iconUrl = null;
      if (icon) {
        const formData = new FormData();
        formData.append("file", icon);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          iconUrl = data.url;
        }
      }

      const channel = await createGroupChat(
        groupName,
        selectedUsers.map((user) => user._id),
        iconUrl,
        description,
        selectedProject
      );

      if (channel) {
        onOpenChange(false);
        if (userRole === "ceo" || userRole === "manager") {
          router.push(`/ceo/chats/${channel.id}`);
        } else {
          router.push(
            `/c/project/${selectedProjectDetails?._id}/chats/${channel.id}`
          );
        }
        toast.success("Group created successfully");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Failed to create group");
    }
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id)
        ? prev.filter((u) => u._id !== user._id)
        : [...prev, user]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[733px] m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-dark-gray">
            Create A Group
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-gray">
              Group Icon
            </label>
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#E4EEFE]">
                {iconPreview ? (
                  <Image
                    src={iconPreview}
                    alt="Group icon preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Upload className="w-8 h-8 text-[#697077]" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-gray">
              Group Name
            </label>
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-gray">
              Group Description
            </label>
            <Textarea
              placeholder="Enter group description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
            />
          </div>

          {(userRole === "ceo" || userRole === "manager") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-gray">
                Select Project
              </label>
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
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-gray">
              Add Members
            </label>
            <div className="relative" ref={dropdownRef}>
              <div
                className="bg-[#E4EEFE] w-full py-3 px-6 rounded-xl border border-[#C1C7CD] flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-[#697077]">
                  {selectedUsers.length > 0
                    ? `${selectedUsers.length} member${
                        selectedUsers.length > 1 ? "s" : ""
                      } selected`
                    : "Select members"}
                </span>
                <ChevronDown className="text-[#697077]" />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full bottom-full mb-1 bg-white border border-[#C1C7CD] rounded-xl shadow-lg">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#697077]" />
                      <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[200px]">
                    {users.map((user) => (
                      <Card
                        key={user._id}
                        user={user}
                        onSelect={() => toggleUserSelection(user)}
                        isSelected={selectedUsers.some(
                          (u) => u._id === user._id
                        )}
                        isGroupChat={true}
                      />
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-[#6A6A6A] border-[#C1C7CD]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            className="bg-primary-blue text-white"
          >
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Card({
  user,
  onSelect,
  isSelected,
//   isGroupChat,
}: {
  user: User;
  onSelect: (user: User) => void;
  isSelected?: boolean;
  isGroupChat: boolean;
}) {
  if (!user) return null;
  return (
    <div
      className={`w-full p-1 hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr] cursor-pointer ${
        isSelected ? "bg-blue-100" : ""
      }`}
      onClick={() => onSelect(user)}
    >
      <div className="flex justify-center items-center">
        <div className="w-[60px] h-[60px] bg-slate-400 rounded-full overflow-hidden">
          {user.profileImage ? (
            <Image
              fill
              src={(user.profileImage as string) || ""}
              alt={user.profileImage || "User"}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col py-2 justify-between">
        <h1 className="line-clamp-1 flex text-lg font-semibold text-dark-gray mx-5">
          {user.firstName + " " + user.lastName || user._id || "Unnamed User"}
          {user.role && <span className="font-normal"> ({user.role})</span>}
        </h1>
      </div>
      <div className="flex items-center justify-end pr-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
          className="h-5 w-5"
        />
      </div>
    </div>
  );
}
