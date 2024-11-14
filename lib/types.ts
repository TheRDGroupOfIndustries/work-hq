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
