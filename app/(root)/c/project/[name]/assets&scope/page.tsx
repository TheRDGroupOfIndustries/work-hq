import MainContainer from "@/components/reusables/wrapper/mainContainer";

import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import HoursCountCard from "../../../../../../components/reusables/components/hoursCountCard";
import ProjectReportCard from "../../../../../../components/reusables/components/projectReportCard";
import FilesList from "./components/filesList";
import Headline from "./components/headline";
import ProjectScope from "./components/projectScope";
import TasksList from "./components/tasksList";

export default function AssetsAndScope() {
  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} />
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
