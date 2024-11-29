import Deadline from "@/components/icons/Deadline";
import ProjectCompletion from "@/components/icons/ProjectCompletion";
import WorkingTeamCount from "@/components/icons/WorkingTeamCount";
import Container from "@/components/reusables/Container";

const midCardData = [
  {
    title: "Project Completion",
    icon: Deadline,
    data: "58%",
  },
  {
    title: "Working Team Count",
    icon: Deadline,
    data: "04",
  },
  {
    title: "Expected deadline",
    icon: Deadline,
    data: "20th july, 2024",
    data1: "Saturday",
  },
];

export default function MidInformationCard() {
  return (
    <>
      <Container className=" hidden md:block   ">
        <div className="w-full  h-[150px] flex flex-row items-center text-nowrap">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[0].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <ProjectCompletion />
              </div>
              <div className=" font-semibold text-5xl">
                {midCardData[0].data}
              </div>
            </div>
          </div>

          <div className="min-w-[10px]  rounded-full h-full bg-[#344054]"></div>

          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[1].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <WorkingTeamCount />
              </div>
              <div className=" font-semibold text-5xl">
                {midCardData[1].data}
              </div>
            </div>
          </div>

          <div className="min-w-[10px] hidden lg:block rounded-full h-full bg-[#344054]"></div>

          <div className="w-full h-full hidden lg:flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[2].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <Deadline />
              </div>
              <div className=" font-semibold text-xl flex flex-col">
                {midCardData[2].data} <span>{midCardData[2].data1}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className=" md:hidden ">
        <div className="w-full  h-[150px] flex flex-row items-center">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[0].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <ProjectCompletion />
              </div>
              <div className=" font-semibold text-5xl flex flex-col">
                {midCardData[0].data}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className=" md:hidden ">
        <div className="w-full  h-[150px] flex flex-row items-center">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[1].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <WorkingTeamCount />
              </div>
              <div className=" font-semibold text-5xl flex flex-col">
                {midCardData[1].data}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className=" lg:hidden ">
        <div className="w-full  h-[150px] flex flex-row items-center">
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
            <h4 className="text-lg uppercase font-semibold">
              {midCardData[2].title}
            </h4>
            <div className=" flex flex-row items-center justify-center gap-10">
              <div className="h-[65px] w-[65px] ">
                <Deadline />
              </div>
              <div className=" font-semibold text-lg flex flex-col">
                {midCardData[2].data}
                <span>{midCardData[2].data1}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
