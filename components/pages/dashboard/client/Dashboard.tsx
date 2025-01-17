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
import { Role } from "@/types";
import { useEffect } from "react";
import axios from "axios";

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
      { completed: 0, inProgress: 0, pending: 0, refactoring: 0 }
    );

  const totalTasks = selectedProjectTasks?.length || 0;

  const currentTask = selectedProjectTasks
    ?.filter(
      (task) => task?.status === "inProgress" || task?.status !== "pending"
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

  const completedProjectTasks =
    selectedProjectTasks?.filter((task) => task.status === "completed")
      .length ?? 0;
  const percentage = selectedProjectTasks?.length
    ? Math.round((completedProjectTasks / selectedProjectTasks.length) * 100)
    : 0;

  const midCardData = [
    {
      title: "Project Completion",
      icon: ProjectCompletion,
      data: `${percentage}%`,
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

  useEffect(() => {
    if (user?.role === 'developer' && user?.loginStep === 1) {
      console.log("User", user);
      const fetchData = async () => {
      const response = await axios.get('/api/wakaTime/get-weekly-working-hours', {
        params: { accessToken: user.wakaTime?.access_token },
      });
      console.log("response data: ",response.data);
    }
    fetchData();
    }
  }, [user]);


  

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
      <div className="w-full flex flex-row justify-between gap-4">
        <div className="w-full flex flex-col xl:flex-row justify-between gap-10">
          {taskStatusReport ? (
            <ProjectReportCard
              report={taskStatusReport}
              totalTasks={totalTasks}
              role={ROLE}
              title="Progress tasks Report"
              subTitleTotal={`Total tasks: ${totalTasks}`}
            />
          ) : (
            <div className="text-center text-gray-500 shadow-neuro-3 p-4 rounded-3xl">
              No task status data available
            </div>
          )}
          {chartData && chartData.length > 0 ? (
            <HoursCountCard
              totalHours={
                selectedProjectDetails?.developmentDetails?.projectHours?.reduce(
                  (acc, entry) => acc + entry.totalHours,
                  0
                ) || 0
              }
              data={chartData}
              role={ROLE}
            />
          ) : (
            <div className="text-center text-gray-500 shadow-neuro-3 p-4 rounded-3xl">
              No chart data available
            </div>
          )}
        </div>
      </div>

      <MidInformationCard midCardData={midCardData} />

      {user?.role === "developer" && (
        <div className="flex flex-row gap-4">
          <YourTasks list={currentTask} title="Your Current Tasks" />

          <YourTasks list={completedTasks} title="Your Completed Tasks" />
        </div>
      )}

        <Figma
          link={selectedProjectDetails?.developmentDetails?.figmaLink?.link}
          role={user?.role as Role}
        />

        <Deployment
          link={selectedProjectDetails?.developmentDetails?.deployment?.link}
          role={user?.role as Role}
        />

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}

// const list = [
//   { task: "Create Navigation pane for categories" },
//   { task: "Create Navigation pane for categories" },
// ];
