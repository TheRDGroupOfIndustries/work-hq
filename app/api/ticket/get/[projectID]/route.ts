import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const GET = async (request: NextRequest, { params }: { params: { projectID: string } }) => {
  const { projectID } = params;

  if (!projectID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Project ID is required.",
    });
  }

  await connectToMongoDB();

  try {
    const tickets = await Ticket.find({ projectID }).populate("userID channelID");

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
