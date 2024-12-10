"use client";

import { useProjectContext } from "@/context/ProjectProvider";
import { ROLE } from "@/tempData";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import ProjectReportCard, {
  TaskStatusReport,
} from "@/components/reusables/components/projectReportCard";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import Deployment from "../components/deployment";
import Figma from "../components/figma";
import MidInformationCard from "../components/midInformationCard";
import ProjectInfo from "../components/projectInfo";

export default function Dashboard() {
  const { selectedProjectDetails, selectedProjectTasks } = useProjectContext();

  const taskStatusReport: TaskStatusReport | undefined =
    selectedProjectTasks?.reduce<TaskStatusReport>(
      (acc, task) => {
        acc[task?.status as keyof TaskStatusReport] =
          (acc[task?.status as keyof TaskStatusReport] || 0) + 1;
        return acc;
      },
      { completed: 0, onGoing: 0, pending: 0, refactoring: 0 }
    );

  const totalTasks = selectedProjectTasks?.length || 0;

  const chartData =
    selectedProjectDetails?.developmentDetails?.projectHours?.map((entry) => ({
      parameter: entry.date.toISOString().slice(0, 10),
      hours: entry.totalHours,
    }));

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <div className="w-full flex flex-row gap-4">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <ProjectReportCard
            report={taskStatusReport}
            totalTasks={totalTasks}
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

          {/* <ProjectReportCard
                  report={dashboardProjectReport}
                  totalTasks={totalTasks}
                  // totalTasks={100}
                  role={ROLE}
                />
          <HoursCountCard
            totalHours={100}
            data={dashbordHoursCount}
            role={ROLE}
          /> */}
        </div>
      </div>

      <MidInformationCard />

      {selectedProjectDetails?.developmentDetails?.figma?.link && (
        <Figma
          link={selectedProjectDetails?.developmentDetails?.figma?.link}
          role={ROLE}
        />
      )}

      {selectedProjectDetails?.developmentDetails?.deployment?.link && (
        <Deployment
          link={selectedProjectDetails?.developmentDetails?.deployment?.link}
          role={ROLE}
        />
      )}

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}
