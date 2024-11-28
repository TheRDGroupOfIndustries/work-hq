// import { Schema, model, models } from "mongoose";

// export interface ProjectDBTypes extends Document {
//   title: string;
//   description: string;
//   logo?: string;
//   start_date?: Date;
//   end_date?: Date;
//   status: string;
//   technologies?: string[]; // List of tech stacks used, e.g., ['React', 'Node.js']
//   milestones?: MilestoneTypes[]; // Array of milestones for the project
//   files?: string[]; // files URL reference
//   project_ref?: string[]; // project reference
//   notes?: string[]; // Any additional notes or updates
//   client?: Schema.Types.ObjectId; // Reference to the client who owns the project
//   vendor?: Schema.Types.ObjectId; // Vendor handling the project, if applicable
//   manager?: Schema.Types.ObjectId; // Project manager
//   assigned_team?: Schema.Types.ObjectId[]; // Array of User IDs for developers/managers
//   figma_link?: string;
//   figma_iframe_link?: string;
//   github_link?: string;
//   deployed_link?: string;
//   progress: number; // Percentage of project completion
// }

// interface MilestoneTypes {
//   title: string;
//   due_date: Date;
//   budget?: number;
//   completed?: boolean;
// }

// const projectSchema = new Schema<ProjectDBTypes>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     logo: { type: String, required: false },

//     start_date: { type: Date, required: true },
//     end_date: { type: Date, required: false },
//     status: {
//       type: String,
//       required: true,
//       enum: ["pending", "in_progress", "completed", "on_hold", "cancelled"],
//       default: "pending",
//     },
//     technologies: [{ type: String, required: false }],
//     milestones: [
//       {
//         title: { type: String, required: true },
//         due_date: { type: Date, required: false },
//         budget: { type: Number, required: false },
//         completed: { type: Boolean, required: false, default: false },
//       },
//     ],
//     files: [{ type: String, required: false }], // files URL reference
//     project_ref: [{ type: String, required: false }], // project reference
//     notes: [{ type: String, required: false }],
//     client: { type: Schema.Types.ObjectId, ref: "User", required: false },
//     vendor: { type: Schema.Types.ObjectId, ref: "User", required: false },
//     manager: { type: Schema.Types.ObjectId, ref: "User", required: false },
//     assigned_team: [
//       { type: Schema.Types.ObjectId, ref: "User", required: false },
//     ],
//     figma_link: { type: String, required: false },
//     figma_iframe_link: { type: String, required: false },
//     github_link: { type: String, required: false },
//     deployed_link: { type: String, required: false },
//     progress: { type: Number, required: true, default: 0 }, // Track as a percentage     X
//   },
//   { timestamps: true }
// );

// const Project =
//   models.Project || model<ProjectDBTypes>("Project", projectSchema);

// export default Project;


import { Schema, model, models } from "mongoose";

// Define the TypeScript interface for the Projects Schema
export interface ProjectDBTypes {
  projectID: string;
  projectDetails: {
    projectName: string;
    category: string;
    deadline: Date;
    additionalFiles?: string[];
    maintenanceNeeded: boolean;
    description: string;
    scope: string;
    budget: { min: number; max: number };
    hasVendor: boolean;
    vendorID?: Schema.Types.ObjectId; // Ref to Users schema if hasVendor is true
  };
  companyDetails: {
    clientID: Schema.Types.ObjectId; // Ref to Users schema
    officialName: string;
    logo?: string; // Optional
    about: string;
    workingLocations: string[];
    contactNo: string[];
    address: string;
    companyLink?: string;
    size: string; // e.g., "100-200"
  };
  developmentDetails: {
    deploymentLink?: string;
    figmaLink?: string;
    projectHours?: number; // Derived from developers' hours
    teams: Schema.Types.ObjectId[]; // Array of User IDs
    tasks: Schema.Types.ObjectId[]; // Ref to Tasks schema
  };
}

// Define the Mongoose schema
const projectSchema = new Schema<ProjectDBTypes>(
  {
    projectID: { type: String, required: true },
    projectDetails: {
      projectName: { type: String, required: true },
      category: { type: String, required: true },
      deadline: { type: Date, required: true },
      additionalFiles: [{ type: String, required: false }],
      maintenanceNeeded: { type: Boolean, required: true },
      description: { type: String, required: true },
      scope: { type: String, required: true },
      budget: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      },
      hasVendor: { type: Boolean, required: true },
      vendorID: { type: Schema.Types.ObjectId, ref: "User", required: false },
    },
    companyDetails: {
      clientID: { type: Schema.Types.ObjectId, ref: "User", required: true },
      officialName: { type: String, required: true },
      logo: { type: String, required: false },
      about: { type: String, required: true },
      workingLocations: [{ type: String, required: true }],
      contactNo: [{ type: String, required: true }],
      address: { type: String, required: true },
      companyLink: { type: String, required: false },
      size: { type: String, required: true },
    },
    developmentDetails: {
      deploymentLink: { type: String, required: false },
      figmaLink: { type: String, required: false },
      projectHours: { type: Number, required: false }, // Derived field
      teams: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      tasks: [{ type: Schema.Types.ObjectId, ref: "Task", required: true }],
    },
  },
  { timestamps: true }
);

// Model definition
const Project =
  models && (models.Project || model<ProjectDBTypes>("Project", projectSchema));

export default Project;