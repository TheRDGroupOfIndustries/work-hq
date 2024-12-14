"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types";
import { Role, VENDOR } from "@/types";
import Logout from "@/components/icons/logout";
import { LucideProps } from "lucide-react";
import { useProjectContext } from "@/context/ProjectProvider";

interface LinkItem {
  id: string;
  title: string;
  Icon:
    | React.ComponentType<LucideProps>
    | React.ComponentType<{ color: string }>;
  link: string;
  path: string;
}

interface DesktopSidebarProps {
  role: Role;
  links: LinkItem[];
  _id: string;
}

export default function DesktopSidebar({
  role,
  links,
  _id,
}: DesktopSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const { selectedProjectDetails } = useProjectContext();

  return (
    <div
      className={`sticky left-0 top-[70px] hidden lg:w-[250px] h-[calc(100vh-70px)] p-4 overflow-auto md:flex flex-col 
      ${
        role === VENDOR
          ? "bg-vendor-dark shadow-[3px_3px_12px_0px_#00000099] text-[#A5A5A5]"
          : "bg-primary-sky-blue shadow-[3px_3px_12px_0px_#D3E1F6] text-[#475467] "
      }
    `}
    >
      {/* top */}
      <div className="flex text-sm  flex-row gap-4 w-full px-3 py-2 shadow-[3px_3px_12px_0px_#D3E1F6] rounded-xl overflow-hidden">
        <div className="flex-center h-[60px] w-[60px] shadow-neuro-3 rounded-xl overflow-hidden">
          <Image
            src={
              selectedProjectDetails?.companyDetails?.logo || "/assets/user.png"
            }
            alt="profile image"
            width={200}
            height={200}
            className="w-full h-full overflow-hidden"
          />
        </div>
        {/* <div className=" h-[60px] w-[60px] bg-[#377be7]"></div> */}
        <div
          className={`flex flex-col ${
            role === VENDOR ? "text-white" : "text-dark-gray"
          } `}
        >
          <span>{selectedProjectDetails?.projectDetails?.projectName}</span>
          <span>Progress - 58%</span>
        </div>
      </div>

      {/* List */}
      <div className={`flex flex-col gap-2 mt-5 text-lg font-semibold`}>
        {links.map(({ id, title, Icon, link, path }) => {
          const isActive =
            decodeURIComponent(pathname) === `${link}/${_id}/${path}`;
          return (
            <Link
              href={`${link}/${_id}/${path}`}
              key={id}
              className={`text-desktop relative cursor-pointer px-4 py-3 rounded-xl ${
                role === VENDOR
                  ? "hover:shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646]"
                  : "hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
              }
              ${
                isActive
                  ? role === VENDOR
                    ? "text-white shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646]"
                    : "text-[#155EEF] shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
                  : ""
              } flex flex-row items-center gap-2`}
            >
              {isActive && (
                <div
                  className={`absolute left-2 top-2 h-[70%] w-[4px] rounded-full ${
                    role === VENDOR ? "bg-white" : "bg-[#155EEF]"
                  }`}
                ></div>
              )}
              <Icon
                color={
                  isActive
                    ? `${role === VENDOR ? "white" : "#155EEF"}`
                    : `${role === VENDOR ? "#A5A5A5" : "#475467"}`
                }
              />
              {title}
            </Link>
          );
        })}
      </div>

      {/* bottom */}
      <Link
        href={"/dev/profile"}
        className="flex flex-row items-center justify-between mt-auto cursor-pointer text-sm"
      >
        <div className="flex flex-row items-center gap-2">
          <div className="flex-center w-10 h-10 rounded-full bg-[#4872b5] overflow-hidden">
            <Image
              src={user?.profileImage || user?.image || "/assets/user.png"}
              alt="profile image"
              width={200}
              height={200}
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm">
              {user?.firstName
                ? user?.firstName + " " + user?.lastName
                : user?.name}
            </span>
            <span className="text-sm text-[#475467] max-w-[140px]">
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
