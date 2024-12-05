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

export default function HomePage() {
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
        <div className="w-full  flex flex-col xl:flex-row gap-10">
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

      <Figma role={ROLE} />

      <Deployment role={ROLE} />

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}
