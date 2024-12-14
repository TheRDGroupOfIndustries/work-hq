"use client";
import MidSizeCard from "@/components/reusables/wrapper/midSizeCard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Pie, PieChart } from "recharts";


interface Report {
    fullstack: number,
    frontend: number,
    backend: number,
    appDev: number,
    uiux: number,
    dev3d: number,
}

const chartConfig = {
  Completed: {
    label: "Completed",
  },
  safari: {
    label: "Safari",
  },
  firefox: {
    label: "Firefox",
  },
  edge: {
    label: "Edge",
  },
} satisfies ChartConfig;

export default function EmployeesSummary() {
  const [isVendor] = useState(false);

  

   const report = {
    fullstack: 22,
    frontend: 44,
    backend: 55,
    appDev: 2,
    uiux: 45,
    dev3d: 5,

  };

  
  return (
    <MidSizeCard className="h-fit">
      <div className="w-full h-full flex flex-col gap-2 p-5">
        <Title/>
        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>
        <div className="w-full h-full flex flex-row items-center">
          <div className=" w-full sm:w-1/2  min-w-[280px] flex flex-col gap-2 h-full items-center justify-center">
            <Chart report={report} isVendor={isVendor} />
          </div>
          <div className=" hidden sm:flex sm:w-1/2   flex-col gap-2 h-full items-center justify-center mr-8  ">
            <SideBar report={report} isVendor={isVendor} />
          </div>
        </div>
      </div>
    </MidSizeCard>
  );
}

 function Chart({
  report,
  isVendor,
}: {
  report: Report;
  isVendor: boolean;
}) {
  const chartData = [
    {
      status: "Full Stack",
      noOfTasks: report.fullstack,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-1)"
          : "var(--pie-chart-color-1)"
      }`,
    },
    {
      status: "Frontend",
      noOfTasks: report.frontend,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-2)"
          : "var(--pie-chart-color-2)"
      }`,
    },
    {
      status: "Backend",
      noOfTasks: report.backend,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-3)"
          : "var(--pie-chart-color-3)"
      }`,
    },
    {
      status: "App Dev",
      noOfTasks: report.appDev,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-4)"
          : "var(--pie-chart-color-4)"
      }`,
    },
    {
        status: "UI UX",
        noOfTasks: report.uiux,
        fill: `${
          isVendor
            ? "var(--vendor-pie-chart-color-4)"
            : "#5D77D2"
        }`,
      },
      {
        status: "3D Dev",
        noOfTasks: report.dev3d,
        fill: `${
          isVendor
            ? "var(--vendor-pie-chart-color-4)"
            : "#0025AB"
        }`,
      },
  ];
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[200px] w-[200px] "
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={chartData} dataKey="noOfTasks" nameKey="status" />
      </PieChart>
    </ChartContainer>
  );
}

function Title() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-lg text-dark-gray font-semibold">Employees Summary</h2>
      <p className="text-light-gray text-sm font-normal">
        Position distribution chart
      </p>
    </div>
  );
}
function SideBar({ report, isVendor }: { report: Report; isVendor: boolean }) {
  return (
    <div className="text-base flex flex-col font-medium  w-full ">
      <div className="flex flex-row   items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-1)]"
                : "bg-[var(--pie-chart-color-1)]"
            }`}
          >
            {""}
          </div>
          <div className="">Full Stack</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.fullstack}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-2)]"
                : "bg-[var(--pie-chart-color-2)]"
            }`}
          >
            {""}
          </div>
          <div className="">Frontend</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.frontend}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-3)]"
                : "bg-[var(--pie-chart-color-3)]"
            }`}
          >
            {""}
          </div>
          <div className="">Backend</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.backend}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-4)]"
                : "bg-[var(--pie-chart-color-4)]"
            }`}
          >
            {""}
          </div>
          <div className="">App Dev</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.appDev}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-4)]"
                : "bg-[#5D77D2]"
            }`}
          >
            {""}
          </div>
          <div className="">UI UX</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.uiux}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center gap-5">
          <div
            className={`h-4 w-4 rounded-full ${
              isVendor
                ? "bg-[var(--vendor-pie-chart-color-4)]"
                : "bg-[#0025AB]"
            }`}
          >
            {""}
          </div>
          <div className="">3D Dev</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report.dev3d}
        </div>
      </div>
    </div>
  );
}
