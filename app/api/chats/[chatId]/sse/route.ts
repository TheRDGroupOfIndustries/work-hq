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

  const channel = serverClient.channel('messaging', params.chatId)

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      channel.on('message.new', (event) => {
        const data = JSON.stringify(event)
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      })

      await channel.watch()
    },
    cancel() {
      channel.stopWatching()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}