import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { channelName, members, channelType = "messaging" } = await req.json();

    // Ensure members is an array and remove duplicates
    const uniqueMembers = Array.from(new Set([...members, session.user._id]));

    const channel = serverClient.channel(channelType, crypto.randomUUID(), {
      name: channelName,
      members: uniqueMembers,
      created_by_id: session.user._id,
    });

    await channel.create();

    return NextResponse.json({ 
      channelId: channel.id,
      message: "Channel created successfully" 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating channel:", error);
    return NextResponse.json(
      { error: "Failed to create channel" },
      { status: 500 }
    );
  }
}