import MainContainer from "@/components/reusables/mainContainer";

import HoursCountCard from "../dashboard/components/hoursCountCard";
import ProjectReportCard from "../dashboard/components/projectReportCard";
import FilesList from "./components/filesList";
import Headline from "./components/headline";
import ProjectScope from "./components/projectScope";
import TasksList from "./components/tasksList";

export default function AssetsAndScope() {
  return (
    <MainContainer>
      <Headline />
      <div className="w-full flex flex-row gap-4 mt-5">
        <div className="w-full flex flex-col xl:flex-row gap-10">
          <ProjectReportCard />
          <HoursCountCard />
        </div>
      </div>
      <ProjectScope />
      <FilesList />
      <TasksList/>
    </MainContainer>
  );
}
