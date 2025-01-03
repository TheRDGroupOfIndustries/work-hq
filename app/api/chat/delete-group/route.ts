import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { serverClient } from "@/utils/serverClient";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { channelId } = await req.json();

    const channel = serverClient.channel("messaging", channelId);

    // Verify if user has permission to delete
    // const channelData = await channel.query();
    // if (channelData.channel?.created_by_id !== session.user._id) {
    //   return NextResponse.json({ error: "Unauthorized to delete group" }, { status: 403 });
    // }

    await channel.delete();

    return NextResponse.json({ 
      message: "Group deleted successfully" 
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    );
  }
}