"use client";
import AssetsAndScope from "@/components/icons/Assets&Scope";
import Chats from "@/components/icons/Chats";
import Helpdesk from "@/components/icons/Helpdesk";
import Meeting from "@/components/icons/Meeting";
import { Role, VENDOR } from "@/types";
import { ChartNoAxesColumn, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { CustomUser } from "@/lib/types";
import Image from "next/image";
import Logout from "@/components/icons/logout";
// import { Link, useLocation } from "react-router-dom";

export default function DesktopSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  
  const { data: session } = useSession();
  const user = session?.user as CustomUser;


  const list = [
    {
      id: "1",
      title: "Dashboard",
      Icon: ChartNoAxesColumn,
      link: `/ceo/dashboard`,
      path: 'dashboard'
    },
    {
      id: "2",
      title: "Projects",
      Icon: AssetsAndScope,
      link: `/ceo/all-projects`,
      path: 'all-projects'
    },
    {
      id: "3",
      title: "Meetings",
      Icon: Meeting,
      link: `/ceo/meetings/details`,
      path: 'meetings'
    },
    {
      id: "4",
      title: "Employees",
      Icon: Chats,
      link: `/ceo/employees`,
      path: 'employees'
    },
    {
      id: "5",
      title: "Client/Vendors",
      Icon: AssetsAndScope,
      link: `/ceo/client-vendors`,
      path: 'client-vendors'
    },
    {
      id: "6",
      title: "Chats",
      Icon: Chats,
      link: `/ceo/chats`,
      path: 'chats'
    },
    {
      id: "7",
      title: "Payments",
      Icon: CreditCard,
      link: `/ceo/payments`,
      path: 'payments'
    },
    {
      id: "7",
      title: "Helpdesk",
      Icon: Helpdesk,
      link: `/ceo/helpdesk`,
      path: 'helpdesk'
    },
  ];
  return (
    <div
      className={`sticky    left-0 top-[70px] hidden  lg:w-[250px] h-[calc(100vh-70px)]  p-4 overflow-y-auto overflow-x-hidden md:flex flex-col 
      ${
        role === VENDOR
          ? "bg-vendor-dark shadow-[3px_3px_12px_0px_#00000099] text-[#A5A5A5]"
          : "bg-primary-sky-blue shadow-[3px_3px_12px_0px_#D3E1F6] text-[#475467] "
      }
    `}
    >
      {/* top */}

      <div className="flex  flex-col">
        <h4 className="text-lg font-semibold text-dark-gray">All Projects Panal</h4>
        <p className="text-base text-light-gray">Total Projects -04</p>
      </div>

      {/* List */}

      <div className={`flex flex-col gap-2 mt-5 text-lg font-semibold`}>
        {list.map(({ id, title, Icon, link, path }) => (
          <Link
            href={`${link}`}
            key={id}
            className={` text-desktop  relative cursor-pointer   px-4 py-3 rounded-xl  ${
              pathname.includes(path!)
                ? `${
                    role === VENDOR
                      ? "text-white shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646]"
                      : "text-[#155EEF] shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
                  }`
                : ""
            } 

            ${role === VENDOR ? "hover:shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646]" : "hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]" }
            
            flex flex-row items-center gap-2 `}
          >
            {pathname.includes(path!) && (
              <div
                className={`absolute left-2 top-2 h-[70%] w-[4px] rounded-full ${
                  role === VENDOR ? "bg-white" : "bg-[#155EEF]"
                }`}
              ></div>
            )}
            <Icon
              color={
                pathname.includes(path!)
                  ? `${role === VENDOR ? "white" : "#155EEF"}`
                  : `${role === VENDOR ? "#A5A5A5" : "#475467"}`
              }
            />
            {title}
          </Link>
        ))}
      </div>

      {/* bottom */}

      <Link
        href={"/c/profile"}
        className="flex flex-row items-center justify-between mt-auto cursor-pointer text-sm"
      >
        <div className=" flex flex-row items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-[#377be7]">
          <Image
              src={user?.profileImage || user?.image || "/assets/user.png"}
              alt="profile image"
              width={200}
              height={200}
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm">{user?.firstName ?? " "+ " "+ user?.lastName ?? " "}</span>
            <span className=" text-sm text-[#475467] max-w-[140px]">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="h-[40px] w-[40px] flex items-center justify-center">
          <Logout color="#475467" onClick={() => signOut()} />
        </div>
      </Link>
    </div>
  );
}
