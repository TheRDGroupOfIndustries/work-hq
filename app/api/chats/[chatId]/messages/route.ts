import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { serverClient } from "@/utils/serverClient"
import { utapi } from "@/server/uploadthing"
import { Attachment, DefaultGenerics, Channel } from 'stream-chat'

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
    const quotedMessageId = formData.get('quoted_message_id') as string

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageData: any = {
      text,
      user_id: session.user._id,
      attachments,
    }

    if (quotedMessageId) {
      messageData.quoted_message_id = quotedMessageId
    }

    const message = await channel.sendMessage(messageData)

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { chatId: string; messageId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const channel = serverClient.channel('messaging', params.chatId)
    // Type assertion to resolve the TypeScript error
    const typedChannel = channel as Channel & { deleteMessage: (messageId: string) => Promise<unknown> }
    await typedChannel.deleteMessage(params.messageId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}