import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { serverClient } from "@/utils/serverClient"
import { utapi } from "@/server/uploadthing"
import { Attachment, DefaultGenerics } from 'stream-chat'

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const channel = serverClient.channel('messaging', params.chatId)
    const result = await channel.query({ messages: { limit: 50 } })

    return NextResponse.json({ messages: result.messages })
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
    const formData = await request.formData()
    const text = formData.get('text') as string
    const files = formData.getAll('files') as File[]

    const channel = serverClient.channel('messaging', params.chatId)

    let attachments: Attachment<DefaultGenerics>[] = []

    if (files.length > 0) {
      const uploadedFiles = await utapi.uploadFiles(files)
      attachments = uploadedFiles.map((file) => ({
        type: file.data?.type || 'application/octet-stream',
        asset_url: file.data?.url || '',
        title: file.data?.name || 'Untitled',
      }))
    }

    const message = await channel.sendMessage({
      text,
      user_id: session.user._id,
      attachments,
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}