import Ticket from "@/models/Ticket";
import connectToMongoDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { projectID: string } }
) => {
  const { projectID } = params;
  const {
    ticketNo,
    subject,
    issueType,
    priority,
    // ticketDate, mongoDB will auto generate
    issueMessage,
    // status, 
    userID,
    channelID,
  } = await request.json();

  const requiredFields = [
    projectID,
    ticketNo,
    subject,
    issueType,
    priority,
    issueMessage,
    userID,
    channelID,
  ];

  const missingFields = requiredFields.filter((field) => !field);

  if (missingFields.length > 0) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  await connectToMongoDB();

  try {
    const ticket = new Ticket({
      projectID,
      ticketNo : ticketNo || String(Date.now()), // This is for temp..
      subject,
      issueType,
      priority,
      ticketDate : new Date(),
      issueMessage,
      userID,
    });

    const savedTicket = await ticket.save();

    console.log("Ticket created:", savedTicket);

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
