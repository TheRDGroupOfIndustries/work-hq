// import { ProjectDBTypes } from "@/models/Project";
import { PaymentDBTypes } from "@/models/Payment";
import { PaymentInfoDBTypes } from "@/models/PaymentInfo";
import { TaskDBTypes } from "@/models/Task";
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
  myProjects?: string[] | ProjectValues[]; // Reference to projects
  totalSpendHours?: { date: Date; totalHours: number; loggedInTime: number }[];
  performance?: { month: number; year: number; performance: number };
  managerID?: string; // Manger reference to know about the dev working on this manager

  tasks?: TaskValues[];

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
  attendees: string[];
}

export interface ProjectValues {
  _id: string;
  projectID: string;
  projectDetails: {
    projectName: string;
    logo?: string;
    category: string;
    deadline: Date;
    additionalFiles?: {
      _id: string;
      url: string;
      title: string;
      description: string;
      date: Date;
      size: number;
    }[];
    maintenanceNeeded: boolean;
    description: string;
    scope: string;
    budget: [{ min: number; max: number }];
    hasVendor: boolean;
    vendorID?: string; // Ref to Users schema if hasVendor is true
  };
  companyDetails: {
    clientID: string; // Ref to Users schema
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
    figmaLink?: {
      link: string;
      channelID: string;
    };
    projectHours?: {
      date: Date;
      totalHours: number;
    }[]; // Derived from developers' hours
    teams: string[];
  };
  createdAt: Date;
}
// export interface ProjectValues  extends ProjectDBTypes {
//   _id: string;
// }

export interface TaskValues extends TaskDBTypes {
  _id: string;
  assignedTo: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export interface PaymentInfoValues extends PaymentInfoDBTypes {
  _id: string;
}

export interface PaymentValues extends PaymentDBTypes {
  _id: string;
}

export interface TicketValues {
  _id: string;
  ticketNo: string; // Unique ticket number
  subject: string; // Subject of the ticket
  issueType: string; // Type of issue
  priority: "Low" | "Medium" | "High"; // Priority level
  ticketDate: Date; // Date the ticket was created
  issueMessage: string; // Description of the issue
  status: "open" | "close"; // Current status of the ticket
  channelID?: string; // Optional reference to chat channel ID
  userID: string | CustomUser; // Reference to the user who created the ticket
  projectID: string | ProjectValues; // Reference to the project the ticket belongs to
}

export interface SpecificProjectlayoutProps {
  children: React.ReactNode;
  params: { _id: string };
}
