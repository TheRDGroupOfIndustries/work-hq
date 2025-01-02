import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/context/ChatProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from 'stream-chat';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatArea() {
  const { activeChannel, client } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      fetchMessages();

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

      const handleNewMessage = (event: any) => {
        setMessages((prevMessages) => [...prevMessages, event.message]);
      };

      activeChannel.on('message.new', handleNewMessage);

      return () => {
        activeChannel.off('message.new', handleNewMessage);
      };
    }
  }, [activeChannel, client]);

  const handleReaction = async (messageId: string, reactionType: string) => {
    if (activeChannel) {
      await activeChannel.sendReaction(messageId, { type: reactionType });
    }
  };

  if (isLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex-1 w-full h-full border">
      <ScrollArea className="h-[calc(100vh-280px)] w-full rounded-md" ref={scrollRef}>
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
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user?.image as string || ''} alt={user?.name || 'User'} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.name || 'Unknown User'}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-sm font-medium text-[#1E1B39] bg-white rounded-lg p-2">
                  {message.text}
                </div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map((attachment: any, index: number) => {
                      if (attachment.type?.startsWith('image/')) {
                        return <img key={index} src={attachment.asset_url} alt={attachment.title} className="max-w-[200px] max-h-[200px] object-cover rounded" />;
                      } else if (attachment.type?.startsWith('video/')) {
                        return (
                          <video key={index} controls className="max-w-[200px] max-h-[200px] rounded">
                            <source src={attachment.asset_url} type={attachment.type} />
                            Your browser does not support the video tag.
                          </video>
                        );
                      } else {
                        return (
                          <a key={index} href={attachment.asset_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                            <FileIcon size={20} />
                            <span className="text-sm truncate">{attachment.title}</span>
                          </a>
                        );
                      }
                    })}
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(message.reaction_counts || {}).map(([type, count]) => (
                    <span key={type} className="bg-gray-200 rounded-full px-2 py-1 text-xs">
                      {type} {count as number}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
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