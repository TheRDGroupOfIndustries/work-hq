"use client";

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/context/ChatProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Event, MessageResponse, DefaultGenerics } from 'stream-chat';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileIcon, Download, Reply, Trash2, MoreVertical } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InputArea from './inputArea';
import Image from 'next/image';

interface Attachment {
  type?: string;
  asset_url: string;
  title?: string;
}

interface Message {
  id: string;
  text?: string;
  user?: User;
  created_at?: string | Date;
  attachments?: Attachment[];
  reaction_counts?: Record<string, number>;
  quoted_message?: Message;
}

export default function ChatArea() {
  const { activeChannel, client } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (activeChannel) {
      setIsLoading(true);
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/chats/${activeChannel.id}/messages`);
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setIsLoading(false);
        }
      };

      const updateUsers = async () => {
        const members = Object.keys(activeChannel.state.members);
        const userResponse = await client?.queryUsers({ id: { $in: members } });
        if (userResponse?.users) {
          const userMap = userResponse.users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as { [key: string]: User });
          setUsers(userMap);
        }
      };
      updateUsers();

      const handleNewMessage = (event: Event<DefaultGenerics>) => {
        const newMessage = event.message as MessageResponse<DefaultGenerics>;
        if (newMessage) {
          setMessages((prevMessages) => [...prevMessages, newMessage as Message]);
        }
      };

      const handleDeletedMessage = (event: Event<DefaultGenerics>) => {
        const deletedMessage = event.message as MessageResponse<DefaultGenerics>;
        if (deletedMessage) {
          setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== deletedMessage.id));
        }
      };

      activeChannel.on('message.new', handleNewMessage);
      activeChannel.on('message.deleted', handleDeletedMessage);
      fetchMessages();

      return () => {
        activeChannel.off('message.new', handleNewMessage);
        activeChannel.off('message.deleted', handleDeletedMessage);
      };
    }
  }, [activeChannel, client]);

  const handleAttachmentClick = (attachment: Attachment) => {
    window.open(attachment.asset_url, '_blank');
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleDelete = async (messageId: string) => {
    if (!activeChannel) return;
    try {
      const response = await fetch(`/api/chats/${activeChannel.id}/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex-1 w-full h-full border flex flex-col">
      <ScrollArea className="flex-1 w-full rounded-md" ref={scrollRef}>
        <div className="h-full w-full flex flex-col gap-5 pb-2">
          {messages.map((message) => {
            const user = users[message.user?.id || ''];
            const isOwnMessage = message.user?.id === client?.user?.id;
            return (
              <div
                key={message.id}
                className={`flex flex-col w-fit max-w-[90%] rounded-lg mt-2 ${
                  isOwnMessage
                    ? 'self-end mr-2 shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#ffffffcc]'
                    : 'ml-2 shadow-[5px_5px_5px_0px_#789BD399,-5px_-5px_5px_0px_#f6ffffcc]'
                } p-2`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user?.image as string || ''} alt={user?.name || 'User'} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name || 'Unknown User'}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at || Date.now()).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleReply(message)}>
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </DropdownMenuItem>
                      {isOwnMessage && (
                        <DropdownMenuItem onClick={() => handleDelete(message.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {message.quoted_message && (
                  <div className="bg-gray-100 p-2 rounded-lg mb-2 text-sm">
                    <p className="font-medium">Replying to {users[message.quoted_message.user?.id || '']?.name || 'Unknown User'}:</p>
                    <p>{message.quoted_message.text}</p>
                  </div>
                )}
                <div className="text-sm font-medium text-[#1E1B39] bg-white rounded-lg p-2">
                  {message.text}
                </div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map((attachment, index) => {
                      if (attachment.type?.startsWith('image/')) {
                        return (
                          <div key={index} className="relative group">
                            <Image
                              fill
                              src={attachment.asset_url}
                              alt={attachment.title || 'Image'}
                              className="max-w-[200px] max-h-[200px] object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => handleAttachmentClick(attachment)}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDownload(attachment.asset_url, attachment.title || 'image')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      } else if (attachment.type?.startsWith('video/')) {
                        return (
                          <div key={index} className="relative group">
                            <video
                              controls
                              className="max-w-[200px] max-h-[200px] rounded"
                            >
                              <source src={attachment.asset_url} type={attachment.type} />
                              Your browser does not support the video tag.
                            </video>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDownload(attachment.asset_url, attachment.title || 'video')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="relative group">
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 hover:bg-gray-100"
                              onClick={() => handleAttachmentClick(attachment)}
                            >
                              <FileIcon className="h-4 w-4" />
                              <span className="text-sm truncate max-w-[150px]">
                                {attachment.title || 'File'}
                              </span>
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute -right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDownload(attachment.asset_url, attachment.title || 'file')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <InputArea replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}