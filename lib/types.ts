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
  projects?: { _id: string; title: string }[];

  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;

  company_name?: string;
  organization_details?: string;
  position?: string;

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
