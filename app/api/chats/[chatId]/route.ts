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
    await channel.query({ state: true, messages: { limit: 50 } })

    return NextResponse.json({
      id: channel.id,
      type: channel.type,
      cid: channel.cid,
      last_message_at: channel.lastMessage()?.created_at,
      created_at: channel.data?.created_at,
      updated_at: channel.data?.updated_at,
      member_count: channel.data?.member_count,
      data: {
        name: channel.data?.name,
        image: channel.data?.image,
        members: channel.data?.members?.map((member) => {
            if (typeof member !== 'string') { // Check if member is not a string
              const user = member.user as { id: string; name?: string; image?: string }; // Type assertion for user
              return {
                user: {
                  id: user.id, // Now it's safe to access user properties
                  name: user.name,
                  image: user.image,
                },
                // Include other properties as needed
              };
            }
            return null; 
        }).filter(Boolean),
      },
    })
  } catch (error) {
    console.error("Error fetching chat details:", error)
    return NextResponse.json({ error: "Failed to fetch chat details" }, { status: 500 })
  }
}