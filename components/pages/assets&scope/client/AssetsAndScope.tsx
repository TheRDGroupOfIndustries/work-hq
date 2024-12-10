"use client";

import { ROLE } from "@/tempData";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard, {
  TaskStatusReport,
} from "@/components/reusables/components/projectReportCard";
import FilesList from "../components/filesList";
import ProjectScope from "../components/projectScope";
import TasksList from "../components/tasksList";
import Headline from "@/components/reusables/components/headline";
import { useProjectContext } from "@/context/ProjectProvider";

export default function AssetsAndScope() {
  const { selectedProjectDetails, selectedProjectTasks } = useProjectContext();
  // console.log(selectedProjectDetails);

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
      buttonText: "Export Scope",
      onNeedIcon: false,
      onClick: () => console.log("Export Scope"),
    },
  ];

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
      <ProjectScope />
      <FilesList role={ROLE} />
      <TasksList tasks={selectedProjectTasks} role={ROLE} />
    </MainContainer>
  );
}
