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

    const { members } = await req.json();

    if (!Array.isArray(members)) {
      return NextResponse.json({ error: "Invalid members array" }, { status: 400 });
    }

    const uniqueMembers = Array.from(new Set(members.filter(Boolean).map(String)));

    if (uniqueMembers.length < 2) {
      return NextResponse.json({ error: "At least two unique members are required" }, { status: 400 });
    }

    const userResponses = await Promise.all(
      uniqueMembers.map(memberId => 
        serverClient.queryUsers({ id: memberId })
      )
    );

    const existingUserIds = userResponses
      .flatMap(response => response.users)
      .map(user => user.id);

    const nonExistentUsers = uniqueMembers.filter(memberId => !existingUserIds.includes(memberId));

    if (nonExistentUsers.length > 0) {
      return NextResponse.json({ 
        error: `The following users don't exist: ${nonExistentUsers.join(', ')}` 
      }, { status: 400 });
    }

    const channel = serverClient.channel("messaging", crypto.randomUUID(), {
      members: uniqueMembers,
      created_by_id: session.user._id,
    });

    await channel.create();

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