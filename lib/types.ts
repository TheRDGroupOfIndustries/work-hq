import { ProjectDBTypes } from "@/models/Project";
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

export interface ProjectValues  extends ProjectDBTypes {
  _id: string;
}

export interface TaskValues {
  projectID: string;
  taskNo: number;
  issueSubject: string;
  estimatedTime?: number;
  assignedTo?: string;
  status: "completed" | "pending" | "inProgress" | "refactoring";
  createdAt: Date;
  workingSince?: Date;
  totalHoursSpend?: number;
  createdBy: string;
}
