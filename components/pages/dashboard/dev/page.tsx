"use client";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { dashbordHoursCount, ROLE } from "@/tempData";
import Deployment from "../components/deployment";
import Figma from "../components/figma";
// import Headline from "./components/headline";
import Headline from "@/components/reusables/components/headline";
import MidInformationCard from "../components/midInformationCard";
import axios from "axios";
import ProjectInfo from "../components/projectInfo";
import {
  WorkStatusLoggedIn,
  WorkStatusNotLoggedIn,
  WorkStatusOnBreak,
} from "../components/WorkStatus";
import YourPerformanceSpendHour from "@/components/reusables/components/YourPerformanceSpendHour";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types";
import { useEffect } from "react";
import { useProjectContext } from "@/context/ProjectProvider";
import ProjectCompletion from "@/components/icons/ProjectCompletion";
import WorkingTeamCount from "@/components/icons/WorkingTeamCount";
import Deadline from "@/components/icons/Deadline";
import { formatDateString } from "@/lib/utils";
import YourTasks from "../components/YourTasks";

export default function HomePage() {
  const {data: session} = useSession();
  const user = session?.user as CustomUser;

  const { selectedProjectDetails } = useProjectContext();

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ];

  useEffect(() => {
    if (user?.loginStep === 1) {
      console.log("User", user);
      const fetchData = async () => {
      const response = await axios.get('/api/wakaTime/get_current_user', {
        params: { accessToken: user.wakaTime?.access_token },
      });
      console.log("response data: ",response.data);
    }
    fetchData();
    }
  }, [user]);

  const midCardData = [
    {
      title: "Project Completion",
      icon: ProjectCompletion ,
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



  const list = [
    {task: "Create Navigation pane for categories" },
    {task: "Create Navigation pane for categories" },
  ]
  
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

      <div className="w-full flex flex-row gap-4">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          {/* <ProjectReportCard
            report={dashboardProjectReport}
            totalTasks={100}
            role={ROLE}
            title="gh"
            subTitleTotal="Total Tasks"
          /> */}

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

          {/* <HoursCountCard
            totalHours={100}
            data={dashbordHoursCount}
            role={ROLE}
          /> */}
        </div>
      </div>

      <MidInformationCard  midCardData={midCardData} />
      <div className="flex flex-row gap-4">
        <YourTasks list={list}  title="Your Current Tasks"/>
        <YourTasks list={list}  title="Your Completed Tasks"/>
      </div>

      {selectedProjectDetails?.developmentDetails?.figmaLink ?.link && (
        <Figma
          link={selectedProjectDetails?.developmentDetails?.figmaLink?.link}
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
