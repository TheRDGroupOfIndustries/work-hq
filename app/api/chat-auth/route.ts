import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
// import Chat from "@/models/Chat";

const api_key = process.env.STREAM_API_KEY! ?? "";
const api_secret = process.env.STREAM_API_SECRET! ?? "";

const serverClient = StreamChat.getInstance(api_key, api_secret);

export const POST = async (request: NextRequest) => {
  try {
    const {
      userId,
      //  projectId
    } = await request.json();

    await connectToMongoDB();

    // uncomment this to fetch chat records from db when projectId is provided
    // const chat = await Chat.findById({ _id: projectId });
    // if (!chat) {
    //   return new NextResponse("Chat doesn't exist!", {
    //     status: 404,
    //   });
    // }
    const user = await User.findById({ _id: userId });
    if (!user) {
      return new NextResponse("User doesn't exist!", {
        status: 404,
      });
    }

    const members = await User.find();

    const memberIds = members.map(
      (member) => member._id !== user._id && member._id.toString()
    );

    // creating or fetching Stream user
    const token = serverClient.createToken(user._id.toString());

    await serverClient.upsertUser({
      id: user?._id.toString(),
      name: user?.first_name ?? "",
      image: user?.profile_image ?? "/assets/user.png",
      role: "admin",
    });

    // Create or get a chat channel and add members
    const channel = serverClient.channel("messaging", "project-id", {
      name: "Project Title",
      members: [...memberIds], // replace with chat.members
    });
    await channel.create();

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
