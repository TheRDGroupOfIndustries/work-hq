import { Schema, model, models } from "mongoose";

export interface ChannelDBTypes {
  channelID: string;
  members: Schema.Types.ObjectId[];
  projectIDs: Schema.Types.ObjectId[];
  roleBased: string[];
  createdAt: Date;
  channelName: string;
  channelIcon?: string;
}

const channelSchema = new Schema<ChannelDBTypes>(
  {
    channelID: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    projectIDs: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    roleBased: [{ type: String, required: true }],
    createdAt: { type: Date, required: true, default: Date.now },
    channelName: { type: String, required: true },
    channelIcon: { type: String },
  },
  { timestamps: true }
);

const Channel = models.Channel || model<ChannelDBTypes>("Channel", channelSchema);
export default Channel;