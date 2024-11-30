"use client"

import { useEffect, useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreVertical, Send } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ChatViewProps {
  chatId: string
}

interface Message {
  id: string
  text: string
  user: {
    id: string
    name: string
    image?: string
  }
  created_at: string
}

export function ChatView({ chatId }: ChatViewProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatDetails, setChatDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
    fetchChatDetails()
    const eventSource = setupSSE()

    return () => {
      eventSource.close()
    }
  }, [chatId])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const setupSSE = () => {
    const eventSource = new EventSource(`/api/chats/${chatId}/sse`)
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages(prev => [...prev, data.message])
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return eventSource
  }

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchChatDetails = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}`)
      if (!response.ok) throw new Error('Failed to fetch chat details')
      const data = await response.json()
      setChatDetails(data)
    } catch (error) {
      console.error('Error fetching chat details:', error)
      toast({
        title: "Error",
        description: "Failed to load chat details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newMessage }),
      })
      if (!response.ok) throw new Error('Failed to send message')
      setNewMessage("")
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={chatDetails?.image || "/placeholder.svg"} />
            <AvatarFallback>{chatDetails?.name?.[0] || "C"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatDetails?.name || "Chat"}</h2>
            <p className="text-sm text-muted-foreground">
              {chatDetails?.members?.length || 0} members
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Add A Member</DropdownMenuItem>
            <DropdownMenuItem>Edit Group Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading messages...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[80%]",
                  message.user.id === session?.user?._id ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.user.image || "/placeholder.svg"} />
                  <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.user.id === session?.user?._id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message here..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  )
}