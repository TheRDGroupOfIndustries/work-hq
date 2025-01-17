import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Channel, ChannelSort, DefaultGenerics } from "stream-chat";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";
import Project from "@/models/Project";
import { CustomUser } from "@/lib/types";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter : any = {
      members: { $in: [session.user._id] },
      type: { $in: ["messaging", "group"] },
    };

    if (session.user.role === 'ceo' || session.user.role === 'manager') {
      // CEO and manager can see all chats
      if (projectId) {
        filter.projectId = projectId;
      }
    } else {
      // Other roles can only see chats related to their project
      if (!projectId) {
        return NextResponse.json(
          { error: "Project ID is required" },
          { status: 400 }
        );
      }
      filter.projectId = projectId;

      // Fetch project details to get associated users
      const project = await Project.findById(projectId).populate(
        "developmentDetails.teams"
      );
      if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      const projectMembers = project.developmentDetails.teams.map((user: CustomUser) =>
        user._id.toString()
      );
      filter.members.$in.push(...projectMembers);
    }

    const sort: ChannelSort<DefaultGenerics> = { last_message_at: -1 };
    const channels = await serverClient.queryChannels(filter, sort, {
      watch: true,
      state: true,
    });

    const serializedChannels = channels.map(
      (channel: Channel<DefaultGenerics>) => ({
        id: channel.id,
        type: channel.type,
        cid: channel.cid,
        last_message_at: channel.lastMessage()?.created_at,
        created_at: channel.data?.created_at,
        updated_at: channel.data?.updated_at,
        member_count: channel.data?.member_count,
        data: {
          name: channel.data?.name,
          image: channel.data?.image,
          members: channel.state.members,
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
            attachments: message.attachments,
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