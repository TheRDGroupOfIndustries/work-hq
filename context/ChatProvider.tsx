'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StreamChat, Channel } from 'stream-chat';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useProjectContext } from './ProjectProvider';

type ChatContextType = {
  client: StreamChat | null;
  setActiveChannel: React.Dispatch<React.SetStateAction<Channel | null>>;
  activeChannel: Channel | null;
  createChat: (userId: string, projectId: string | null) => Promise<Channel | null>;
  createGroupChat: (groupName: string, memberIds: string[], icon?: string | null, description?: string, projectId?: string | null) => Promise<Channel | null>;
  updateGroupChat: (channelId: string, data: any) => Promise<void>;
  deleteGroupChat: (channelId: string) => Promise<void>;
  checkExistingChannel: (userId: string, channels: Channel[]) => Channel | undefined;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const { data: session } = useSession();
  const { selectedProjectDetails } = useProjectContext();

  useEffect(() => {
    const initChat = async () => {
      if (!session?.user?._id) return;

      const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

      try {
        const response = await fetch('/api/chat/token');
        const data = await response.json();

        if (response.ok) {
          await chatClient.connectUser(
            {
              id: session.user._id,
              name: session.user.name || session.user.email,
              image: session.user.image,
            },
            data.token
          );
          setClient(chatClient);
        } else {
          console.error('Failed to get chat token:', data.error);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [session]);

  const checkExistingChannel = useCallback((userId: string, channels: Channel[]) => {
    return channels.find(channel => {
      const members = Object.keys(channel.state.members || {});
      return channel.data?.member_count === 2 &&
        members.includes(userId) &&
        members.includes(client?.userID || '');
    });
  }, [client?.userID]);

  const createChat = async (userId: string, projectId: string | null) => {
    if (!client) return null;
    try {
      const response = await fetch('/api/chat/create-channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          members: [client.userID!, userId],
          projectId: projectId || selectedProjectDetails?._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create chat');
      }

      const data = await response.json();
      const channel = client.channel('messaging', data.channelId);
      await channel.watch();
      return channel;
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat. Please try again.');
      return null;
    }
  };

  const createGroupChat = async (groupName: string, memberIds: string[], icon?: string | null, description?: string, projectId?: string | null) => {
    if (!client) return null;
    try {
      const response = await fetch('/api/chat/create-group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName,
          members: memberIds,
          icon,
          description,
          projectId: projectId || selectedProjectDetails?._id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create group chat');
      }

      const { channelId } = await response.json();
      const channel = client.channel('messaging', channelId);
      await channel.watch();
      return channel;
    } catch (error) {
      console.error('Error creating group chat:', error);
      toast.error('Failed to create group chat. Please try again.');
      return null;
    }
  };

  const updateGroupChat = async (channelId: string, data: any) => {
    if (!client) return;
    try {
      const channel = client.channel('messaging', channelId);
      await channel.update(data);
      toast.success('Group chat updated successfully');
    } catch (error) {
      console.error('Error updating group chat:', error);
      toast.error('Failed to update group chat. Please try again.');
    }
  };

  const deleteGroupChat = async (channelId: string) => {
    if (!client) return;
    try {
      const channel = client.channel('messaging', channelId);
      await channel.delete();
      toast.success('Group chat deleted successfully');
    } catch (error) {
      console.error('Error deleting group chat:', error);
      toast.error('Failed to delete group chat. Please try again.');
    }
  };

  return (
    <ChatContext.Provider value={{
      client,
      setActiveChannel,
      activeChannel,
      createChat,
      createGroupChat,
      updateGroupChat,
      deleteGroupChat,
      checkExistingChannel
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};