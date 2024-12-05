import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Channel, ChannelSortBase, DefaultGenerics } from "stream-chat";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const filter = { members: { $in: [session.user._id] } };
    const sort: { last_message_at: number } = { last_message_at: -1 };
    const channels = await serverClient.queryChannels(
      filter,
      sort as ChannelSortBase,
      {
        watch: true,
        state: true,
      }
    );

    // Serialize the channels data to avoid circular structure
    const serializedChannels = channels.map(
      (channel: Channel<DefaultGenerics>) => ({
        id: channel.id,
        type: channel.type,
        cid: channel.cid,
        last_message_at: channel.lastMessage()?.created_at,
        created_at: channel.data?.created_at, // Access created_at from channel.data
        updated_at: channel.data?.updated_at,
        member_count: channel.data?.member_count,
        data: {
          name: channel.data?.name,
          image: channel.data?.image,
          members: channel.data?.members?.map((member) => {
            if (typeof member !== 'string') { // Check if member is not a string
              const user = member.user as { id: string; name?: string; image?: string }; // Type assertion for user
              return {
                user: {
                  id: user.id, // Now it's safe to access user properties
                  name: user.name,
                  image: user.image,
                },
                // Include other properties as needed
              };
            }
            return null; 
          }).filter(Boolean),
        },
        state: {
          messages: channel.state.messages.map((message) => ({
            id: message.id,
            text: message.text,
            user: {
              id: message.user?.id,
              name: message.user?.name,
              image: message.user?.image,
            },
            created_at: message.created_at,
            updated_at: message.updated_at,
          })),
        },
      })
    );

    return NextResponse.json(serializedChannels);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}