import { Schema, model, models } from "mongoose";

export interface ProjectTaskDBTypes {
  title: string;
  description: string;
  manager: Schema.Types.ObjectId; // Project Manager Reference
  project: Schema.Types.ObjectId; // Project Reference
  start_date: Date;
  end_date?: Date;
  status: string;
  files?: string[]; // URLs or IDs of associated project files
}

const projectTaskSchema = new Schema<ProjectTaskDBTypes>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed", "on_hold", "cancelled"],
      default: "pending",
    },
    files: [{ type: String, required: false }], // URL or ID reference
  },
  { timestamps: true }
);

const ProjectTask =
  models &&
  (models.ProjectTask ||
    model<ProjectTaskDBTypes>("ProjectTask", projectTaskSchema));

export default ProjectTask;
