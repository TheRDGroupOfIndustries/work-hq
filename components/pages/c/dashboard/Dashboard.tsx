"use client";

import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import Deployment from "./components/deployment";
import Figma from "./components/figma";
import MidInformationCard from "./components/midInformationCard";
import ProjectInfo from "./components/projectInfo";
import Headline from "@/components/reusables/components/headline";
import { useProjectContext } from "@/context/ProjectProvider";

export default function Dashboard() {
  const { selectedProjectDetails } = useProjectContext();
  console.log(selectedProjectDetails);

  const chartData =
    selectedProjectDetails?.developmentDetails?.projectHours?.map((entry) => ({
      parameter: entry.date.toISOString().slice(0, 10),
      hours: entry.totalHours,
    }));

  const headLineButtons = [
    {
      buttonText: "Export Report",
      lightGrayColor: false,
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ];

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <div className="w-full flex flex-row gap-4 ">
        <div className="w-full flex flex-col xl:flex-row gap-10 overflow-hidden">
          <ProjectReportCard
            report={dashboardProjectReport}
            totalTasks={100}
            role={ROLE}
          />

          <HoursCountCard
            totalHours={
              selectedProjectDetails?.developmentDetails?.projectHours?.reduce(
                (acc, entry) => acc + entry.totalHours,
                0
              ) || 0
            }
            data={chartData || []}
            role={ROLE} // Replace with actual role
          />

          <HoursCountCard
            totalHours={100}
            data={dashbordHoursCount}
            role={ROLE}
          />
        </div>
      </div>

      <MidInformationCard />

      <Figma role={ROLE} />

      <Deployment role={ROLE} />

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}
