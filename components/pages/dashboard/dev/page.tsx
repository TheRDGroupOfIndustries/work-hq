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
import axios from "axios";
import ProjectInfo from "../components/projectInfo";
import {
  WorkStatusLoggedIn,
  WorkStatusNotLoggedIn,
  WorkStatusOnBreak,
} from "../components/WorkStatus";
import YourPerformanceSpendHour from "@/components/reusables/components/YourPerformanceSpendHour";
import { YourCompletedTasks, YourCurrentTasks } from "../components/YourTasks";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types";
import { useEffect } from "react";

export default function HomePage() {
  const {data: session} = useSession();
  const user = session?.user as CustomUser;
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
