"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";
import { ProjectValues } from "@/lib/types";
import { ROLE } from "@/tempData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Filter from "@/components/icons/Filter";
import Headline from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import AllProjectListTable from "@/components/reusables/components/AllProjectListTable";

export default function AllProjects() {
  const { userAllProjects } = useProjectContext();
  const router = useRouter();
  const headLineButtons = [
    {
      buttonText: "Add New Project",
      onNeedIcon: false,
      onClick: () => router.push("/c/add-project"),
    },
  ];
  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="All Project"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <ProjectTable projects={userAllProjects} />
    </MainContainer>
  );
}

interface ProjectTableProps {
  projects: ProjectValues[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project?.projectDetails?.projectName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project?.projectDetails?.description
        ?.toLowerCase()
        ?.includes(search.toLowerCase());
    const matchesCategory = filterCategory
      ? project?.projectDetails?.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(projects.map((project) => project?.projectDetails?.category))
  );

  return (
    <div className="p-4 rounded-lg select-none">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />

        {/* <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-2 h-[40px]  flex text-desktop flex-row items-center font-medium  gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select> */}

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-fit te outline-none gap-1 bg-transparent">
            <div className="w-full text-[#697077] flex flex-row gap-1 items-center justify-end">
              <Filter />
              Filter
            </div>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-transparent text-dark-gray border-b border-gray-300">
            <th className="px-4 py-2"></th>
            <th className="w-[55vw] px-4 py-2">Project Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created On</th>
            <th className="px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <tr
                key={index}
                onClick={() => {
                  setSelectedProject({
                    _id: project?._id,
                    name: project?.projectDetails?.projectName,
                  });
                  if (selectedProject)
                    router.push(`/c/project/${project._id}/dashboard` + "");
                }}
                className="cursor-pointer border-t rounded-lg hover:bg-transparent hover:shadow-[3px_3px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] ease-in-out duration-200"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="w-[55vw] -ml-10 flex items-center gap-2 px-4 py-2">
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

                  <span className="font-medium">
                    {project?.projectDetails?.projectName}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      "Completed" === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "In Progress" === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {"In Progress"}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(project?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {project?.projectDetails?.category}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      <AllProjectListTable role="client" list={filteredProjects} routeTo="c" />
    </div>
  );
};
