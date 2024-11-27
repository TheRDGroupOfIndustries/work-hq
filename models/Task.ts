// import { Schema, model, models } from "mongoose";

// export interface ProjectTaskDBTypes {
//     title: string;
//     projectId: Schema.Types.ObjectId;
//     status: string;
//     assigned_to: Schema.Types.ObjectId;
// }

// const projectTaskSchema = new Schema<ProjectTaskDBTypes>(
//   {
//     title: { type: String, required: true },
//     // description: { type: String, required: true },
//     // manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
//     // start_date: { type: Date, required: true },
//     // end_date: { type: Date, required: false },
//     status: {
//       type: String,
//       required: true,
//       enum: ["pending", "in_progress", "completed", "on_hold", "cancelled"],
//       default: "pending",
//     },
//     assigned_to: { type: Schema.Types.ObjectId, ref: "User", required: false},
//     // files: [{ type: String, required: false }], // URL or ID reference
//   },
//   { timestamps: true }
// );

// const ProjectTask =
//   models &&
//   (models.ProjectTask ||
//     model<ProjectTaskDBTypes>("ProjectTask", projectTaskSchema));

// export default ProjectTask;


import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface TaskDBTypes {
  taskNo: number; // Auto-incremented task number (backend-managed)
  issueSubject: string; // Subject or description of the task
  estimatedTime: number; // Estimated time in minutes
  assignedTo: Schema.Types.ObjectId; // Reference to developer (User ID)
  status: "Completed" | "pending" | "inProgress" | "refactoring"; // Task status
  createdAt: Date; // Creation date of the task
  workingSince?: Date; // Start time of active work
  totalHoursSpend?: number; // Total calculated hours excluding breaks or logged-off time
  createdBy: Schema.Types.ObjectId; // Reference to the creator (User ID)
}

// Define the schema
const taskSchema = new Schema<TaskDBTypes>(
  {
    taskNo: { type: Number, required: true }, // Auto-incremented by backend
    issueSubject: { type: String, required: true },
    estimatedTime: { type: Number, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      required: true,
      enum: ["Completed", "pending", "inProgress", "refactoring"],
    },
    createdAt: { type: Date, required: true, default: Date.now },
    workingSince: { type: Date }, // Optional, only recorded when task is in progress
    totalHoursSpend: { type: Number }, // Calculated hours (optional field)
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

// Export the model
const Task =
  models && (models.Task || model<TaskDBTypes>("Task", taskSchema));

export default Task;