import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface TaskDBTypes {
  projectID: Schema.Types.ObjectId | string; // Reference to the project (Project ID)
  createdBy: Schema.Types.ObjectId | string; // Reference to the creator (User ID)
  taskNo: number; // Auto-incremented task number (backend-managed)
  issueSubject: string; // Subject or description of the task
  estimatedTime?: number; // Estimated time in minutes
  assignedTo?: {
    _id: Schema.Types.ObjectId | string;
    name: string;
    avatar: string;
  }; // Reference to developer (User ID)
  status: "completed" | "pending" | "inProgress" | "refactoring" | string; // Task status
  workingSince?: Date; // Start time of active work
  totalHoursSpend?: number; // Total calculated hours excluding breaks or logged-off time
  priority: "low" | "medium" | "high" | string; // Task priority
  dueDate: Date; // Task due date
}

// Define the schema
const taskSchema = new Schema<TaskDBTypes>(
  {
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskNo: { type: Number, required: true }, // Auto-incremented by backend
    issueSubject: { type: String, required: true },
    estimatedTime: { type: Number, required: false },
    assignedTo: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: false },
      name: { type: String, required: false },
      avatar: { type: String, required: false },
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending", "inProgress", "refactoring"],
    },
    workingSince: { type: Date }, // Optional, only recorded when task is in progress
    totalHoursSpend: { type: Number }, // Calculated hours (optional field)
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

// const Task = models && (models.Task || model<TaskDBTypes>("Task", taskSchema));
const Task = models.Task || model<TaskDBTypes>("Task", taskSchema);

export default Task;
