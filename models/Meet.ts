import { Schema, model, models } from "mongoose";

export interface MeetDBTypes {
  project: Schema.Types.ObjectId; // Reference to the associated project
  project_title: string;
  members: Schema.Types.ObjectId[]; // Array of User IDs can be involved in the meeting
  meetings: {
    _id: Schema.Types.ObjectId;
    title: string;
    link: string;
    date: Date;
    time: string;
    status: string;
  }[];
}

const meetSchema = new Schema<MeetDBTypes>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    project_title: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    meetings: [
      {
        _id: { type: Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        link: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        status: {
          type: String,
          required: true,
          enum: ["upcoming", "active", "past", "cancelled"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Meet = models && (models.Meet || model<MeetDBTypes>("Meet", meetSchema));

export default Meet;
