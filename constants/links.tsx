"use client";

import {
  AlignStartHorizontal,
  ChartNoAxesColumn,
  CreditCard,
} from "lucide-react";
import AssetsAndScope from "@/components/icons/Assets&Scope";
import Chats from "@/components/icons/Chats";
import Helpdesk from "@/components/icons/Helpdesk";
import Meeting from "@/components/icons/Meeting";
export const clientLinks = [
  {
    id: "1",
    title: "Dashboard",
    Icon: ChartNoAxesColumn,
    link: `/c/project`,
    path: "dashboard",
  },
  {
    id: "2",
    title: "Assets & Scope",
    Icon: AssetsAndScope,
    link: `/c/project`,
    path: "assets&scope",
  },
  {
    id: "3",
    title: "Chats",
    Icon: Chats,
    link: `/c/project`,
    path: "chats",
  },
  {
    id: "4",
    title: "Meetings",
    Icon: Meeting,
    link: `/c/project`,
    path: "meetings/details",
  },
  {
    id: "5",
    title: "Payments",
    Icon: AssetsAndScope,
    link: `/c/project`,
    path: "payments",
  },
  {
    id: "6",
    title: "Helpdesk",
    Icon: Helpdesk,
    link: `/c/project`,
    path: "helpdesk",
  },
];

export const devLinks = [
  {
    id: "1",
    title: "Dashboard",
    Icon: ChartNoAxesColumn,
    link: `/dev/project`,
    path: "dashboard",
  },
  {
    id: "2",
    title: "Assets & Scope",
    Icon: AssetsAndScope,
    link: `/dev/project`,
    path: "assets&scope",
  },
  {
    id: "3",
    title: "Project Kanban",
    Icon: AlignStartHorizontal,
    link: `/dev/project`,
    path: "kanban",
  },
  {
    id: "4",
    title: "Chats",
    Icon: Chats,
    link: `/dev/project`,
    path: "chats",
  },
  {
    id: "5",
    title: "Meetings",
    Icon: Meeting,
    link: `/dev/project`,
    path: "meetings/details",
  },
  {
    id: "6",
    title: "Salary",
    Icon: CreditCard,
    link: `/dev/project`,
    path: "salary",
  },
];
export const ceoLinks = [
    {
      id: "1",
      title: "Dashboard",
      Icon: ChartNoAxesColumn,
      link: `/ceo/`,
      path: 'dashboard'
    },
    {
      id: "2",
      title: "Projects",
      Icon: AssetsAndScope,
      link: `/ceo/`,
      path: 'all-projects'
    },
    {
      id: "3",
      title: "Meetings",
      Icon: Meeting,
      link: `/ceo/`,
      path: 'meetings/details'
    },
    {
      id: "4",
      title: "Employees",
      Icon: Chats,
      link: `/ceo/`,
      path: 'employees'
    },
    {
      id: "5",
      title: "Client/Vendors",
      Icon: AssetsAndScope,
      link: `/ceo/`,
      path: 'client-vendors'
    },
    {
      id: "6",
      title: "Chats",
      Icon: Chats,
      link: `/ceo/`,
      path: 'chats'
    },
    {
      id: "7",
      title: "Payments",
      Icon: CreditCard,
      link: `/ceo/`,
      path: 'payments'
    },
    {
      id: "7",
      title: "Helpdesk",
      Icon: Helpdesk,
      link: `/ceo/`,
      path: 'helpdesk'
    },
  ];
  export const managerLinks = [
    {
      id: "1",
      title: "Dashboard",
      Icon: ChartNoAxesColumn,
      link: `/ceo/`,
      path: 'dashboard'
    },
    {
      id: "2",
      title: "Projects",
      Icon: AssetsAndScope,
      link: `/ceo/`,
      path: 'all-projects'
    },
    {
      id: "3",
      title: "Meetings",
      Icon: Meeting,
      link: `/ceo/`,
      path: 'meetings/details'
    },
    {
      id: "4",
      title: "Employees",
      Icon: Chats,
      link: `/ceo/`,
      path: 'employees'
    },
    {
      id: "5",
      title: "Client/Vendors",
      Icon: AssetsAndScope,
      link: `/ceo/`,
      path: 'client-vendors'
    },
    {
      id: "6",
      title: "Chats",
      Icon: Chats,
      link: `/ceo/`,
      path: 'chats'
    },
    {
      id: "7",
      title: "Payments",
      Icon: CreditCard,
      link: `/ceo/`,
      path: 'payments'
    },
    {
      id: "7",
      title: "Helpdesk",
      Icon: Helpdesk,
      link: `/ceo/`,
      path: 'helpdesk'
    },
    {
      id: "8",
      title: "Team Members",
      Icon: Helpdesk,
      link: `/ceo/`,
      path: 'team-members'
    },
  ];