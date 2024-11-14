import { Schema, model, models } from "mongoose";

export interface UserDBTypes {
  first_name: string;
  last_name: string;
  profile_image: string;
  email?: string;
  phone_number?: string;
  password?: string;
  role: string;
  auth_integrated: string[];

  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;

  company_name?: string;              // For client and vendor organizations
  organization_details?: string;      // Additional org. information for clients/vendors
  position?: string;                  // Position in company, relevant for manager and CEO
  projects?: Schema.Types.ObjectId[]; // Assigned projects for developer, manager, etc.
  department?: string;                // For team grouping, e.g., developers, managers
  website?: string;                   // Optional, useful for vendor or clients
  address?: string;                   // Contact address, useful for vendors or clients
  preferred_communication?: string[]; // Preferred contact method, e.g., email, phone, etc.
}

const userSchema = new Schema<UserDBTypes>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_image: {
      type: String,
      required: true,
      default: "/assets/user.png",
    },
    email: {
      type: String,
      required: false,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone_number: { type: String, required: false },
    password: { type: String, required: false },
    role: {
      type: String,
      required: true,
      enum: ["client", "vendor", "admin", "developer", "manager", "ceo"],
      default: "client",
    },
    auth_integrated: {
      type: [
        {
          type: String,
          enum: [
            "email-password",
            "phone-password",
            "google",
            "github",
            "linkedin",
          ],
        },
      ],
      required: true,
      default: ["email-password"],
    },

    // Password reset fields
    resetPasswordToken: { type: String, trim: true, required: false },
    resetPasswordTokenExpiry: { type: Date, required: false },

    // Role-specific fields
    department: { type: String, required: false },              // Department info for managers/developers
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],// Linked projects for roles

    company_name: { type: String, required: false },            // Client/vendor company
    organization_details: { type: String, required: false },    // Additional org. information for clients/vendors
    position: { type: String, required: false },                // Manager/CEO position title
    website: { type: String, required: false },                 // Vendor/Client website URL

    address: { type: String, required: false },                 // Contact address - it can be a physical address or a google map link

    preferred_communication: {
      type: [
        {
          type: String,
          enum: ["email", "phone", "meet"],
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

const User = models && (models.User || model<UserDBTypes>("User", userSchema));

export default User;
