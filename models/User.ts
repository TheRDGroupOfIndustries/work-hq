import { Schema, model, models } from "mongoose";

export interface UserDBTypes {
  username?: string; // Uniquely generated
  firstName: string;
  lastName?: string;
  profileImage?: string;
  authIntegrated?: string[]; // Auth providers integrated
  email: string;
  phone: string;
  loginStep?: [0, 1, 3]; // 0: Registration using phone or email, 1: userName, password & additonal info , 3: Create first project
  role: "client" | "vendorClient" | "developer" | "vendor" | "manager" | "ceo"; // Role enum
  password?: string;

  // Fields common to some roles
  clients?: Schema.Types.ObjectId[]; // Applicable for vendors managing clients
  vendorID?: Schema.Types.ObjectId; // Vendor reference for vendor_clients
  allProjects?: Schema.Types.ObjectId[]; // Populated based on Projects schema (linked)

  // Developer-specific fields
  workStatus?: "loggedIn" | "loggedOut" | "onBreak";
  workingHoursRanges?: { startTime: string; endTime: string }[]; // Working hours array
  joiningDate?: Date;
  position?: string[]; // Developer positions
  myProjects?: Schema.Types.ObjectId[]; // Reference to projects
  totalSpendHours?: { date: Date; totalHours: number; loggedInTime: number }[];
  performance?: number; // Calculated dynamically

  // Vendor-specific fields
  vendorBasedProjects?: Schema.Types.ObjectId[]; // Fetched from Projects schema

  // Fields for managers and CEOs (minimal role-specific fields)
  // No additional fields for these roles at the moment
}

const userSchema = new Schema<UserDBTypes>(
  {
    username: { type: String, required: false},
    profileImage: { type: String, required: false },
    authIntegrated : [{ type: String, required: false }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: false},
    email: { type: String, required: false },
    phone: { type: String, required: false },
    loginStep: { type: Number, enum: [0, 1, 3],default: 0 },
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
    workStatus: { type: String, enum: ["loggedIn", "loggedOut", "onBreak"] },
    workingHoursRanges: [{ startTime: String, endTime: String }],
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
    performance: { type: Number },

    // Vendor-based project references
    vendorBasedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

// Ensure the model doesn't overwrite existing models in a development environment
const User =
  models && (models.User || model<UserDBTypes>("User", userSchema));

export default User;