"use client";
import MidSizeCard from "@/components/reusables/midSizeCard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartData = [
  { browser: "Completed", visitors: 56, fill: "#4A3AFF" },
  { browser: "safari", visitors: 12, fill: "#2D5BFF" },
  { browser: "firefox", visitors: 12, fill: "#93AAFD" },
  { browser: "edge", visitors: 3, fill: "#C6D2FD" },
];

const chartConfig = {
  Completed: {
    label: "Completed",
    color: "#4A3AFF",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function ProjectReportCard() {
  return (
    <MidSizeCard>
      <div className="w-full h-full flex flex-col gap-2 p-5">
        <div className="w-full flex flex-col">
          <h2 className="text-xl font-semibold">Project Tasks Report</h2>
          <p className="text-[#6A6A6A] text-base font-normal">
            Total Tasks - 94
          </p>
        </div>
        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>

        <div className="w-full h-full flex flex-row">
          <div className=" w-full sm:w-1/2  min-w-[280px] flex flex-col gap-2 h-full items-center justify-center">
            <Chart/>
          </div>
          <div className=" hidden sm:flex sm:w-1/2   flex-col gap-2 h-full items-center justify-center  ">
            <div className=" flex flex-col font-medium text-lg w-full ">
              <div className="flex flex-row  items-center justify-between ">
                <div className="flex flex-row items-center gap-5">
                  <div className="h-4 w-4 rounded-full bg-[#4A3AFF]"></div>
                  <div className="">Completed</div>
                </div>
                <div className="flex flex-row text-[#615E83] items-center">
                  56
                </div>
              </div>

              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-5">
                  <div className="h-4 w-4 rounded-full bg-[#2D5BFF]"></div>
                  <div className="">On going</div>
                </div>
                <div className="flex flex-row text-[#615E83] items-center">
                  12
                </div>
              </div>

              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-5">
                  <div className="h-4 w-4 rounded-full bg-[#93AAFD]"></div>
                  <div className="">Pending</div>
                </div>
                <div className="flex flex-row text-[#615E83] items-center">
                  12
                </div>
              </div>

              <div className="flex flex-row items-center justify-between ">
                <div className="flex flex-row items-center gap-5">
                  <div className="h-4 w-4 rounded-full bg-[#C6D2FD]"></div>
                  <div className="">Refactoring</div>
                </div>
                <div className="flex flex-row text-[#615E83] items-center">
                  03
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MidSizeCard>
  );
}



export function Chart() {
    return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full "
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    );
  }