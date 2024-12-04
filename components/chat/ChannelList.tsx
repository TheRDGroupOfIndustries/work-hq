"use client";

import { useEffect, useState } from "react";
import {
  Channel,
  ChannelFilters,
  ChannelSort,
  ChannelOptions,
  Event,
  DefaultGenerics,
} from "stream-chat";
import { useChatContext } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChannelListProps {
  onChannelSelect: (channel: Channel<DefaultGenerics>) => void;
}

export function ChannelList({ onChannelSelect }: ChannelListProps) {
  const { client } = useChatContext();
  const [channels, setChannels] = useState<Channel<DefaultGenerics>[]>([]);

  useEffect(() => {
    if (!client) return;

    const fetchChannels = async () => {
      const filter: ChannelFilters = { members: { $in: [client.userID!] } };
      const sort: ChannelSort = { last_message_at: -1 };
      const options: ChannelOptions = { limit: 30 };

      const channels = await client.queryChannels(filter, sort, options);
      setChannels(channels);
    };

    fetchChannels();

    const handleNewChannel = (event: Event<DefaultGenerics>) => {
      if (event.type === "channel.created" && event.channel) {
        const newChannel = event.channel;
        if (newChannel instanceof Channel) {
          setChannels((prev) => [...prev, newChannel]);
        }
      }
    };

    client.on("channel.created", handleNewChannel);

    return () => {
      client.off("channel.created", handleNewChannel);
    };
  }, [client]);

  return (
    <div className="space-y-2 p-4">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onChannelSelect(channel)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Avatar>
            <AvatarImage
              src={
                typeof channel.data?.image === "string"
                  ? channel.data.image
                  : undefined
              }
            />
            <AvatarFallback>
              {channel.data?.name?.[0]?.toUpperCase() || "C"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="font-medium">{channel.data?.name || "Channel"}</p>
            <p className="text-sm text-muted-foreground truncate">
              {channel.state.messages[channel.state.messages.length - 1]
                ?.text || "No messages yet"}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
