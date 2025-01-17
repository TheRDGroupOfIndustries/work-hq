"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CustomUser } from "@/lib/types";
// import { Button } from "@/components/ui/button";
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
  SelectTrigger,
} from "@/components/ui/select";
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



const Navbar = ({ role }: { role: Role }) => {
  const pathname = usePathname();
  // const router = useRouter();
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
        <h1 className="text-2xl font-semibold">
          <Image
          src="/logo.png"
          alt="Loading"
          width={600}
          height={600}
          className="w-[15vh] h-[15vh] object-contain animate-pulse"
        />
        </h1>
        <div className="hidden lg:flex-center text-nowrap">
          {pathname !== "/c/all-projects" && <SelectProject role={role} />}
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
          {pathname !== "/c/all-projects" && (
            <Link
              href="/c/add-project"
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
            </Link>
          )}
        </div>
      </div>

      {/* right */}
      <div className="flex flex-row items-center gap-5 pr-5">
        <span className="relative w-full hidden sm:block">
          <Search
            color={role === VENDOR ? "white" : "#697077"}
            strokeWidth={2.6}
            className="absolute h-[20px] w-[20px] top-[14px] left-4 font-medium"
          />
          <input
            type="search"
            name="search"
            placeholder="Search"
            className={`text-base md:[250px] xl:w-[350px] sm:min-w-[250px] py-3 px-6 pl-11 outline-none border-[#C1C7CD] rounded-xl placeholder:font-medium placeholder:text-base
              
              ${
                role === VENDOR
                  ? "text-white shadow-[3px_3px_10px_0px_#000000,-3px_-3px_10px_0px_#610646] bg-[#360227] placeholder:text-[#ffffff]  "
                  : "text-dark-gray shadow-[5px_5px_20px_0px_#B6CEF2,-5px_-5px_20px_0px_#FFFFFF,-5px_-5px_20px_0px_#FFFFFF4D_inset,5px_5px_20px_0px_#B6CEF299_inset] placeholder:text-[#697077]  bg-primary-sky-blue "
              }
              
            `}
          />
        </span>
        <span className="relative">
          <Bell color={role === VENDOR ? "white" : "var(--dark-blue)"} />
          <div className="h-3 w-3 p-1 bg-[#ff2525] rounded-full absolute top-0 right-0">
            <span className="w-full h-full flex items-center justify-center text-[6px] text-white">
              12
            </span>
          </div>
        </span>
        <span>
          <Settings color={role === VENDOR ? "white" : "var(--dark-blue)"} />
        </span>
        <ProfileDropDownMenu />
      </div>
    </nav>
  );
};

export default Navbar;

const SelectProject = ({ role }: { role: Role }) => {
  const router = useRouter();

  const {
    // selectedProjectDetails,
    userAllProjects,
    selectedProject,
    setSelectedProject,
  } = useProjectContext();

  // console.log(selectedProjectDetails);

  const handleSelect = (projectName: string) => {
    const selected = userAllProjects.find(
      (project) => project.projectDetails.projectName === projectName
    );
    if (selected) {
      setSelectedProject({
        _id: selected._id,
        name: selected.projectDetails.projectName,
      });
    }
  };
  // const pathName = usePathname();

  // if (!selectedProject._id && pathName !== "/c/add-project") router.push("/c/all-projects");

  return (
    <Select>
      <SelectTrigger
        className={`border-0 shadow-none text-lg ${
          role === VENDOR
            ? "bg-vendor-dark text-white"
            : "bg-primary-sky-blue text-dark-gray"
        }`}
      >
        <p
          className={`h-full flex text-desktop flex-row gap-5 items-center cursor-pointer py-5 px-4`}
        >
          {selectedProject?.name || "Select a Project"}
        </p>
      </SelectTrigger>
      <SelectContent className="shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] text-desktop mt-5">
        <SelectGroup>
          {userAllProjects
            // ?.filter((project) => project._id !== selectedProject._id)
            ?.map((project, index) => (
              <SelectItem
                key={index}
                value={project.projectDetails.projectName}
                onClick={() => {
                  handleSelect(project.projectDetails.projectName);
                  router.push(
                    `/c/project/${project?.projectDetails?.projectName}/dashboard`
                  );
                }}
              >
                {project.projectDetails.projectName}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export function ProfileDropDownMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const {
    selectedProjectDetails,
    
  } = useProjectContext();

  // console.log("user", user);

  const list = [
    {
      id: "1",
      title: "Dashboard",
      Icon: ChartNoAxesColumn,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/dashboard`,
      path: 'dashboard'
    },
    {
      id: "2",
      title: "Assets & Scope",
      Icon: AssetsAndScope,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/assets&scope`,
      path: 'assets&scope'
    },
    {
      id: "3",
      title: "Meetings",
      Icon: Meeting,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/details`,
      path: 'details'
    },
    {
      id: "4",
      title: "Chats",
      Icon: Chats,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/chats`,
      path: 'chats'
    },
    {
      id: "5",
      title: "Payments",
      Icon: AssetsAndScope,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/payments`,
      path: 'payments'
    },
    {
      id: "6",
      title: "Helpdesk",
      Icon: Helpdesk,
      link: `/c/project/${selectedProjectDetails?.projectDetails.projectName}/helpdesk`,
      path: 'helpdesk'
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 outline-none text-desktop select-none">
        <span className="relative">
          <div className="flex-center w-10 h-10 rounded-full bg-[#4872b5] overflow-hidden">
            <Image
              src={user?.profileImage || user?.image || "/assets/user.png"}
              alt="profile image"
              width={200}
              height={200}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="h-4 w-4 bg-[#25ff30] border-2 border-white rounded-full absolute bottom-0 right-0"></div>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ">
        <DropdownMenuItem className="outline-none border-0">
          <Link
            href={"/ceo/profile"}
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
        {list.map(({ id, title, Icon, link, path }) => (
          <DropdownMenuItem key={id}>
            <Link
              href={`${link}`}
              key={id}
              className={` outline-none border-0 w-full text-desktop relative cursor-pointer hover:shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]   px-4 py-3 rounded-xl  ${
                pathname.includes(path)
                  ? "text-primary-blue shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF]"
                  : ""
              } flex flex-row items-center gap-2 `}
            >
              {pathname.includes(path) && (
                <div className="absolute left-2 top-2 h-[70%] w-[4px] rounded-full bg-[#155EEF]"></div>
              )}
              <Icon
                color={pathname.includes(path) ? "var(--primary-blue)" : "#6A6A6A"}
              />
              {title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
