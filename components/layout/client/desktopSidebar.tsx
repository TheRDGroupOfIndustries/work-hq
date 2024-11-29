"use client";
import AssetsAndScope from "@/components/icons/Assets&Scope";
import Chats from "@/components/icons/Chats";
import Helpdesk from "@/components/icons/Helpdesk";
import Meeting from "@/components/icons/Meeting";
import { ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Link, useLocation } from "react-router-dom";

export default function DesktopSidebar() {
  const pathname = usePathname();

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
  return (
    <div className="sticky bg-primary-sky-blue  left-0 top-[80px] hidden  lg:w-[250px] xl:w-[300px] h-[calc(100vh-80px)]  shadow-[3px_3px_12px_0px_#D3E1F6] p-4 overflow-auto md:flex flex-col ">
      {/* top */}

      <div className="flex  flex-row gap-4 w-full p-4">
        <div className=" h-[60px] w-[60px] bg-[#377be7]"></div>
        <div className="flex flex-col ">
          <span>Project 1</span>
          <span>Progress - 58%</span>
        </div>
      </div>

      {/* List */}

      <div className="flex flex-col gap-2 mt-5 text-lg font-semibold text-[#344054]">
        {list.map(({ id, title, Icon, link }) => (
          <Link
            href={`${link}`}
            key={id}
            className={`  relative cursor-pointer hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]   px-4 py-3 rounded-xl  ${
              pathname === link
                ? "text-[#155EEF] shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
                : ""
            } flex flex-row items-center gap-2 `}
          >
            {pathname === link && (
              <div className="absolute left-2 top-2 h-[70%] w-[4px] rounded-full bg-[#155EEF]"></div>
            )}
            <Icon color={pathname === link ? "#155EEF" : "#6A6A6A"} />
            {title}
          </Link>
        ))}
      </div>

      {/* bottom */}

      <Link
        href={"/c/profile"}
        className="flex flex-row items-center justify-between mt-auto cursor-pointer"
      >
        <div className=" flex flex-row items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#377be7]"></div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">Olivia rhye</span>
            <span className=" text-sm text-[#475467]">
              olivia@untitledui.com
            </span>
          </div>
        </div>

        <div className="h-[10px] w-[10px] rounded-full  border"></div>
      </Link>
    </div>
  );
}
