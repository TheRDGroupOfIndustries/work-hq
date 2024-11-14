import { Schema, model, models } from "mongoose";

export interface ProjectDBTypes {
  title: string;
  description: string;
  client: Schema.Types.ObjectId;          // Reference to the client who owns the project
  manager: Schema.Types.ObjectId;         // Project manager
  assigned_team: Schema.Types.ObjectId[]; // Array of User IDs for developers/managers
  vendor?: Schema.Types.ObjectId;         // Vendor handling the project, if applicable
  ceo?: Schema.Types.ObjectId;            // CEO overseeing the project
  start_date: Date;
  end_date?: Date;
  status: string;
  budget?: number;
  technologies: string[];                 // List of tech stacks used, e.g., ['React', 'Node.js']
  milestones: MilestoneTypes[];           // Array of milestones for the project
  files?: string[];                       // URLs or IDs of associated project files
  progress: number;                       // Percentage of project completion
  notes?: string[];                       // Any additional notes or updates
}

interface MilestoneTypes {
  title: string;
  due_date: Date;
  completed: boolean;
}

const projectSchema = new Schema<ProjectDBTypes>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    manager: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assigned_team: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
    vendor: { type: Schema.Types.ObjectId, ref: "User", required: false },
    ceo: { type: Schema.Types.ObjectId, ref: "User", required: false },

    start_date: { type: Date, required: true },
    end_date: { type: Date, required: false },
    status: {
      type: String,
      required: true,
      enum: ["planned", "in_progress", "completed", "on_hold", "cancelled"],
      default: "planned",
    },
    budget: { type: Number, required: false },
    technologies: [{ type: String, required: true }], 
    milestones: [
      {
        title: { type: String, required: true },
        due_date: { type: Date, required: true },
        completed: { type: Boolean, required: true, default: false },
      },
    ],
    files: [{ type: String, required: false }],              // URL or ID reference
    progress: { type: Number, required: true, default: 0 },  // Track as a percentage
    notes: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const Project = models && (models.Project || model<ProjectDBTypes>("Project", projectSchema));

export default Project;
