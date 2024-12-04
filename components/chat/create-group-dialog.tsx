"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { CustomUser } from "@/lib/types";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (name: string, members: string[]) => void;
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onCreateGroup,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<CustomUser[]>([]);

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`/api/users?query=${searchQuery}`);
          if (!response.ok) throw new Error("Failed to fetch users");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [open, searchQuery]);

  const handleCreateGroup = () => {
    onCreateGroup(groupName, selectedMembers);
    setGroupName("");
    setGroupDescription("");
    setSelectedMembers([]);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="group-icon">Group Icon</Label>
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>GP</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Group Description</Label>
            <Textarea
              id="description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="This is group description"
            />
          </div>
          <div className="grid gap-2">
            <Label>Add Members</Label>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((memberId) => {
                const user = users.find((u) => u._id === memberId);
                return (
                  <div
                    key={memberId}
                    className="flex items-center gap-1 bg-accent rounded-full px-3 py-1"
                  >
                    <span className="text-sm">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedMembers((prev) =>
                          prev.filter((id) => id !== memberId)
                        )
                      }
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2"
            />
            <div className="mt-2 max-h-40 overflow-y-auto">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() =>
                    setSelectedMembers((prev) => [...prev, user._id])
                  }
                  className="w-full text-left p-2 hover:bg-accent rounded-md"
                  disabled={selectedMembers.includes(user._id)}
                >
                  {user.firstName} {user.lastName} - {user.role}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreateGroup}>Create Group</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
