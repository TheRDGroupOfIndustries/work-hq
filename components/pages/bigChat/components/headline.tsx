"use client";
import { useChat } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MoreVertical, ChevronUp, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from 'sonner';
import { Search, Upload, X } from 'lucide-react';
import Image from "next/image";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage: string;
}

export default function Headline() {
  const { activeChannel, updateGroupChat, deleteGroupChat, client } = useChat();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [confirmGroupName, setConfirmGroupName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const canEditOrDelete = userRole === 'ceo' || userRole === 'manager';

  useEffect(() => {
    if (activeChannel) {
      setGroupName(activeChannel.data?.name || "");
      setDescription(activeChannel.data?.description as string || "");
      setIconPreview(activeChannel.data?.image as string || null);
      const members = Object.values(activeChannel.state.members || {}).map(member => ({
        _id: member.user_id!,
        firstName: member.user?.name || '',
        lastName: '',
        role: member.role || '',
        profileImage: member.user?.image as string || '',
      }));
      setSelectedUsers(members);
    }
  }, [activeChannel]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`/api/users?query=${searchQuery}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!activeChannel) return null;

  const isGroup = activeChannel.data?.member_count as number > 2;
  const image = activeChannel.data?.image;

  const getOtherUserName = (): string => {
    if (!isGroup && client) {
      const members = Object.values(activeChannel.state.members || {});
      const otherMember = members.find(member => member.user?.id !== client.userID);
      return otherMember?.user?.name || "Unknown User";
    }
    return activeChannel.data?.name || "Chat";
  };

  const name = isGroup ? activeChannel.data?.name || 'Group Chat' : getOtherUserName();
  const members = Object.values(activeChannel.state.members || {})
    .map(member => member.user?.name)
    .filter(Boolean);

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

  const handleUpdateGroup = async () => {
    if (!activeChannel.id) return;
    try {
      let iconUrl = activeChannel.data?.image as string;
      if (icon) {
        const formData = new FormData();
        formData.append('file', icon);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          iconUrl = data.url;
        }
      }

      const response = await fetch(`/api/chat/update-group`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId: activeChannel.id,
          groupName,
          description,
          icon: iconUrl,
          members: selectedUsers.map(user => user._id),
          removedMembers: Object.values(activeChannel.state.members || {})
            .map(member => member.user_id)
            .filter(id => !selectedUsers.some(user => user._id === id))
        }),
      });

      if (!response.ok) throw new Error('Failed to update group');

      await updateGroupChat(activeChannel.id, {
        name: groupName,
        description,
        image: iconUrl,
        members: selectedUsers.map(user => user._id)
      });

      setIsUpdateDialogOpen(false);
      toast.success('Group updated successfully');
    } catch (error) {
      console.error('Error updating group:', error);
      toast.error('Failed to update group');
    }
  };

  const handleDeleteGroup = async () => {
    if (!activeChannel.id) return;
    try {
      await deleteGroupChat(activeChannel.id);
      setIsDeleteDialogOpen(false);
      setConfirmGroupName('');
      setConfirmDelete(false);
      router.push(`/c/project/${selectedProjectDetails?._id}/chats`);
      toast.success(`${isGroup ? 'Group' : 'Chat'} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${isGroup ? 'group' : 'chat'}:`, error);
      toast.error(`Failed to delete ${isGroup ? 'group' : 'chat'}`);
    }
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers(prev =>
      prev.some(u => u._id === user._id)
        ? prev.filter(u => u._id !== user._id)
        : [...prev, user]
    );
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user._id !== userId));
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        {isGroup ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={image as string || ''} />
            <AvatarFallback><Users /></AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarImage src={image as string || ''} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          {isGroup && (
            <p className="text-sm text-muted-foreground">
              {members.join(', ')}
            </p>
          )}
        </div>
      </div>

      {canEditOrDelete && (<DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isGroup && (
            <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
              Edit Group Settings
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-600"
          >
            Delete {isGroup ? 'Group' : 'Chat'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>)}

      {/* Edit Group Settings Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="w-[733px] m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-dark-gray">Edit Group Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-gray">Group Icon</label>
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
              <label className="text-sm font-medium text-dark-gray">Group Name</label>
              <Input
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-gray">Group Description</label>
              <Textarea
                placeholder="Enter group description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-gray">Manage Members</label>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="bg-[#E4EEFE] w-full py-3 px-6 rounded-xl border border-[#C1C7CD] flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-[#697077]">
                    {selectedUsers.length > 0
                      ? `${selectedUsers.length} member${selectedUsers.length > 1 ? 's' : ''} selected`
                      : 'Select members'}
                  </span>
                  <ChevronUp className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center gap-1 bg-[#E4EEFE] px-2 py-1 rounded-full"
                      >
                        <span className="text-sm">{user.firstName} {user.lastName}</span>
                        <button
                          onClick={() => removeSelectedUser(user._id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

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
                          onSelect={toggleUserSelection}
                          isSelected={selectedUsers.some(u => u._id === user._id)}
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
              onClick={() => setIsUpdateDialogOpen(false)}
              className="text-[#6A6A6A] border-[#C1C7CD]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateGroup}
              className="bg-primary-blue text-white"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[733px] m-4 bg-background flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-semibold text-red-500">
              <AlertTriangle className="h-8 w-8" />
              Delete {isGroup ? 'Group' : 'Chat'}
            </DialogTitle>
            <DialogDescription className="text-base text-dark-gray pt-2">
              Are you sure you want to delete this {isGroup ? 'group' : 'chat'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {isGroup ? (
              <div className="space-y-2">
                <Input
                  placeholder="Type group name to confirm"
                  value={confirmGroupName}
                  onChange={(e) => setConfirmGroupName(e.target.value)}
                  className="bg-[#E4EEFE] border-[#C1C7CD] rounded-xl placeholder:text-[#697077]"
                />
              </div>
            ) : (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="confirm-delete"
                  checked={confirmDelete}
                  onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
                />
                <label
                  htmlFor="confirm-delete"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand that deleting this chat is irreversible.
                </label>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setConfirmGroupName('');
                setConfirmDelete(false);
              }}
              className="text-[#6A6A6A] border-[#C1C7CD]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteGroup}
              disabled={isGroup ? confirmGroupName !== (activeChannel?.data?.name || '') : !confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete {isGroup ? 'Group' : 'Chat'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Card({ user, onSelect, isSelected }: { user: User; onSelect: (user: User) => void; isSelected?: boolean }) {
  if (!user) return null;
  return (
    <div
      className={`w-full p-1 hover:shadow-[5px_5px_15px_0px_#789BD399,-5px_-5px_8px_0px_#ffffffcc] rounded-xl grid grid-cols-[minmax(60px,_60px)_1fr] cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
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
      <div className="flex items-center justify-end pr-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => { }}
          className="h-5 w-5"
        />
      </div>
    </div>
  );
}