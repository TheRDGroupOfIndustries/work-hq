"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { CustomUser } from "@/lib/types";
import { ProjectSectionValues } from "@/lib/sections/projectSections";

const Sidebar = ({ sections }: { sections: ProjectSectionValues[] }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  return (
    <aside className="w-fit md:w-60 max-w-lg h-[calc(100vh-58px)] select-none flex-between flex-col p-2 md:p-4 bg-muted overflow-hidden">
      <div className="w-full grid justify-center md:justify-start">
        <div className="w-full h-fit space-y-2 mt-4 animate-slide-right">
          {sections.map((sec, index) => {
            const isActive = pathName === `/project-id/${sec.id}`;
            return (
              <Link
                key={index}
                href={`/project/get/${sec.id}`}
                className={`flex items-center gap-3 px-2 py-2 text-md font-medium transition-colors hover:text-primary group ${
                  isActive
                    ? "text-primary fill-primary underline underline-offset-8"
                    : ""
                } ease-in-out duration-200`}
              >
                <sec.icon size={20} className="scale-125 md:scale-100" />
                <span className="hidden md:block group-hover:translate-x-1 ease-in-out duration-300">
                  {sec.head}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full space-y-4 animate-slide-up">
        <div className="flex-between gap-2 md:bg-green-500/15 backdrop-blur-sm rounded-xl md:shadow md:p-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={user?.profileImage || "/assets/user.png"}
                alt="Profile Image"
                width="200"
                height="200"
                className="w-9 h-9 rounded-full object-cover overflow-hidden"
              />
            </div>
            <div className="hidden md:block w-fit h-fit space-y-1">
              <h4 className="text-sm font-medium line-clamp-1">
                {(user.firstName as string) +
                  " " +
                  (user.lastName as string) ||
                  user?.name ||
                  "user name"}
              </h4>
              <h6 className="text-xs line-clamp-1">{user?.role}</h6>
            </div>
          </div>

          <HiOutlineLogout
            onClick={() => signOut()}
            size={20}
            title="Logout"
            className="cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
