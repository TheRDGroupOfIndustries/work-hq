import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id.toString();

    if (typeof userId !== "string" || userId.trim() === "") {
      throw new Error("Invalid user ID");
    }

    const token = serverClient.createToken(userId);

    if (!token) {
      throw new Error("Failed to create token");
    }

    try {
      await serverClient.upsertUser({
        id: userId,
        name: session.user.firstName || session.user.name || "User",
        image:
          session.user.profileImage || session.user.image || "/placeholder.svg",
      });
    } catch (error) {
      console.error("Error upserting user:", error);
      throw new Error("Failed to upsert user");
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      {
        error: "Failed to generate token",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
