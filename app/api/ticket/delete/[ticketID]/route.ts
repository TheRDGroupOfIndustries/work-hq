import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const DELETE = async (request: NextRequest, { params }: { params: { ticketID: string } }) => {
  const { ticketID } = params;

  if (!ticketID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Ticket ID is required.",
    });
  }

  await connectToMongoDB();

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(ticketID);

    if (!deletedTicket) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Ticket not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Ticket deleted successfully!",
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
