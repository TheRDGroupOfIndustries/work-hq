import { User as NextAuthUser } from "next-auth";

export interface CustomUser extends NextAuthUser {
  _id: string;
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
  company_name?: string;
  organization_details?: string;
  position?: string;
  projects?: string[];
  department?: string;
  website?: string;
  address?: string;
  bio?: string;
  connections?: string[];
  preferred_communication?: string[];
}

// project types
interface MilestoneValues {
  _id: string;
  title: string;
  due_date: Date;
  completed: boolean;
}
export interface ProjectValues {
  _id: string;
  title: string;
  description: string;
  client: string;
  manager: string;
  assigned_team: string[];
  vendor?: string;
  ceo?: string;
  start_date: Date;
  end_date?: Date;
  status: string;
  budget?: number;
  technologies: string[];
  milestones: MilestoneValues[];
  files?: string[];
  progress: number;
  notes?: string[];
}
