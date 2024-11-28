import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Ticket from "@/models/Ticket";

export const POST = async (request: NextRequest, { params }: { params: { projectID: string } }) => {
  const { projectID } = params;
  const { ticketNo, subject, issueType, priority, ticketDate, issueMessage, status, userID, channelID } = await request.json();

  if (!projectID || !ticketNo || !subject || !issueType || !priority || !ticketDate || !issueMessage || !status || !userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Required fields are missing.",
    });
  }

  await connectToMongoDB();

  try {
    const ticket = new Ticket({
      projectID,
      ticketNo,
      subject,
      issueType,
      priority,
      ticketDate,
      issueMessage,
      status,
      userID,
      channelID,
    });

    const savedTicket = await ticket.save();

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Ticket created successfully!",
      ticket: savedTicket,
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
