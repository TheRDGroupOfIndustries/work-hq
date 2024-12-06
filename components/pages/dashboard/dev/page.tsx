"use client";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import Deployment from "../components/deployment";
import Figma from "../components/figma";
// import Headline from "./components/headline";
import Headline from "@/components/reusables/components/headline";
import MidInformationCard from "../components/midInformationCard";
import ProjectInfo from "../components/projectInfo";
import {
  WorkStatusLoggedIn,
  WorkStatusNotLoggedIn,
  WorkStatusOnBreak,
} from "../components/WorkStatus";
import YourPerformanceSpendHour from "@/components/reusables/components/YourPerformanceSpendHour";
import { YourCompletedTasks, YourCurrentTasks } from "../components/YourTasks";

export default function HomePage() {
  const headLineButtons = [
    {
      buttonText: "Export Report",
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

      <WorkStatusNotLoggedIn />

      <WorkStatusLoggedIn />
      <WorkStatusOnBreak />

      <YourPerformanceSpendHour totalHours={100} data={dashbordHoursCount} role={ROLE} />

      <div className="w-full flex flex-row gap-4 mt-4 ">
        <div className="w-full  flex flex-col xl:flex-row gap-4">
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

      <MidInformationCard />

      <div className="w-full flex flex-row gap-4 mt-4 ">
        <div className="w-full  flex flex-col xl:flex-row gap-4">
          

          <YourCompletedTasks/>
          <YourCurrentTasks/>
          
        </div>
      </div>

      <Figma role={ROLE} />

      <Deployment role={ROLE} />

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}
