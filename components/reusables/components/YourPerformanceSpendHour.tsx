"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Role, VENDOR } from "@/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";
interface Data {
  parameter: string;
  hours: number;
}
export default function YourPerformanceSpendHour({
  totalHours,
  data,
  role,
}: {
  totalHours: string | number;
  data: Data[];
  role: Role;
}) {
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (role === VENDOR) {
      setIsVendor(true);
    }
  }, [role]);
  return (
    <div className="rounded-xl shadow-neuro-1 h-[400px] flex flex-row items-center justify-center mt-5 mb-5">
      <div className="w-full h-full flex flex-col gap-2 py-5">
        <Title totalHours={totalHours} />

        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>

        <div className=" w-full  h-full flex flex-col justify-center overflow-hidden pr-4">
          <Chart data={data} isVendor={isVendor} />
        </div>
      </div>
    </div>
  );
}

function Chart({ data, isVendor }: { data: Data[]; isVendor: boolean }) {
  const chartConfig = {
    hours: {
      label: "Hours",
      // color: isVendor ? "var(--vendor-dark)" : "var(--primary-blue)",
      color: isVendor ? "#360227" : "#001D6C",
    },
  } satisfies ChartConfig;

  // const chartData = [
  //   { parameter: "MON", hours: 4860 },
  //   { parameter: "TUE", hours: 805 },
  //   { parameter: "WED", hours: 1150 },
  //   { parameter: "THU", hours: 980 },
  //   { parameter: "FRI", hours: 2000 },
  //   { parameter: "SAT", hours: 3000 },
  //   { parameter: "SUN", hours: 2000 },
  // ];
  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          // left: 12,
          right: 12,
        }}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="fillDesktop" x1="1" y1="1" x2="1" y2="0">
            <stop
              offset="0%"
              // stopColor={`${
              //   !isVendor
              //     ? "var-(--pie-chart-color-4)"
              //     : "var(--vendor-pie-chart-color-4)"
              // }`}

              stopColor={`${isVendor ? "#FFB7EA" : "#C6D2FD"}`}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              // stopColor={`${
              //   !isVendor
              //     ? "var-(--pie-chart-color-1)"
              //     : "var(--vendor-pie-chart-color-1)"
              // }`}

              stopColor={`${isVendor ? "#7E065C" : "#4A3AFF"}`}
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>

        {/* Axes and Grid */}
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="parameter"
          tickLine={true}
          axisLine={true}
          tickMargin={8}
          tickCount={3}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={0} tickCount={8} />

        {/* Tooltip */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        {/* Area Chart with Gradient */}

        <Area
          dataKey="hours"
          type="linear"
          fill="url(#fillDesktop)"
          fillOpacity={0.8}
          stroke={`${isVendor ? "#360227" : "#001D6C"}`}
          stackId="a"
        />

        {/* Line Chart */}
        <Line
          dataKey="hours"
          type="monotone"
          // stroke={`${isVendor ? "#360227" : "#001D6C"}`}
          stroke="#001D6C"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

function Title({ totalHours }: { totalHours?: string | number }) {
  return (
    <div className=" flex flex-row items-center justify-between px-5">
      <div className=" flex flex-col">
        <h2 className="text-lg font-semibold">
          {"Your Performance (Spend Hours)"}
        </h2>
        <p className="text-light-gray text-sm font-normal">{`Total Hours - ${totalHours}`}</p>
      </div>

      <div className="flex flex-row gap-2">
        <button className="text-base flex flex-row items-center py-2 px-4 gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] text-light-gray rounded-xl">
          7 days <ChevronDown color="var(--light-gray)" />
        </button>
      </div>
    </div>
  );
}
