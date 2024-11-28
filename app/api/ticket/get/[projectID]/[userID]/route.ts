import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const GET = async (request: NextRequest, { params }: { params: { projectID: string; userID: string } }) => {
  const { projectID, userID } = params;

  if (!projectID || !userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Project ID and User ID are required.",
    });
  }

  await connectToMongoDB();

  try {
    const tickets = await Ticket.find({ projectID, userID }).populate("channelID");

    return NextResponse.json({
      status: 200,
      success: true,
      tickets,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong.",
    });
  }
};
