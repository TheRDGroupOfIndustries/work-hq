"use client";

import Headline from "@/components/reusables/components/headline";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { useProjectContext } from "@/context/ProjectProvider";
import { ProjectValues } from "@/lib/types";
import { ROLE } from "@/tempData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AllProjects() {
  const { userAllProjects } = useProjectContext();
  const headLineButtons = [
    {
      buttonText: "Add New Project",
      lightGrayColor: false,
      onNeedIcon: false,
      onClick: () => alert("Add New Project"),
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
  const { setSelectedProject } = useProjectContext();

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
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-1/2"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
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
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="w-[55vw] -ml-10 flex items-center gap-2 px-4 py-2">
                  <Image
                    src={"/assets/user.png"}
                    alt="project logo"
                    width={100}
                    height={100}
                    className="w-10 h-10 object-contain overflow-hidden"
                  />
                  <Link
                    onClick={() =>
                      setSelectedProject({
                        _id: project?._id,
                        name: project?.projectDetails?.projectName,
                      })
                    }
                    href={`/c/project/${project?.projectDetails?.projectName}/dashboard`}
                    className="font-medium text-blue-600"
                  >
                    {project?.projectDetails?.projectName}
                  </Link>
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
      </table>
    </div>
  );
};
