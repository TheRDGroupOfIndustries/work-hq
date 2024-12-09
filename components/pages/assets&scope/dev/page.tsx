'use client';

import MainContainer from "@/components/reusables/wrapper/mainContainer";

import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import FilesList from "./../components/filesList";
import ProjectScope from "./../components/projectScope";
import TasksList from "./../components/tasksList";
import Headline from "@/components/reusables/components/headline";

export default function AssetsAndScope() {
  const headLineButtons = [
    { buttonText: "Export Scope", onNeedIcon: false, onClick: () => console.log("Export Scope") },
  ];
  return (
    <MainContainer>
      <Headline role={ROLE} title="Assets & Scope" subTitle="Project" buttonObjects={headLineButtons} />
      <div className="w-full flex flex-row gap-4 ">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <ProjectReportCard
            report={dashboardProjectReport}
            totalTasks={100}
            role={ROLE}
          />

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
