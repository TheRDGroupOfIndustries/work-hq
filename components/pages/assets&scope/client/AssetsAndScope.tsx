"use client";

import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import FilesList from "../components/filesList";
import ProjectScope from "../components/projectScope";
import TasksList from "../components/tasksList";
import Headline from "@/components/reusables/components/headline";
import { useProjectContext } from "@/context/ProjectProvider";
import { useRouter } from "next/navigation";

export default function AssetsAndScope() {
  const router = useRouter();
  const { selectedProject } = useProjectContext();

  // console.log(selectedProjectDetails);

  // const chartData =
  //   selectedProjectDetails?.developmentDetails?.projectHours?.map((entry) => ({
  //     parameter: entry.date.toISOString().slice(0, 10),
  //     hours: entry.totalHours,
  //   }));

  const headLineButtons = [
    {
      buttonText: "Export Scope",
      onNeedIcon: false,
      onClick: () => console.log("Export Scope"),
    },
  ];
  if (!selectedProject._id) router.push("/c/all-projects");

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Assets & Scope"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />
      <div className="w-full flex flex-row gap-4 ">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <ProjectReportCard
            report={dashboardProjectReport}
            totalTasks={100}
            role={ROLE}
          />

          {/* <HoursCountCard
            totalHours={
              selectedProjectDetails?.developmentDetails?.projectHours?.reduce(
                (acc, entry) => acc + entry.totalHours,
                0
              ) || 0
            }
            data={chartData || []}
            role={ROLE} // Replace with actual role
          /> */}

          <HoursCountCard
            totalHours={100}
            data={dashbordHoursCount}
            role={ROLE}
          />
        </div>
      </div>
      <ProjectScope />
      <FilesList role={ROLE} />
      <TasksList role={ROLE} />
    </MainContainer>
  );
}
