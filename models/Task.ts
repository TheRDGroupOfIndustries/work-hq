import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface TaskDBTypes {
  projectID: Schema.Types.ObjectId; // Reference to the project (Project ID)
  createdBy: Schema.Types.ObjectId; // Reference to the creator (User ID)
  taskNo: number; // Auto-incremented task number (backend-managed)
  issueSubject: string; // Subject or description of the task
  estimatedTime?: number; // Estimated time in minutes
  assignedTo?: Schema.Types.ObjectId; // Reference to developer (User ID)
  status: "completed" | "pending" | "inProgress" | "refactoring" | string; // Task status
  workingSince?: Date; // Start time of active work
  totalHoursSpend?: number; // Total calculated hours excluding breaks or logged-off time
}

// Define the schema
const taskSchema = new Schema<TaskDBTypes>(
  {
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskNo: { type: Number, required: true }, // Auto-incremented by backend
    issueSubject: { type: String, required: true },
    estimatedTime: { type: Number, required: false },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: false },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending", "inProgress", "refactoring"],
    },
    workingSince: { type: Date }, // Optional, only recorded when task is in progress
    totalHoursSpend: { type: Number }, // Calculated hours (optional field)
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

const Task = models && (models.Task || model<TaskDBTypes>("Task", taskSchema));

export default Task;
