// import { Schema, model, models } from "mongoose";

// export interface MeetDBTypes {
//   project: Schema.Types.ObjectId; // Reference to the associated project
//   project_title: string;
//   members: Schema.Types.ObjectId[]; // Array of User IDs can be involved in the meeting
//   meetings: {
//     _id: Schema.Types.ObjectId;
//     title: string;
//     link: string;
//     date: Date;
//     time: string;
//     status: string;
//   }[];
// }

// const meetSchema = new Schema<MeetDBTypes>(
//   {
//     project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
//     project_title: { type: String, required: true },
//     members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
//     meetings: [
//       {
//         _id: { type: Schema.Types.ObjectId, required: true },
//         title: { type: String, required: true },
//         link: { type: String, required: true },
//         date: { type: Date, required: true },
//         time: { type: String, required: true },
//         status: {
//           type: String,
//           required: true,
//           enum: ["upcoming", "active", "past", "cancelled"],
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Meet = models && (models.Meet || model<MeetDBTypes>("Meet", meetSchema));

// export default Meet;


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