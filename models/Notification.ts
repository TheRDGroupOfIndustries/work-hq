import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface NotificationDBTypes {
  time: Date; // Time of the notification
  title: string; // Title of the notification
  description: string; // Description of the notification
  type: "success" | "default" | "error"; // Type of the notification
  icon?: string; // Optional icon URL for the notification
  userID: Schema.Types.ObjectId; // User ID to whom the notification belongs
}

// Define the schema
const notificationSchema = new Schema<NotificationDBTypes>(
  {
    time: { type: Date, required: true, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["success", "default", "error"],
    },
    icon: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Export the model
const Notification =
  models.Notification || model<NotificationDBTypes>("Notification", notificationSchema);
export default Notification;
