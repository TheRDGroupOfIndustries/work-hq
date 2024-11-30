"use client";

import Dashboard from "@/components/project/sections/Dashboard";
import Chats from "@/components/project/sections/Chats";
import { IconType } from "react-icons/lib";
import { LuLayoutDashboard } from "react-icons/lu";

export interface ProjectSectionValues {
  id: string;
  head: string;
  href: string;
  icon: IconType;
  sectionNode: () => React.JSX.Element;
}

export const projectSections: ProjectSectionValues[] = [
  {
    id: "dashboard",
    head: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
    sectionNode: Dashboard,
  },
  {
    id: "chats",
    head: "Chats",
    href: "/chats",
    icon: LuLayoutDashboard,
    sectionNode: Chats,
  },
];