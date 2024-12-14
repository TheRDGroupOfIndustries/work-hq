"use client";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import { Chart } from "@/components/reusables/components/hoursCountCard";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { Label } from "@/components/ui/label";
import { dashbordHoursCount, ROLE } from "@/tempData";
import { Ban, Mail, MessageCircleMore, Phone } from "lucide-react";
import { useState } from "react";
import SalaryHistory from "../../salary/components/SalaryHistory";
import ProjectList from "../components/projectsLIsts";

export default function EmployeProfile() {
  const [performance, setPerformance] = useState(40);
  const [taskCompleted, setTaskCompleted] = useState(30);
  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
    {
      buttonText: "Ban User",
      icon: <Ban size={18} color="#FF3B30" />,
      color: "!text-[#FF3B30]",
      type: "withCustomTextColor",
      onNeedIcon: false,
      onClick: () => console.log("Export Report"),
    },
  ] as ButtonObjectType[];
  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Employee Name"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <Container>
        <div className="w-full h-fit grid grid-cols-[1fr_2fr] p-4">
          <div className="h-full w-full flex flex-col items-center justify-center border-r border-[#9c9c9c] gap-2">
            <div className="w-[140px] h-[140px] rounded-full bg-[#d2d2d2]"></div>
            <h4 className="text-base text-dark-gray">Client</h4>
            <h6 className="text-base text-[#007AFF]">Client@gmail.com</h6>
            <h6 className="text-base ">Fullstack</h6>
            <div className="flex flex-row items-center gap-4 max-h-[100px]">
              <Phone />
              <Mail />
              <MessageCircleMore />
            </div>
          </div>
          <div className="h-full flex flex-col gap-2 items-center justify-center w-full">
            <Line title="Total tasks done" value={11} />
            <Line title="Total tasks pending " value={11} />
            <Line title="Projects Working On" value={11} />
            <Line title="Total Working Hours" value={11} />
            <div className="  w-[70%] flex flex-col gap-4">
              <Label className="text-base">Performance</Label>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/20 ">
                <div
                  className="h-full w-full flex-1 bg-green-600 transition-all"
                  style={{
                    transform: `translateX(-${100 - (performance || 0)}%)`,
                  }}
                ></div>
              </div>

              <span className="self-end">{performance}%</span>
            </div>

            <div className=" w-[70%] flex flex-col gap-4">
              <Label className="text-base">TaskCompleted</Label>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/20 ">
                <div
                  className="h-full w-full flex-1 bg-green-600 transition-all"
                  style={{
                    transform: `translateX(-${100 - (taskCompleted || 0)}%)`,
                  }}
                ></div>
              </div>

              <span className="self-end">{taskCompleted}%</span>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              Here’s insight about Ashri’s Performance
            </h2>
            <h2 className="text-base font-normal">
              This is the summary for empoyee performance based on their daily
              log in
            </h2>
          </div>

          <button className=" font-semibold">View All</button>
        </div>
        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>
        <div className="flex flex-row">
          <Chart data={dashbordHoursCount} isVendor={false} />
          <Chart data={dashbordHoursCount} isVendor={false} />
        </div>
      </Container>


              
      <SalaryHistory payments={[]} />

      <ProjectList list={[]}/>
    </MainContainer>
  );
}

function Line({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="flex flex-row items-center justify-between w-[70%]">
      <h6 className="text-base text-dark-gray">{title}</h6>
      <p className="self-end text-base text-gray-500">{value}</p>
    </div>
  );
}
