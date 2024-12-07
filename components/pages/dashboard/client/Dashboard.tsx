"use client";

import { useProjectContext } from "@/context/ProjectProvider";
import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import Deployment from "../components/deployment";
import Figma from "../components/figma";
// import Headline from "./components/headline";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import MidInformationCard from "../components/midInformationCard";
import ProjectInfo from "../components/projectInfo";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { selectedProject, selectedProjectDetails } = useProjectContext();
  const router = useRouter();
  // console.log(selectedProjectDetails);

  // const chartData =
  //   selectedProjectDetails?.developmentDetails?.projectHours?.map((entry) => ({
  //     parameter: entry.date.toISOString().slice(0, 10),
  //     hours: entry.totalHours,
  //   }));

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];

  if (!selectedProject._id) router.push("/c/all-projects");
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
