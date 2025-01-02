'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { StreamChat, Channel} from 'stream-chat';
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useProjectContext } from "./ProjectProvider";

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

interface ChatContextValue {
  client: StreamChat | null;
  activeChannel: Channel | null;
  setActiveChannel: (channel: Channel | null) => void;
  createChat: (userId: string) => Promise<Channel | null>;
  createGroupChat: (groupName: string, members: string[], icon?: string) => Promise<Channel | null>;
  updateGroupChat: (channelId: string, data: { groupName?: string, description?: string, icon?: string, members?: string[] }) => Promise<void>;
  deleteGroupChat: (channelId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const { data: session } = useSession();
  const { selectedProjectDetails } = useProjectContext();

  useEffect(() => {
    const initChat = async () => {
      if (session?.user?._id && !client) {
        try {
          const response = await fetch('/api/chat/token');
          const { token } = await response.json();

          if (!token) {
            throw new Error('Failed to obtain token');
          }

          await chatClient.connectUser(
            {
              id: session.user._id,
              name: session.user.firstName || session.user.name || 'User',
              image: session.user.profile_image || session.user.image || "/placeholder.svg",
            },
            token
          );

          setClient(chatClient);
        } catch (error) {
          console.error('Error initializing chat:', error);
          toast.error('Failed to initialize chat. Please try again.');
        }
      }
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
      }
    };
  }, [session, client]);

  const createChat = async (userId: string): Promise<Channel | null> => {
    if (!client || !session?.user?._id || !selectedProjectDetails?._id) {
      toast.error("Chat client not initialized, user not logged in, or project not selected");
      return null;
    }

    if (!userId) {
      toast.error("Invalid user ID");
      return null;
    }

    try {
      const response = await fetch('/api/chat/create-channel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          members: [session.user._id, userId].filter(Boolean),
          projectId: selectedProjectDetails._id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create chat');
      }

      const { channelId } = await response.json();
      const channel = client.channel('messaging', channelId);
      await channel.watch();

      return channel;
    } catch (error) {
      console.error('Error creating chat:', error);
      if (error instanceof Error) {
        toast.error(`Failed to create chat: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred while creating the chat');
      }
      return null;
    }
  };

  const createGroupChat = async (groupName: string, members: string[], icon?: string): Promise<Channel | null> => {
    if (!client || !session?.user?._id || !selectedProjectDetails?._id) {
      toast.error("Chat client not initialized, user not logged in, or project not selected");
      return null;
    }
  
    try {
      const response = await fetch('/api/chat/create-group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          groupName, 
          members: members.map(id => id.toString()),
          // icon,
          projectId: selectedProjectDetails._id
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 206) {
        // Partial success
        toast.warning(`Group created, but some users could not be added: ${data.nonExistentUsers.join(", ")}`);
      } else if (!response.ok) {
        throw new Error(data.error || 'Failed to create group chat');
      }
  
      const channel = client.channel('messaging', data.channelId);
      await channel.watch();
  
      return channel;
    } catch (error) {
      console.error('Error creating group chat:', error);
      if (error instanceof Error) {
        toast.error(`Failed to create group chat: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred while creating the group chat');
      }
      return null;
    }
  };    

  const updateGroupChat = async (channelId: string, data: { groupName?: string, description?: string, icon?: string, members?: string[] }): Promise<void> => {
    if (!client || !session?.user?._id) return;

    try {
      const response = await fetch('/api/chat/update-group', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId, ...data }),
      });

      if (!response.ok) {
        throw new Error('Failed to update group chat');
      }
    } catch (error) {
      console.error('Error updating group chat:', error);
      throw error;
    }
  };

  const deleteGroupChat = async (channelId: string): Promise<void> => {
    if (!client || !session?.user?._id) return;

    try {
      const response = await fetch('/api/chat/delete-group', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete group chat');
      }
    } catch (error) {
      console.error('Error deleting group chat:', error);
      throw error;
    }
  };

  return (
    <ChatContext.Provider 
      value={{ 
        client, 
        activeChannel, 
        setActiveChannel,
        createChat,
        createGroupChat,
        updateGroupChat,
        deleteGroupChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};