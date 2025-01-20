"use client";
import Filter from "@/components/icons/Filter";
import AllProjectListTable from "@/components/reusables/components/AllProjectListTable";
import Headline from "@/components/reusables/components/headline";
import ProjectReportCard, {
  TaskStatusReport,
} from "@/components/reusables/components/projectReportCard";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CustomUser, ProjectValues } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { setAllProjectsList } from "@/redux/slices/ceo";
import { ROLE } from "@/tempData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RevenueSummary from "../components/revenueSummary";
import { useSession } from "next-auth/react";

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState<ProjectValues[]>([]);

  const dispatch = useDispatch();

  //Checking if the data is available in redux or not
  const allProjectsList = useSelector(
    (state: RootState) => state.ceo.allProjectsList
  );

  const [projectSummaryReportm, setProjectSummaryReport] =
    useState<TaskStatusReport>({
      completed: 0,
      inProgress: 0,
      pending: 0,
      refactoring: 0,
    });

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => {},
    },
  ];

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await fetch("/api/project", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setAllProjects(data.projects);
        }

        const projects: ProjectValues[] = data.projects;
        console.log("projects: ", projects);

        dispatch(setAllProjectsList(projects));

        const projectSummaryReport: TaskStatusReport = {
          completed: projects.filter(
            (project: ProjectValues) =>
              project.developmentDetails.status === "completed"
          ).length,
          inProgress: projects.filter(
            (project: ProjectValues) =>
              project.developmentDetails.status === "inProgress"
          ).length,
          pending: projects.filter(
            (project: ProjectValues) =>
              project.developmentDetails.status === "pending"
          ).length,
          refactoring: projects.filter(
            (project: ProjectValues) =>
              project.developmentDetails.status === "refactoring"
          ).length,
        };

        setProjectSummaryReport(projectSummaryReport);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    if (allProjectsList.length > 0) {
      setAllProjects(allProjectsList);

      const projectSummaryReport: TaskStatusReport = {
        completed: allProjectsList.filter(
          (project: ProjectValues) =>
            project.developmentDetails.status === "completed"
        ).length,
        inProgress: allProjectsList.filter(
          (project: ProjectValues) =>
            project.developmentDetails.status === "inProgress"
        ).length,
        pending: allProjectsList.filter(
          (project: ProjectValues) =>
            project.developmentDetails.status === "pending"
        ).length,
        refactoring: allProjectsList.filter(
          (project: ProjectValues) =>
            project.developmentDetails.status === "refactoring"
        ).length,
      };
      setProjectSummaryReport(projectSummaryReport);
    } else {
      fetchAllProjects();
    }
  }, [allProjectsList, dispatch]);
  return (
    <MainContainer>
      <Headline
        role={ROLE}
        title="All Project"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <ProjectTable
        projects={allProjects}
        projectSummaryReportm={projectSummaryReportm}
      />
    </MainContainer>
  );
}

interface ProjectTableProps {
  projects: ProjectValues[];
  projectSummaryReportm: TaskStatusReport;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  projectSummaryReportm,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const { data: session } = useSession();
  const user = session?.user as CustomUser;  

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
          title="Projects Summary"
          subTitleTotal={`Tota Projects - ${projects.length}`}
          report={projectSummaryReportm}
          totalTasks={10}
          role={ROLE}
        />

        <RevenueSummary />
      </div>

      <Container>
        <div className="flex flex-col w-full  gap-4">
          <div className="w-full flex flex-col">
            <h2 className="uppercase text-lg font-semibold">Projects list</h2>
            <p>Total Projects - {projects.length} </p>
          </div>
          <div className="w-full flex flex-col gap-4 px-2 ">
            <AllProjectListTable list={filteredProjects} role={user.role} />
          </div>
        </div>
      </Container>
    </div>
  );
};
