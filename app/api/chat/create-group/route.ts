import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient, createVideoToken } from "@/utils/serverClient";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { groupName, members, icon } = await req.json();

    if (!Array.isArray(members) || members.length < 2) {
      return NextResponse.json({ error: "Invalid members array" }, { status: 400 });
    }

     // Ensure old connections are disconnected
     await serverClient.disconnectUser();
     const token = await createVideoToken(session.user._id)

     // Connect the user to the client
     await serverClient.connectUser(
       { id: session.user._id },
       token
     );

    const uniqueMembers = Array.from(new Set(members.map(String)));
    console.log("uniques",uniqueMembers);

    const userResponses = await Promise.all(
      uniqueMembers.map(memberId => 
        serverClient.queryUsers({ id: memberId })
      )
    );

    const existingUserIds = userResponses
      .flatMap(response => response.users)
      .map(user => user.id);

      console.log("existing",existingUserIds);

    const nonExistentUsers = uniqueMembers.filter(memberId => !existingUserIds.includes(memberId));

    if (nonExistentUsers.length > 0) {
      return NextResponse.json({
        error: `The following users don't exist: ${nonExistentUsers.join(',')}` 
      }, { status: 400 });
    }

    const channel = serverClient.channel("messaging", crypto.randomUUID(), {
      name: groupName,
      image: icon,
      members: uniqueMembers,
      created_by_id: session.user._id,
    });

    await channel.create();

    return NextResponse.json({ 
      channelId: channel.id,
      message: "Group created successfully" 
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group", details: error.message },
      { status: 500 }
    );
  }
}