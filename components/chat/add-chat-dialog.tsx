"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from 'lucide-react'

interface AddChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddChat: (userId: string) => void
}

export function AddChatDialog({
  open,
  onOpenChange,
  onAddChat,
}: AddChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    if (open) {
      fetchUsers()
    }
  }, [open, searchQuery])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users?query=${searchQuery}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add A Chat</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  onAddChat(user._id)
                  onOpenChange(false)
                }}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors text-left"
              >
                <Avatar>
                  <AvatarImage src={user.profile_image || "/placeholder.svg"} />
                  <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}