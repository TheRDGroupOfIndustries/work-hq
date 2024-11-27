// import { Schema, model, models } from "mongoose";

// export interface UserDBTypes extends Document {
//   first_name: string;
//   last_name: string;
//   profile_image: string;
//   email?: string;
//   phone_number?: string;
//   password?: string;
//   role: string;
//   auth_integrated: string[];
  
//   projects?: { _id: Schema.Types.ObjectId, title: string }[]; // Assigned projects for developer, manager, etc.

//   resetPasswordToken?: string;
//   resetPasswordTokenExpiry?: Date;

//   company_name?: string;              // For client and vendor organizations
//   organization_details?: string;      // Additional org. information for clients/vendors
//   position?: string;                  // Position in company, relevant for manager and CEO
//   department?: string;                // For team grouping, e.g., developers, managers
//   website?: string;                   // Optional, useful for vendor or clients
//   address?: string;                   // Contact address, useful for vendors or clients
//   preferred_communication?: string[]; // Preferred contact method, e.g., email, phone, etc.
// }

// const userSchema = new Schema<UserDBTypes>(
//   {
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     profile_image: {
//       type: String,
//       required: true,
//       default: "/assets/user.png",
//     },
//     email: {
//       type: String,
//       required: false,
//       trim: true,
//       match: [/.+\@.+\..+/, "Please fill a valid email address"],
//     },
//     phone_number: { type: String, required: false },
//     password: { type: String, required: false },
//     role: {
//       type: String,
//       required: true,
//       enum: ["client", "vendor", "admin", "developer", "manager", "ceo"],
//       default: "client",
//     },
//     auth_integrated: {
//       type: [
//         {
//           type: String,
//           enum: [
//             "email-password",
//             "phone-password",
//             "google",
//             "github",
//             "linkedin",
//           ],
//         },
//       ],
//       required: true,
//       default: ["email-password"],
//     },

//     projects: [{
//       _id: { type: Schema.Types.ObjectId, ref: "Project" },
//       title: { type: String, required: false },
//     },],                                                        // Linked projects for roles

//     // Password reset fields
//     resetPasswordToken: { type: String, trim: true, required: false },
//     resetPasswordTokenExpiry: { type: Date, required: false },

//     // Role-specific fields
//     department: { type: String, required: false },              // Department info for managers/developers

//     company_name: { type: String, required: false },            // Client/vendor company
//     organization_details: { type: String, required: false },    // Additional org. information for clients/vendors
//     position: { type: String, required: false },                // Manager/CEO position title
//     website: { type: String, required: false },                 // Vendor/Client website URL

//     address: { type: String, required: false },                 // Contact address - it can be a physical address or a google map link

//     preferred_communication: {
//       type: [
//         {
//           type: String,
//           enum: ["email", "phone", "meet"],
//         },
//       ],
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// const User = models && (models.User || model<UserDBTypes>("User", userSchema));

// export default User;


import { Schema, model, models } from "mongoose";

export interface UserDBTypes {
  username: string; // Uniquely generated
  email: string;
  phone: string;
  role: "client" | "vendorClient" | "developer" | "vendor" | "manager" | "ceo"; // Role enum
  password: string;

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
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["client", "vendorClient", "developer", "vendor", "manager", "ceo"],
    },
    password: { type: String, required: true },

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