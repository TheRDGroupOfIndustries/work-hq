// pages/api/chat-auth.ts
import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

const api_key = process.env.STREAM_API_KEY! ?? "";
const api_secret = process.env.STREAM_API_SECRET! ?? "";

const serverClient = StreamChat.getInstance(api_key, api_secret);

export const POST = async (request: NextRequest) => {
  try {
    const { userId } = await request.json();

    await connectToMongoDB();

    const user = await User.findById({ _id: userId });
    if (!user) {
      return new NextResponse("User doesn't exist!", {
        status: 404,
      });
    }

    // creating or fetching Stream user
    const token = serverClient.createToken(user._id.toString());

    await serverClient.upsertUser({
      id: user._id.toString(),
      name: user.name,
      image: user.profileImage, // Optional: add a profile image
    });

    return NextResponse.json({
      token,
      userId: user._id,
      status: 200,
      success: true,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
