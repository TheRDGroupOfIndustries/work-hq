import { User as NextAuthUser } from "next-auth";

export interface CustomUser extends NextAuthUser {
  _id: string;
  username?: string; // Uniquely generated
  firstName: string;
  lastName?: string;
  wakaTime?: {
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_at: Date;
  };
  profileImage?: string;
  authIntegrated?: string[]; // Auth providers integrated
  email: string;
  phone: string;
  loginStep?: number; // 0: Registration using phone or email, 1: userName, password & additonal info , 3: Create first project
  role:
    | "client"
    | "vendorClient"
    | "developer"
    | "vendor"
    | "manager"
    | "ceo"
    | string; // Role enum
  password?: string;

  // Fields common to some roles
  clients?: string[]; // Applicable for vendors managing clients
  vendorID?: string; // Vendor reference for vendor_clients
  allProjects?: string[]; // Populated based on Projects schema (linked)

  // Developer-specific fields
  workStatus?: "loggedIn" | "loggedOut" | "onBreak";
  workingHoursRanges?: {
    date: Date;
    timeRange: { startTime: string; endTime: string }[];
  }[]; // Working hours array
  joiningDate?: Date;
  position?: string[]; // Developer positions
  myProjects?: string[]; // Reference to projects
  totalSpendHours?: { date: Date; totalHours: number; loggedInTime: number }[];
  performance?: { month: number; year: number; performance: number };

  // Vendor-specific fields
  vendorBasedProjects?: string[];
}

// project types
// interface MilestoneValues {
//   _id: string;
//   title: string;
//   due_date: Date;
//   budget?: number;
//   completed?: boolean;
// }

export interface Meeting {
  _id: string;
  title: string;
  meetingDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  streamCallId: string;
}

export interface ProjectValues {
  _id: string;
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
    vendorID?: string; // Ref to Users schema if hasVendor is true
  };
  companyDetails: {
    clientID: string; // Ref to Users schema
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
    projectHours?: {
      date: Date;
      totalHours: number;
    }[]; // Derived from developers' hours
    teams: string[]; // Array of User IDs
    // tasks: Schema.Types.ObjectId[]; // Ref to Tasks schema
  };
  createdAt: string;
}
