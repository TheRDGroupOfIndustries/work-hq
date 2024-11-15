import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
// import Project from "@/models/Project";
// import Chat from "@/models/Chat";

const api_key = process.env.STREAM_API_KEY! ?? "";
const api_secret = process.env.STREAM_API_SECRET! ?? "";

const serverClient = StreamChat.getInstance(api_key, api_secret);

export const POST = async (request: NextRequest) => {
  const { userId, projectId, projectTitle } = await request.json();

  try {
    await connectToMongoDB();

    // uncomment this to fetch chat records from db when projectId is provided
    // const chat = await Chat.findById({ project: projectId });
    // if (!chat) {
    //   return new NextResponse("Chat doesn't exist!", {
    //     status: 404,
    //   });
    // }

    // const project = await Project.findById({ _id: projectId });
    // if (!project) {
    //   return NextResponse.json({
    //     status: 404,
    //     success: false,
    //     error: "Project doesn't exist!",
    //   });
    // }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User doesn't exist!",
      });
    }

    const members = await User.find();

    const memberIds = members.map(
      (member) => member._id !== user._id && member._id.toString()
    );

    // creating or fetching Stream user
    const token = serverClient.createToken(user._id.toString());
    // console.log("token : ", token);

    if (!token) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Token doesn't exist!",
      });
    }

    await serverClient.upsertUser({
      id: user?._id.toString(),
      name: user?.first_name || "user name",
      image: user?.profile_image || "/assets/user.png",
      role: "admin",
    });

    // creating or getting a chat channel and add members
    const channel = serverClient.channel(
      "messaging",
      projectId || "project-id",
      {
        name: projectTitle || "Project Title",
        members: [...memberIds], // replace with chat.members
        created_by: { id: user._id.toString() },
      }
    );
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
