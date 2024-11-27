import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface ChannelDBTypes {
  channelID: Schema.Types.ObjectId; // Unique ID for the channel
  members: Schema.Types.ObjectId[]; // List of user IDs who are members of the channel
  projectIDs: Schema.Types.ObjectId[]; // List of project IDs associated with the channel
  roleBased: string[]; // List of role names that have access to the channel
  createdAt: Date; // Date the channel was created
  channelName: string; // Name of the channel
  channelIcon?: string; // Optional URL for the channel icon
}

// Define the schema
const channelSchema = new Schema<ChannelDBTypes>(
  {
    channelID: { type: Schema.Types.ObjectId, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    projectIDs: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    roleBased: [{ type: String, required: true }],
    createdAt: { type: Date, required: true, default: Date.now },
    channelName: { type: String, required: true },
    channelIcon: { type: String },
  },
  { timestamps: true }
);

// Export the model
const Channel =
  models.Channel || model<ChannelDBTypes>("Channel", channelSchema);
export default Channel;
