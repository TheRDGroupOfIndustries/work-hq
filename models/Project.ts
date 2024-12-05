import { Schema, model, models } from "mongoose";

export interface ProjectDBTypes {
  projectID: string;
  projectDetails: {
    projectName: string;
    category: string;
    deadline: Date;
    additionalFiles?: {
      url: string;
      title: string;
      description: string;
      date: Date;
      size: number;
    };
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
    contactNo: string;
    address: string;
    companyLink?: string;
    size: string; // e.g., "100-200"
  };
  developmentDetails: {
    status: "completed" | "inProgress" | "pending" | "refactoring";
    deployment?: {
        link: string;
        channelID: string;
    };
    figma?: {
      link: string;
      channelID: string;
    };
    projectHours?: {
      date: Date;
      totalHours: number;
    }[]; // Derived from developers' hours
    teams: Schema.Types.ObjectId[]; // Array of User IDs
    // tasks: Schema.Types.ObjectId[]; // Ref to Tasks schema
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
      additionalFiles: [
        {
          url: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          date: { type: Date, required: true },
          size: { type: Number, required: true },
        },
      ],
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
      contactNo: { type: String, required: true, minlength: 10, maxlength: 10 },
      address: { type: String, required: true },
      companyLink: { type: String, required: false },
      size: { type: String, required: true },
    },
    developmentDetails: {
      deploymentLink: { type: String, required: false },
      figmaLink: { type: String, required: false },
      projectHours: [
        {
          date: { type: Date, required: true },
          totalHours: { type: Number, required: true },
        },
      ],
      teams: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      // tasks: [{ type: Schema.Types.ObjectId, ref: "Task", required: true }],
    },
  },
  { timestamps: true }
);

// Model definition
const Project =
  models && (models.Project || model<ProjectDBTypes>("Project", projectSchema));

export default Project;
