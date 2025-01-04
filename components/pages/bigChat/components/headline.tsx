"use client";
import { useChat } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MoreVertical, UserPlus, UserMinus, Upload } from 'lucide-react';
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from 'sonner';

interface UpdateGroupData {
  groupName?: string;
  description?: string;
  icon?: string;
  members?: string[];
}

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
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const router = useRouter();
  const { selectedProjectDetails } = useProjectContext();

  useEffect(() => {
    if (activeChannel) {
      setGroupName(activeChannel.data?.name || "");
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

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = allUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers(allUsers);
    }
  }, [searchQuery, allUsers]);

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

  const name = isGroup ? activeChannel.data?.name || 'CHAT' : getOtherUserName();
  const members = Object.values(activeChannel.state.members || {})
    .map(member => member.user?.name)
    .filter(Boolean);

  const handleUpdateGroup = async () => {
    if (!activeChannel.id) return;
    try {
      const updateData: UpdateGroupData = {};
      if (groupName) updateData.groupName = groupName;
      if (icon) {
        const formData = new FormData();
        formData.append('file', icon);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const { url } = await response.json();
          updateData.icon = url;
        } else {
          throw new Error('Failed to upload icon');
        }
      }
      updateData.members = selectedUsers.map(user => user._id);

      const removedMembers = allUsers
        .filter(user => !selectedUsers.some(selectedUser => selectedUser._id === user._id))
        .map(user => user._id);

      const response = await fetch(`/api/chat/update-group`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId: activeChannel.id,
          ...updateData,
          removedMembers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update group');
      }

      await updateGroupChat(activeChannel.id, updateData);
      setIsUpdateDialogOpen(false);
      setIcon(null);
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
      router.push(`/c/project/${selectedProjectDetails?._id}/chats`);
      toast.success('Group deleted successfully');
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group');
    }
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers(prev =>
      prev.some(u => u._id === user._id)
        ? prev.filter(u => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
    }
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isGroup && (
            <>
              <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
                Update Group
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsMembersDialogOpen(true)}>
                Manage Members
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-600"
          >
            Delete {isGroup ? 'Group' : 'Chat'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update Group Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Group</DialogTitle>
            <DialogDescription>
              Make changes to your group chat settings here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Group Name</label>
              <Input
                id="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder={name}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="icon">Group Icon</label>
              <Input
                id="icon"
                type="file"
                accept="image/*"
                onChange={handleIconChange}
              />
              {icon && <p>{icon.name}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGroup}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Members Dialog */}
      <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Group Members</DialogTitle>
            <DialogDescription>
              Add or remove members from the group chat.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id={user._id}
                    checked={selectedUsers.some(u => u._id === user._id)}
                    onChange={() => toggleUserSelection(user)}
                  />
                  <label htmlFor={user._id}>{user.firstName} {user.lastName}</label>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsMembersDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGroup}>
              Update Members
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {isGroup ? 'Group' : 'Chat'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {isGroup ? 'group' : 'chat'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}