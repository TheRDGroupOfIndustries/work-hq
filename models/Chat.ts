// import { Schema, model, models } from "mongoose";

// export interface ChatDBTypes {
//   project: Schema.Types.ObjectId; // Reference to the associated project
//   project_title: string;
//   members?: Schema.Types.ObjectId[]; // Array of User IDs involved in the chat
// }

// const chatSchema = new Schema<ChatDBTypes>(
//   {
//     project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
//     project_title: { type: String, required: false },
//     members: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
//   },
//   { timestamps: true }
// );

// const Chat = models && (models.Chat || model<ChatDBTypes>("Chat", chatSchema));

// export default Chat;


import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface ChatDBTypes {
  chatID: Schema.Types.ObjectId; // Unique ID for the chat
  from: {
    userID: Schema.Types.ObjectId; // User ID of the sender
    role: string; // Role of the sender
    userName: string; // Name of the sender
  };
  to?: {
    userID?: Schema.Types.ObjectId; // Optional receiver's user ID
    role?: string; // Optional receiver's role
    userName?: string; // Optional receiver's name
  }; // Can be null for group chats
  createdAt: Date; // Date the message was created
  status: "undelivered" | "sent" | "read" | "deleted" | "edited"; // Status of the chat
  message: string; // Message content
  channelID: Schema.Types.ObjectId; // ID of the chat channel
  attachments: string[]; // List of attachment URLs
}

// Define the schema
const chatSchema = new Schema<ChatDBTypes>(
  {
    chatID: { type: Schema.Types.ObjectId, required: true },
    from: {
      userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
      role: { type: String, required: true },
      userName: { type: String, required: true },
    },
    to: {
      userID: { type: Schema.Types.ObjectId, ref: "User" },
      role: { type: String },
      userName: { type: String },
    },
    createdAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      required: true,
      enum: ["undelivered", "sent", "read", "deleted", "edited"],
    },
    message: { type: String, required: true },
    channelID: { type: Schema.Types.ObjectId, ref: "Channel", required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

// Export the model
const Chat = models.Chat || model<ChatDBTypes>("Chat", chatSchema);
export default Chat;