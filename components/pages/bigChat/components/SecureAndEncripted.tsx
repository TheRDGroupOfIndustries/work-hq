'use client'

import { useChat } from "@/context/ChatProvider";
import { Lock, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SecureAndEncripted() {
  const { activeChannel } = useChat();

  const memberCount = activeChannel?.state?.members ? Object.keys(activeChannel.state.members).length : 0;
  const isGroupChat = memberCount > 2;

  return (
    <div className="h-[75px] w-full flex justify-center items-center">
      <div className="w-auto h-full flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center mr-4">
                <Lock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Secure and Encrypted</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your messages are end-to-end encrypted</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">
                  {isGroupChat ? `Group (${memberCount})` : 'Direct Message'}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isGroupChat ? `${memberCount} members in this group` : 'Private conversation between two users'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}