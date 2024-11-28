import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";
import Project from "@/models/Project";

const api_key = process.env.STREAM_API_KEY! ?? "";
const api_secret = process.env.STREAM_API_SECRET! ?? "";

const serverClient = StreamChat.getInstance(api_key, api_secret);

export const POST = async (request: NextRequest) => {
  const { userId, projectId, projectTitle } = await request.json();

  try {
    await connectToMongoDB();

    const project = await Project.findById({ _id: projectId });
    if (!project) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Project doesn't exist!",
      });
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "User doesn't exist!",
      });
    }

    // --- comment out and replace below code to allow only thoes members to access the chat who are involed ---

    // // fetching the CEO's user _id
    // const ceo = await User.findOne({ role: "ceo" });

    // // creating membersArray with CEO, manager, client or vendor, and assigned team members
    // const projectDetails = await Project.findById({_id: projectId}).populate("manager client vendor assigned_team");
    // const membersArray = [
    //   ceo._id.toString(),
    //   projectDetails.manager?.toString(),
    //   projectDetails.client?.toString(),
    //   projectDetails.vendor?.toString(),
    //   ...projectDetails.assigned_team.map(teamMember => teamMember.toString())
    // ].filter(Boolean); // filtering out any null or undefined values

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
      name: user?.firstName || "user name",
      image: user?.profile_image || "/assets/user.png",
      role: "admin",
    });

    // creating or getting a chat channel and add members
    const channel = serverClient.channel(
      "messaging",
      projectId || "project-id",
      {
        name: projectTitle || "Project Title",
        members: [...memberIds],
        // members: [...membersArray], // uncomment and replace to all only projects members
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
