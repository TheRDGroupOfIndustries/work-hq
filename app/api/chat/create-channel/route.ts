import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";
import crypto from "crypto";
import Channel from "@/models/Channel";
import User from "@/models/User";

async function channelExists(members: string[], projectId: string): Promise<boolean> {
  const channel = await Channel.findOne({
    members: { $all: members, $size: members.length },
    projectIDs: projectId
  });
  return !!channel;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { members, projectId } = await req.json();

    if (!Array.isArray(members) || !projectId) {
      return NextResponse.json({ error: "Invalid members array or projectId" }, { status: 400 });
    }

    const uniqueMembers = Array.from(new Set(members.filter(Boolean).map(String)));

    if (uniqueMembers.length < 2) {
      return NextResponse.json({ error: "At least two unique members are required" }, { status: 400 });
    }

    if (await channelExists(uniqueMembers, projectId)) {
      return NextResponse.json({ error: "Channel already exists" }, { status: 400 });
    }

    const users = await User.find({ _id: { $in: uniqueMembers } });
    const userNames = users.map(user => user.firstName).join(', ');

    const channelName = uniqueMembers.length > 2 ? `Group: ${userNames}` : userNames;

    const channel = serverClient.channel("messaging", crypto.randomUUID(), {
      members: uniqueMembers,
      name: channelName,
      created_by_id: session.user._id,
      projectId: projectId,
    });

    await channel.create();

    // Save the channel to the database
    const newChannel = new Channel({
      channelID: channel.id,
      members: uniqueMembers,
      projectIDs: [projectId],
      roleBased: [], // Add roles if needed
      channelName: channelName,
    });
    await newChannel.save();

    return NextResponse.json({ 
      channelId: channel.id,
      message: "Channel created successfully" 
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating channel:", error);
    return NextResponse.json(
      { error: "Failed to create channel", details: error.message },
      { status: 500 }
    );
  }
}