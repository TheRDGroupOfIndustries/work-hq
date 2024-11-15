import { Schema, model, models } from "mongoose";

export interface ProjectDBTypes extends Document {
  title: string;
  description: string;
  logo?: string;
  start_date?: Date;
  end_date?: Date;
  status: string;
  technologies?: string[]; // List of tech stacks used, e.g., ['React', 'Node.js']
  milestones?: MilestoneTypes[]; // Array of milestones for the project
  files?: string[]; // files URL reference
  project_ref?: string[]; // project reference
  notes?: string[]; // Any additional notes or updates
  client?: Schema.Types.ObjectId; // Reference to the client who owns the project
  vendor?: Schema.Types.ObjectId; // Vendor handling the project, if applicable
  manager?: Schema.Types.ObjectId; // Project manager
  assigned_team?: Schema.Types.ObjectId[]; // Array of User IDs for developers/managers
  figma_link?: string;
  figma_iframe_link?: string;
  github_link?: string;
  deployed_link?: string;
  progress: number; // Percentage of project completion
}

interface MilestoneTypes {
  title: string;
  due_date: Date;
  budget?: number;
  completed?: boolean;
}

const projectSchema = new Schema<ProjectDBTypes>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: false },

    start_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed", "on_hold", "cancelled"],
      default: "pending",
    },
    technologies: [{ type: String, required: false }],
    milestones: [
      {
        title: { type: String, required: true },
        due_date: { type: Date, required: false },
        budget: { type: Number, required: false },
        completed: { type: Boolean, required: false, default: false },
        // priority: {
        //   type: String,
        //   required: false,
        //   enum: ["low", "medium", "high"],
        // },
      },
    ],
    files: [{ type: String, required: false }], // files URL reference
    project_ref: [{ type: String, required: false }], // project reference
    notes: [{ type: String, required: false }],
    client: { type: Schema.Types.ObjectId, ref: "User", required: false },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: false },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: false },
    assigned_team: [
      { type: Schema.Types.ObjectId, ref: "User", required: false },
    ],
    figma_link: { type: String, required: false },
    figma_iframe_link: { type: String, required: false },
    github_link: { type: String, required: false },
    deployed_link: { type: String, required: false },
    progress: { type: Number, required: true, default: 0 }, // Track as a percentage     X
  },
  { timestamps: true }
);

const Project =
  models.Project || model<ProjectDBTypes>("Project", projectSchema);

export default Project;
