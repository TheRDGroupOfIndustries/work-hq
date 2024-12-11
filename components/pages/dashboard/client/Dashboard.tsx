"use client";

import { useSession } from "next-auth/react";
import { useProjectContext } from "@/context/ProjectProvider";
import { formatDateString } from "@/lib/utils";
import { CustomUser } from "@/lib/types";
import { dashbordHoursCount, ROLE } from "@/tempData";
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
import ProjectCompletion from "@/components/icons/ProjectCompletion";
import WorkingTeamCount from "@/components/icons/WorkingTeamCount";
import Deadline from "@/components/icons/Deadline";
import YourPerformanceSpendHour from "@/components/reusables/components/YourPerformanceSpendHour";
import DevWorkStatus from "../components/DevWorkStatus";
import YourTasks from "../components/YourTasks";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

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

  const currentTask = selectedProjectTasks
    ?.filter(
      (task) => task?.status !== "completed" && task?.status !== "cancelled"
    )
    .map((task) => ({ task: task?.issueSubject }));

  const completedTasks = selectedProjectTasks
    ?.filter((task) => task?.status === "completed")
    .map((task) => ({ task: task?.issueSubject }));

  const chartData =
    selectedProjectDetails?.developmentDetails?.projectHours?.map((entry) => ({
      parameter: entry.date.toISOString().slice(0, 10),
      hours: entry.totalHours,
    }));

  const midCardData = [
    {
      title: "Project Completion",
      icon: ProjectCompletion,
      data: "58%",
    },
    {
      title: "Working Team Count",
      icon: WorkingTeamCount,
      data: selectedProjectDetails?.developmentDetails?.teams?.length ?? 0,
    },
    {
      title: "Expected deadline",
      icon: Deadline,
      data: selectedProjectDetails?.projectDetails?.deadline
        ? formatDateString(
            selectedProjectDetails?.projectDetails?.deadline.toString()
          )
        : "No deadline set",
      day: selectedProjectDetails?.projectDetails?.deadline
        ? new Date(
            selectedProjectDetails?.projectDetails?.deadline
          ).toLocaleString("en-US", { weekday: "long" })
        : "",
    },
  ];
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

      {user?.role === "developer" && (
        <>
          <DevWorkStatus />

          <YourPerformanceSpendHour
            totalHours={100}
            data={dashbordHoursCount}
            role={ROLE}
          />
        </>
      )}
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

      <MidInformationCard midCardData={midCardData} />

      {user?.role === "developer" && (
        <div className="flex flex-row gap-4">
          <YourTasks list={currentTask} title="Your Current Tasks" />
          <YourTasks list={completedTasks} title="Your Completed Tasks" />
        </div>
      )}

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

// const list = [
//   { task: "Create Navigation pane for categories" },
//   { task: "Create Navigation pane for categories" },
// ];
