import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { dashboardProjectReport, dashbordHoursCount, ROLE } from "@/tempData";
import HoursCountCard from "@/components/reusables/components/hoursCountCard";
import ProjectReportCard from "@/components/reusables/components/projectReportCard";
import Deployment from "./components/deployment";
import Figma from "./components/figma";
import Headline from "./components/headline";
import MidInformationCard from "./components/midInformationCard";
import ProjectInfo from "./components/projectInfo";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} />

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
