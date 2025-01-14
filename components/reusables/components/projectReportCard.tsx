"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Role, VENDOR } from "@/types";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import MidSizeCard from "../wrapper/midSizeCard";

export interface TaskStatusReport {
  completed: number;
  inProgress: number;
  pending: number;
  refactoring: number;
  maintenance?: number;
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

export default function ProjectReportCard({
  report,
  totalTasks,
  title,
  role,
  subTitleTotal,
}: {
  report: TaskStatusReport;
  role: Role;
  totalTasks?: string | number;
  title: string;
  subTitleTotal: string;
}) {
  const [total, setTotal] = useState<string | number>(totalTasks || 0);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (role === VENDOR) {
      setIsVendor(true);
    }
  }, [role]);

  useEffect(() => {
    if (typeof totalTasks === "undefined" || isNaN(Number(totalTasks))) {
      const calculatedTotal =
        report.completed + report.inProgress + report.pending +(report.refactoring ?? 0);
      setTotal(calculatedTotal);
    } else {
      setTotal(totalTasks);
    }
  }, [totalTasks, report]);
  return (
    <MidSizeCard className="h-fit">
      <div className="w-full h-full flex flex-col gap-2 p-5">
        <Title totalTasks={total} title={title} subTitleTotal={subTitleTotal} />
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

export function Chart({
  report,
  isVendor,
}: {
  report: TaskStatusReport;
  isVendor: boolean;
}) {
  const chartData = [
    {
      status: "Completed",
      noOfTasks: report?.completed || 0,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-1)"
          : "var(--pie-chart-color-1)"
      }`,
    },
    {
      status: "On going",
      noOfTasks: report?.inProgress || 0,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-2)"
          : "var(--pie-chart-color-2)"
      }`,
    },
    {
      status: "Pending",
      noOfTasks: report?.pending || 0,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-3)"
          : "var(--pie-chart-color-3)"
      }`,
    },
    {
      status: "Refactoring",
      noOfTasks: report?.refactoring || 0,
      fill: `${
        isVendor
          ? "var(--vendor-pie-chart-color-4)"
          : "var(--pie-chart-color-4)"
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

function Title({
  title,
  subTitleTotal,
}: {
  totalTasks?: string | number;
  title: string;
  subTitleTotal: string;
}) {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-light-gray text-sm font-normal">{subTitleTotal}</p>
    </div>
  );
}
function SideBar({
  report,
  isVendor,
}: {
  report: TaskStatusReport;
  isVendor: boolean;
}) {
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
          <div className="">Completed</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report?.completed || 0}
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
          <div className="">On going</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report?.inProgress || 0}
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
          <div className="">Pending</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report?.pending || 0}
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
          <div className="">Refactoring</div>
        </div>
        <div className="flex flex-row text-[#615E83] items-center">
          {report?.refactoring || 0}
        </div>
      </div>
    </div>
  );
}
