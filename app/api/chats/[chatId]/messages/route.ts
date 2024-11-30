import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { serverClient } from "@/utils/serverClient"

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const channel = serverClient.channel('messaging', params.chatId)
    const messages = await channel.query({ messages: { limit: 50 } })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { text } = await request.json()
    const channel = serverClient.channel('messaging', params.chatId)
    const message = await channel.sendMessage({
      text,
      user_id: session.user._id,
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}