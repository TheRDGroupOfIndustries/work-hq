import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface MeetingDBTypes {
  title: string; // Title of the meeting
  link?: string; // Optional meeting link
  createdBy: Schema.Types.ObjectId; // Reference to the user who created the meeting
  projectID?: Schema.Types.ObjectId; // Optional reference to the associated project
  meetingDescription?: string; // Optional description of the meeting
  attendees: Schema.Types.ObjectId[]; // List of attendees (user IDs)
  date: Date; // Date of the meeting
  startTime?: Date; // Optional start time
  endTime?: Date; // Optional end time
  status: "upcoming" | "requested" | "overdue" | "completed" | "inProgress"; // Enum for meeting status
  isInstant: boolean; // Determines if the meeting is instant (automatic date/time)
}

// Define the schema
const meetingSchema = new Schema<MeetingDBTypes>(
  {
    title: { type: String, required: true },
    link: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectID: { type: Schema.Types.ObjectId, ref: "Project" },
    meetingDescription: { type: String },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "requested", "overdue", "completed", "inProgress"],
    },
    isInstant: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Export the model
const Meeting =
  models && (models.Meeting || model<MeetingDBTypes>("Meeting", meetingSchema));

export default Meeting;