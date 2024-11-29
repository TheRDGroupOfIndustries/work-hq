import MainContainer from "@/components/reusables/mainContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HoursCountCard from "../../../../components/reusables/hoursCountCard";
import ProjectReportCard from "../../../../components/reusables/projectReportCard";
import Deployment from "./components/deployment";
import Figma from "./components/figma";
import Headline from "./components/headline";
import MidInformationCard from "./components/midInformationCard";
import ProjectInfo from "./components/projectInfo";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  return (
    <MainContainer>
      <Headline />

      <div className="w-full flex flex-row gap-4 mt-5">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <ProjectReportCard />

          <HoursCountCard />
        </div>
      </div>

      <MidInformationCard />

      <Figma />

      <Deployment />

      <ProjectInfo />
    </MainContainer>
  );
}
