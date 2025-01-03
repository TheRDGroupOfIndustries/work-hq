import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { channelId, groupName, description, icon, members, removedMembers } = await req.json();

    const channel = serverClient.channel("messaging", channelId);

    // Update channel data
    await channel.updatePartial({
      set: {
        name: groupName,
        description,
        image: icon,
      },
    });

    // Add new members if provided
    if (members && members.length > 0) {
      await channel.addMembers(members.map((memberId: string) => ({
        user_id: memberId,
      })));
    }

    // Remove members if provided
    if (removedMembers && removedMembers.length > 0) {
      await channel.removeMembers(removedMembers);
    }

    return NextResponse.json({
      message: "Group updated successfully",
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating group:", error);
    return NextResponse.json(
      { error: "Failed to update group" },
      { status: 500 }
    );
  }
}