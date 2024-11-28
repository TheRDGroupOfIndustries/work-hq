import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const PATCH = async (request: NextRequest, { params }: { params: { ticketID: string } }) => {
  const { ticketID } = params;
  const updates = await request.json();

  if (!ticketID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Ticket ID is required.",
    });
  }

  await connectToMongoDB();

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketID, updates, { new: true }).populate("projectID userID channelID");

    if (!updatedTicket) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Ticket not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Ticket updated successfully!",
      ticket: updatedTicket,
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
