import { Schema, model, models } from "mongoose";

export interface ProjectDBTypes {
  title: string;
  description: string;
  client: Schema.Types.ObjectId;          // Reference to the client who owns the project
  manager: Schema.Types.ObjectId;         // Project manager
  assigned_team: Schema.Types.ObjectId[]; // Array of User IDs for developers/managers
  vendor?: Schema.Types.ObjectId;         // Vendor handling the project, if applicable
  start_date: Date;
  end_date?: Date;
  status: string;
  technologies: string[];                 // List of tech stacks used, e.g., ['React', 'Node.js']
  milestones: MilestoneTypes[];           // Array of milestones for the project
  files?: string[];                       // URLs or IDs of associated project files
  progress: number;                       // Percentage of project completion
  notes?: string[];                       // Any additional notes or updates
  figma_link?: string;
  figma_iframe_link?: string;
  github_link?: string;
  deployed_link?: string;
}

interface MilestoneTypes {
  budget?: number;
  title: string;
  due_date: Date;
  completed: boolean;
}

const projectSchema = new Schema<ProjectDBTypes>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: false },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assigned_team: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],

    start_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed", "on_hold", "cancelled"],
      default: "pending",
    },
    technologies: [{ type: String, required: true }], 
    milestones: [
      {
        title: { type: String, required: true },
        due_date: { type: Date, required: true },
        completed: { type: Boolean, required: true, default: false },
        budget: { type: Number, required: false },
        priority: {
          type: String,
          required: false,
          enum: ["low", "medium", "high"],
        },
      },
    ],
    files: [{ type: String, required: false }],              // URL or ID reference
    figma_link: { type: String, required: false },
    figma_iframe_link: { type: String, required: false },
    github_link: { type: String, required: false },
    deployed_link: { type: String, required: false },
    progress: { type: Number, required: true, default: 0 },  // Track as a percentage     X
    notes: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const Project = models && (models.Project || model<ProjectDBTypes>("Project", projectSchema));

export default Project;
