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
import MidSizeCard from "@/components/reusables/wrapper/midSizeCard";

export default function Dashboard() {
  const { selectedProjectDetails } = useProjectContext();
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

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Project Overview"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      {/* <div className="w-full flex flex-row gap-4 "> */}
        <div className="w-full flex flex-col xl:flex-row gap-4 ">
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
      {/* </div> */}

      <MidInformationCard />

      {/* {selectedProjectDetails?.developmentDetails?.figma?.link && ( */}
      <Figma
        link={
          selectedProjectDetails?.developmentDetails?.figma?.link ||
          "https://embed.figma.com/design/TMJBtavs0kGJfyuql8d3gG/workHQ?node-id=0-1&embed-host=share"
        }
        role={ROLE}
      />
      {/* )} */}

      {/* {selectedProjectDetails?.developmentDetails?.deployment?.link && ( */}
      <Deployment
        link={
          selectedProjectDetails?.developmentDetails?.deployment?.link ||
          "https://gauravdubey.vercel.app/"
        }
        role={ROLE}
      />
      {/* )} */}

      <ProjectInfo role={ROLE} />
    </MainContainer>
  );
}
