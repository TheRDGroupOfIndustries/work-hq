import { Schema, model, models } from "mongoose";

export interface ChatDBTypes {
  project: Schema.Types.ObjectId; // Reference to the associated project
  project_title: string;
  members?: Schema.Types.ObjectId[]; // Array of User IDs involved in the chat
}

const chatSchema = new Schema<ChatDBTypes>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    project_title: { type: String, required: false },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
  },
  { timestamps: true }
);

const Chat = models && (models.Chat || model<ChatDBTypes>("Chat", chatSchema));

export default Chat;
