"use client";
import Filter from "@/components/icons/Filter";
import AllProjectListTable from "@/components/reusables/components/AllProjectListTable";
import Headline from "@/components/reusables/components/headline";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useProjectContext } from "@/context/ProjectProvider";
import { ProjectValues } from "@/lib/types";
import { dashboardProjectReport, ROLE } from "@/tempData";
import { useState } from "react";
import RevenueSummary from "../components/revenueSummary";

export default function AllProjects() {
  const { userAllProjects } = useProjectContext();

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => {},
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
    <div className="rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />

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

      <div className="w-full flex flex-col xl:flex-row gap-4 ">
        <ProjectReportCard
          report={dashboardProjectReport}
          totalTasks={10}
          role={ROLE}
        />

        <RevenueSummary />
      </div>

      <Container>
        <div className="flex flex-col w-full h-[500px] gap-4">
          <div className="w-full flex flex-col">
            <h2 className="uppercase text-lg font-semibold">Projects list</h2>
            <p>Total Projects - {projects.length} </p>
          </div>
          <div className="w-full flex flex-col gap-4 px-2">
            <AllProjectListTable list={filteredProjects} role="ceo" />
          </div>
        </div>
      </Container>
    </div>
  );
};
