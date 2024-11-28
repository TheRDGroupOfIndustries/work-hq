import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const tickets = await Ticket.find().populate("projectID userID channelID");

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
