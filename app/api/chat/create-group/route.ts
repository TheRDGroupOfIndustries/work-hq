import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";
import crypto from "crypto";
import User from "@/models/User"; // Assuming you have a User model

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { groupName, members, icon } = await req.json();

    if (!Array.isArray(members) || members.length < 1) {
      return NextResponse.json({ error: "Invalid members array" }, { status: 400 });
    }

    // Convert all member IDs to strings, including ObjectId types
    const uniqueMembers = Array.from(new Set([
      session.user._id.toString(),
      ...members.map(id => id.toString())
    ]));

    console.log("Unique members:", uniqueMembers);

    // Query the database to check for existing users
    const existingUsers = await User.find({ _id: { $in: uniqueMembers } });
    const existingUserIds = existingUsers.map(user => user._id.toString());

    console.log("Existing user IDs:", existingUserIds);

    const nonExistentUsers = uniqueMembers.filter(memberId => !existingUserIds.includes(memberId));

    if (nonExistentUsers.length > 0) {
      return NextResponse.json({
        error: "Some users could not be added to the group",
        nonExistentUsers: nonExistentUsers,
        existingUsers: existingUserIds
      }, { status: 206 }); // Using 206 Partial Content to indicate partial success
    }

    // Create user objects for Stream Chat
    const streamUsers = existingUsers.map(user => ({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      image: user.profileImage || undefined,
    }));

    // Ensure all users exist in Stream Chat
    await Promise.all(streamUsers.map(user => 
      serverClient.upsertUser(user)
    ));

    const channel = serverClient.channel("messaging", crypto.randomUUID(), {
      name: groupName,
      image: icon,
      members: existingUserIds,
      created_by_id: session.user._id.toString(),
    });

    await channel.create();

    return NextResponse.json({ 
      channelId: channel.id,
      message: "Group created successfully",
      addedUsers: existingUserIds
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group", details: error.message },
      { status: 500 }
    );
  }
}