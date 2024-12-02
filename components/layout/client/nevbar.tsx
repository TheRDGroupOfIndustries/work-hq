"use client";
import AssetsAndScope from "@/components/icons/Assets&Scope";
import Chats from "@/components/icons/Chats";
import Helpdesk from "@/components/icons/Helpdesk";
import Meeting from "@/components/icons/Meeting";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomUser } from "@/lib/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
// import { Button } from "@/components/ui/button";
// import { IoNotificationsOutline } from "react-icons/io5";
import { useProjectContext } from "@/context/ProjectProvider";

import { Role, VENDOR } from "@/types";
import {
  Bell,
  ChartNoAxesColumn,
  // ChevronDown,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const list = [
  {
    id: "1",
    title: "Dashboard",
    Icon: ChartNoAxesColumn,
    link: "/c/dashboard",
  },
  {
    id: "2",
    title: "Assets & Scope",
    Icon: AssetsAndScope,
    link: "/c/assets&scope",
  },
  {
    id: "3",
    title: "Meetings",
    Icon: Meeting,
    link: "/c/meetings/details",
  },
  {
    id: "4",
    title: "Chats",
    Icon: Chats,
    link: "/c/chats",
  },
  {
    id: "5",
    title: "Payments",
    Icon: AssetsAndScope,
    link: "/c/payments",
  },
  {
    id: "6",
    title: "Helpdesk",
    Icon: Helpdesk,
    link: "/c/helpdesk",
  },
];

const Navbar = ({ role }: { role: Role }) => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const { selectedProject, setProject } = useProjectContext();
  const userProjects = user?.allProjects;

  const pathname = usePathname();

  return (
    <nav
      className={`sticky  left-0 top-0 w-full h-[70px]     flex flex-row items-center justify-between z-50 ${
        role === VENDOR
          ? "bg-vendor-dark shadow-[0px_3px_12px_0px_#00000099;]"
          : "bg-primary-sky-blue shadow-[0px_3px_12px_0px_#d3e1f6]"
      }`}
    >
      {/* left */}
      <div className="flex flex-row items-center gap-3 sm:gap-9 text-lg font-semibold px-5">
        <h1 className="text-2xl font-semibold">Logo</h1>
        <div className="lg:flex  items-center  hidden text-nowrap">
          <SelectProject role={role} />
          <Link
            href="/c/all-projects"
            className={`h-full text-desktop py-5 px-4 mr-3 ${
              pathname === "/c/all-projects"
                ? `${
                    role === VENDOR
                      ? "text-white border-b-white"
                      : "border-b-primary-blue text-primary-blue"
                  } cursor-pointer border-b-[4px]`
                : `${role === VENDOR ? "text-white" : "text-dark-gray"}`
            }`}
          >
            All Projects
          </Link>
          <span
            className={`text-desktop cursor-pointer flex flex-row items-center py-3 px-3 gap-2   rounded-xl ${
              role === VENDOR
                ? "text-white shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646] bg-[#360227] "
                : "text-dark-gray shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] "
            }`}
          >
            <Plus
              color={`${role === VENDOR ? "white" : "var(--dark-gray)"}`}
              className=""
            />{" "}
            Add Project
          </span>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-row items-center gap-5 pr-5">
        <span className="relative w-full hidden sm:block">
          <input
            placeholder="Search"
            className={`  text-base  md:[250px] xl:w-[350px] sm:min-w-[250px]  py-3 px-6 pl-11 outline-none  border-[#C1C7CD] rounded-xl placeholder:font-medium placeholder:text-base
              
              ${
                role === VENDOR
                  ? "text-white shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646] bg-[#360227] placeholder:text-[#ffffff]  "
                  : "text-dark-gray shadow-[5px_5px_20px_0px_#B6CEF2,-5px_-5px_20px_0px_#FFFFFF,-5px_-5px_20px_0px_#FFFFFF4D_inset,5px_5px_20px_0px_#B6CEF299_inset] placeholder:text-[#697077]  bg-primary-sky-blue "
              }
              
            `}
            type="search"
            name=""
            id=""
          />
          <Search
            color={ role === VENDOR ? "white" : "#697077"}
            strokeWidth={2.6}
            className="absolute h-[20px] w-[20px] top-[14px] left-4 font-medium"
          />
        </span>
        <span className="relative">
          <Bell color={ role === VENDOR ? "white" : "var(--dark-blue)"} />
          <div className="h-3 w-3 p-1 bg-[#ff2525] rounded-full absolute top-0 right-0">
            <span className="w-full h-full flex items-center justify-center text-[6px] text-white">
              12
            </span>
          </div>
        </span>
        <span>
          <Settings color={ role === VENDOR ? "white" : "var(--dark-blue)"} />
        </span>
        <ProfileDropDownMenu />
      </div>
    </nav>
  );
};

export default Navbar;

export function SelectProject({ role }: { role: Role }) {
  return (
    <Select>
      <SelectTrigger
        className={` border-0 shadow-none text-lg  ${
          role === VENDOR
            ? "bg-vendor-dark text-white"
            : "bg-primary-sky-blue text-dark-gray"
        } `}
      >
        <p
          className={`h-full flex text-desktop flex-row gap-5 items-center cursor-pointer py-5 px-4 `}
        >
          Projects
        </p>
        {/* <SelectValue placeholder="Select a fruit" /> */}
      </SelectTrigger>
      <SelectContent className="shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] text-desktop mt-5">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ProfileDropDownMenu() {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border-0 text-desktop">
        <span className="relative">
          <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full overflow-hidden bg-[#4872b5]"></div>
          <div className="h-4 w-4 bg-[#25ff30] border-2  border-white rounded-full absolute bottom-0 right-0"></div>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ">
        <DropdownMenuItem>
          <Link
            href={"/c/profile"}
            className={` w-full text-desktop  hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]  relative cursor-pointer  px-4 py-3 rounded-xl  ${
              pathname === "/c/profile"
                ? "text-primary-blue shadow_sidebar_btn_selected"
                : ""
            } flex flex-row items-center gap-2 `}
          >
            {pathname === "/c/profile" && (
              <div className="absolute left-2 top-2 h-[70%] w-[4px] rounded-full bg-[#155EEF]"></div>
            )}
            <UserRound
              color={pathname === "/c/profile" ? "#155EEF" : "#6A6A6A"}
            />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {list.map(({ id, title, Icon, link }) => (
          <DropdownMenuItem key={id}>
            <Link
              href={`${link}`}
              key={id}
              className={` w-full text-desktop relative cursor-pointer hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]   px-4 py-3 rounded-xl  ${
                pathname === link
                  ? "text-primary-blue shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
                  : ""
              } flex flex-row items-center gap-2 `}
            >
              {pathname === link && (
                <div className="absolute left-2 top-2 h-[70%] w-[4px] rounded-full bg-[#155EEF]"></div>
              )}
              <Icon
                color={pathname === link ? "var(--primary-blue)" : "#6A6A6A"}
              />
              {title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
