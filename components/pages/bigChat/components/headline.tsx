"use client";
import { useChat } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from 'lucide-react';

export default function Headline() {
  const { activeChannel } = useChat();

  if (!activeChannel) return null;

  const isGroup = activeChannel.data?.member_count as number > 2;
  const name = activeChannel.data?.name || "Chat";
  const image = activeChannel.data?.image;
  const memberCount = activeChannel.data?.member_count || 0;

  return (
    <div className="flex items-center space-x-4">
      {isGroup ? (
        <Avatar className="h-10 w-10">
          <AvatarImage src={image as string || ''} />
          <AvatarFallback><Users /></AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-10 w-10">
          <AvatarImage src={image as string || ''} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        {isGroup && (
          <p className="text-sm text-muted-foreground">{memberCount as number} members</p>
        )}
      </div>
    </div>
  );
}