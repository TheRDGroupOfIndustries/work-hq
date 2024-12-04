import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { getServerSession } from "next-auth";

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY || !process.env.STREAM_API_SECRET) {
  throw new Error("Stream API key or secret is missing");
}

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export async function GET() {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = serverClient.createToken(session.user._id);
    return NextResponse.json({ token });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error generating token" },
      { status: 500 }
    );
  }
}
