"use client";

import { ProjectValues } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectContext } from "@/context/ProjectProvider";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export default function AllProjectListTable({
  list,
  routeTo,
  role,
  loading = false,
}: {
  list: ProjectValues[];
  routeTo?: string;
  role?: string;
  loading?: boolean;
}) {
  const { selectedProject, setSelectedProject } = useProjectContext();
  const router = useRouter();

  return (
    <Table className="relative">
      <TableHeader className="text-gray-600 z-10 border-0 sticky top-0 bg-primary-sky-blue">
        <TableRow className="border-0 text-nowrap hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
          <TableHead className="w-[60px]"></TableHead>
          <TableHead>Project Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Category</TableHead>
          {role === "ceo" && <TableHead>Figma Link</TableHead>}
          {role === "ceo" && <TableHead>Deployment Link</TableHead>}
        </TableRow>
      </TableHeader>
      {!loading ? (
        <TableBody className="text-[#3A3A3A] text-base border-0 mb-5 px-10 overflow-auto ">
          {list.length > 0 ? (
            list.map((project, index) => (
              <TableRow
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (role === "client" || role === "developer") {  
                    setSelectedProject({
                      _id: project?._id,
                      name: project?.projectDetails?.projectName,
                    });
                    if (selectedProject)
                      router.push(
                        `/${routeTo}/project/${project._id}/dashboard` + ""
                      );
                  }
                }}
                className={`h-[60px] cursor-pointer text-[#1E1B39] hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
              >
                <TableCell className=" ">{`${index + 1}.`}</TableCell>
                <TableCell
                  className="w-[35vw]  flex items-center gap-2 "
                >
                  <Image
                    src={
                      project?.projectDetails?.logo ||
                      project?.companyDetails?.logo ||
                      "/assets/user.png"
                    }
                    alt="project logo"
                    width={100}
                    height={100}
                    className="w-10 h-10 object-contain ml-2 overflow-hidden"
                  />

                  <Link
                    href={
                      role === "ceo" || role === "manager"
                        ? `/c/project/${project?._id}/dashboard`
                        : ``
                    }
                    className="font-medium hover:underline cursor-pointer"
                  >
                    {project?.projectDetails?.projectName}
                  </Link>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-3 text-nowrap
                    py-1 rounded-full text-sm ${
                      "Completed" === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "In Progress" === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {"In Progress"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(project?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className=" text-nowrap">
                  {project?.projectDetails?.category}
                </TableCell>
                {role === "ceo" && (
                  <TableCell className="text-primary-blue overflow-hidden">
                    <a
                      className={`max-w-[200px] inline-block px-3 text-nowrap
                    py-1 rounded-full text-sm ${project?.developmentDetails?.figmaLink?.link ? "bg-gray-200 text-gray-800" : "bg-gray-200 text-gray-400"}`}
                      href={project?.developmentDetails?.figmaLink?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Figma
                    </a>
                  </TableCell>
                )}
                {role === "ceo" && (
                  <TableCell className="text-primary-blue overflow-hidden">
                    <a
                      className={`max-w-[200px] inline-block px-3 text-nowrap
                    py-1 rounded-full text-sm  ${project?.developmentDetails?.deployment?.link ? "bg-gray-200 text-gray-800" : "bg-gray-200 text-gray-400"}`}
                      href={project?.developmentDetails?.deployment?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Deployment
                    </a>
                  </TableCell>
                )}
                {(role === "ceo" || role === "manager") && (
                  <TableCell
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button 
                            
                        className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the event from reaching the TableRow
                            setSelectedProject({
                              _id: project?._id,
                              name: project?.projectDetails?.projectName,
                            });
                          }}
                        >
                          <Link
                            href={`/ceo/project/${project?.projectDetails?.projectName}/dashboard?id=${project?._id}`}
                          >
                            Details/Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href={`/ceo/project/${project?.projectDetails?.projectName}/assets&scope?id=${project?._id}`}
                          >
                            Assets & Scope
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                          href={`/ceo/project/${project?.projectDetails?.projectName}/kanban?id=${project?._id}`}
                          >
                            Kanban
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow
              className={`h-[60px]  text-[#1E1B39] rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell colSpan={7} className="text-center py-4">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody className="text-[#3A3A3A] h-[200px] text-base border-0 mb-5 px-10 overflow-auto ">
          {list.map((project, index) => (
            <TableRow
              key={index}
              className={`h-[60px] cursor-pointer text-[#1E1B39] hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell className="w-[35vw]  flex items-center gap-2 ">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell className=" text-nowrap">
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              {role === "ceo" && (
                <TableCell className="text-primary-blue overflow-hidden">
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
              )}
              {role === "ceo" && (
                <TableCell className="text-primary-blue overflow-hidden">
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
              )}
              {role === "ceo" && (
                <TableCell className="text-primary-blue overflow-hidden">
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
