import { Schema, model, models } from "mongoose";

export interface ChatDBTypes {
  project: Schema.Types.ObjectId;         // Reference to the associated project
  participants: Schema.Types.ObjectId[];  // Array of User IDs involved in the chat
  messages: MessageTypes[];               // Array of messages in the chat
  last_updated: Date;                     // Timestamp of the last message
  meeting_link?: string;                  // URL for video/audio meeting (if applicable)
  meeting_scheduled?: Date;               // Scheduled meeting date/time (if applicable)
}

interface MessageTypes {
  sender: Schema.Types.ObjectId;          // ID of the user who sent the message
  content: string;                        // Text content of the message
  timestamp: Date;                        // When the message was sent
  message_type: string;                   // Text, file, image, etc.
  file_url?: string;                      // URL of any file or image (if message_type is file/image)
}

const chatSchema = new Schema<ChatDBTypes>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, required: true, default: Date.now },
        message_type: {
          type: String,
          required: true,
          enum: ["text", "file", "image"],
          default: "text",
        },
        file_url: { type: String, required: false },    // For file or image messages
      },
    ],
    last_updated: { type: Date, required: true, default: Date.now },
    meeting_link: { type: String, required: false },    // Optional link for a live meeting
    meeting_scheduled: { type: Date, required: false }, // Scheduled meeting date/time
  },
  { timestamps: true }
);

const Chat = models && (models.Chat || model<ChatDBTypes>("Chat", chatSchema));

export default Chat;
