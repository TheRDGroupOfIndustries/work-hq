import { Schema, model, models } from "mongoose";

export interface MeetingDBTypes {
  title: string;
  link?: string;
  createdBy: Schema.Types.ObjectId;
  projectID: Schema.Types.ObjectId;
  meetingDescription?: string;
  attendees?: Schema.Types.ObjectId[];
  date: Date;
  startTime: Date;
  endTime: Date;
  status: "requested" | "upcoming" | "cancelled" | "completed" | "inProgress";
  isInstant: boolean;
  streamCallId?: string;
  streamSessionId?: string;
  streamToken?: string;
  recordingEnabled?: boolean;
  recordingUrl?: string;
  meetingType?: "video" | "audio";
  joinedParticipants?: Schema.Types.ObjectId[];
}

const meetingSchema = new Schema<MeetingDBTypes>(
  {
    title: { type: String, required: true },
    link: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    meetingDescription: { type: String },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    date: { type: Date },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["upcoming", "requested", "cancelled", "completed", "inProgress"],
    },
    isInstant: { type: Boolean, required: true },
    streamCallId: { type: String },
    streamSessionId: { type: String },
    streamToken: { type: String },
    recordingEnabled: { type: Boolean, default: false },
    recordingUrl: { type: String },
    meetingType: { type: String, enum: ["video", "audio"], default: "video" },
    joinedParticipants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Meeting =
  models?.Meeting || model<MeetingDBTypes>("Meeting", meetingSchema);

export default Meeting;