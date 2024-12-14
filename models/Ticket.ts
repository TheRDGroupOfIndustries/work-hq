import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface TicketDBTypes {
  ticketNo: string; // Unique ticket number
  subject: string; // Subject of the ticket
  issueType: string; // Type of issue
  priority: "Low" | "Medium" | "High"; // Priority level
  ticketDate: Date; // Date the ticket was created
  issueMessage: string; // Description of the issue
  status: "open" | "close"; // Current status of the ticket
  channelID?: Schema.Types.ObjectId; // Optional reference to chat channel ID
  userID: Schema.Types.ObjectId; // Reference to the user who created the ticket
  projectID: Schema.Types.ObjectId; // Reference to the project the ticket belongs to
}

// Define the schema
const ticketSchema = new Schema<TicketDBTypes>(
  {
    projectID: { type: Schema.Types.ObjectId, ref: "Project" },
    ticketNo: { type: String, required: true },
    subject: { type: String, required: true },
    issueType: { type: String, required: true },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    ticketDate: { type: Date, required: true },
    issueMessage: { type: String, required: true },
    status: {
      type: String,
      default: "open",
      enum: ["open", "close"],
    },
    channelID: { type: Schema.Types.ObjectId, ref: "ChatChannel" }, // Optional field
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Export the model
const Ticket =
  models && (models.Ticket || model<TicketDBTypes>("Ticket", ticketSchema));

export default Ticket;