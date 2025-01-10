import { Schema, model, models } from "mongoose";

export interface UserDBTypes {
  username?: string;
  firstName: string;
  lastName?: string;
  wakaTime?: {
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_at: Date;
  };
  profileImage?: string;
  authIntegrated?: string[];
  email: string;
  phone: string;
  loginStep?: number;
  role: "client" | "vendorClient" | "developer" | "vendor" | "manager" | "ceo"; // Role enum
  password?: string;

  // Fields common to some roles
  clients?: Schema.Types.ObjectId[]; // Applicable for vendors managing clients
  vendorID?: Schema.Types.ObjectId; // Vendor reference for vendor_clients
  allProjects?: Schema.Types.ObjectId[]; // Populated based on Projects schema (linked)

  // Developer-specific fields
  workStatus?: "loggedIn" | "loggedOut" | "onBreak";
  workingHoursRanges?: {
    date: Date;
    timeRange: { startTime: string; endTime: string }[];
  }[]; // Working hours array
  joiningDate?: Date;
  position?: string[]; // Developer positions
  myProjects?: Schema.Types.ObjectId[]; // Reference to projects
  tasks: Schema.Types.ObjectId[]; // Developer tasks
  totalSpendHours?: { date: Date; totalHours: number; loggedInTime: number }[];
  performance?: { month: number; year: number; performance: number };
  managerID?: Schema.Types.ObjectId; // Populated based on Projects schema (linked)

  // Vendor-specific fields
  vendorBasedProjects?: Schema.Types.ObjectId[]; // Fetched from Projects schema
}

const userSchema = new Schema<UserDBTypes>(
  {
    wakaTime: {
      user_id: { type: String, required: false },
      access_token: { type: String, required: false },
      refresh_token: { type: String, required: false },
      expires_at: { type: Date, required: false },
    },
    username: { type: String, required: false },
    profileImage: { type: String, required: false },
    authIntegrated: [{ type: String, required: false }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    loginStep: { type: Number, enum: [0, 1, 3], default: 0 },
    role: {
      type: String,
      required: true,
      enum: ["client", "vendorClient", "developer", "vendor", "manager", "ceo"],
      default: "client",
    },
    password: { type: String, required: false },

    // Vendor fields
    clients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    vendorID: { type: Schema.Types.ObjectId, ref: "User" },
    allProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

    // Developer fields
    workStatus: {
      type: String,
      enum: ["loggedIn", "loggedOut", "onBreak"],
      default: "loggedOut",
    },
    workingHoursRanges: [
      {
        date: { type: Date },
        timeRange: [{ startTime: String, endTime: String }],
      },
    ],
    joiningDate: { type: Date },
    position: [{ type: String }],
    myProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    totalSpendHours: [
      {
        date: { type: Date },
        totalHours: { type: Number },
        loggedInTime: { type: Number },
      },
    ],
    performance: {
      month: { type: Number },
      year: { type: Number },
      performance: { type: Number },
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task", required: false }],
    managerID: { type: Schema.Types.ObjectId, ref: "User" },

    // Vendor-based project references
    vendorBasedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

// Ensure the model doesn't overwrite existing models in a development environment
const User = models && (models.User || model<UserDBTypes>("User", userSchema));

export default User;
