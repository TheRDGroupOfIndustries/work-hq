'use client'

import { useChat } from "@/context/ChatProvider";
import { Lock, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SecureAndEncrypted() {
  const { activeChannel } = useChat();

  if (!activeChannel) return null;

  const memberCount = activeChannel.data?.member_count || 0;
  const isGroupChat = memberCount as number > 2;

  return (
    <div className="flex justify-center items-center py-2 bg-muted/50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Secure and Encrypted</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your messages are end-to-end encrypted</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span className="mx-2">•</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{isGroupChat ? `Group (${memberCount})` : 'Direct Message'}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isGroupChat ? `${memberCount} members in this group` : 'Private conversation between two users'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}