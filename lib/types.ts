import { User as NextAuthUser } from "next-auth";

export interface CustomUser extends NextAuthUser {
  _id: string;
  username: string;
  firstName: string;
  lastName?: string;
  loginStep: number; // 0: Registration using phone or email, 1: userName, password & additonal info , 3: Create first project
  email: string;
  phone: string;
  role: "client" | "vendorClient" | "developer" | "vendor" | "manager" | "ceo";
  password: string;

  // Fields common to some roles
  clients?: string[]; // Applicable for vendors managing clients
  vendorID?: string; // Vendor reference for vendor_clients
  allProjects?: string[]; // Populated based on Projects schema (linked)

  // Developer-specific fields
  workStatus?: "loggedIn" | "loggedOut" | "onBreak";
  workingHoursRanges?: { startTime: string; endTime: string }[]; // Working hours array
  joiningDate?: Date;
  position?: string[]; // Developer positions
  myProjects?: string[]; // Reference to projects
  totalSpendHours?: { date: Date; totalHours: number; loggedInTime: number }[];
  performance?: number; // Calculated dynamically

  // Vendor-specific fields
  vendorBasedProjects?: string[]; // Fetched from Projects schema

  // Fields for managers and CEOs (minimal role-specific fields)
  // No additional fields for these roles at the moment

  // Additional fields
  profile_image: string;
  auth_integrated: string[];
  // projects?: { _id: string; title: string }[];

  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;

  company_name?: string;
  organization_details?: string;
  department?: string;
  website?: string;
  address?: string;
  preferred_communication?: string[];
}

// project types
interface MilestoneValues {
  _id: string;
  title: string;
  due_date: Date;
  budget?: number;
  completed?: boolean;
}
export interface ProjectValues {
  _id: string;
  title: string;
  description: string;
  logo?: string;
  start_date?: Date;
  end_date?: Date;
  status: string;
  technologies?: string[];
  milestones?: MilestoneValues[];
  files?: string[];
  project_ref?: string[];
  notes?: string[];
  client?: string;
  vendor?: string;
  manager?: string;
  assigned_team?: string[];
  figma_link?: string;
  figma_iframe_link?: string;
  github_link?: string;
  deployed_link?: string;
  progress: number;
}