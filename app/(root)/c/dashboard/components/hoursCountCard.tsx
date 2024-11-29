"use client";
import MidSizeCard from "@/components/reusables/midSizeCard";
import { ChevronDown } from "lucide-react";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
  import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";


export default function HoursCountCard() {
  return (
    <MidSizeCard className="h-fit xl:h-[400px] ">
      <div className="w-full h-full flex flex-col gap-2 py-5">
        <div className=" flex flex-row items-center justify-between px-5">
          <div className=" flex flex-col">
            <h2 className="text-xl font-semibold">Project Hours Count</h2>
            <p className="text-[#6A6A6A] text-base font-normal">
              Total Hours - 94
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <button className=" flex flex-row items-center py-1 px-4 gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl">
              7 days <ChevronDown />
            </button>
          </div>
        </div>

        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>

        <div className=" w-full  h-full flex flex-col justify-center overflow-hidden pr-4">
          <Chart/>
        </div>
      </div>
    </MidSizeCard>
  );
}

const chartData = [
    { weeks: "MON", desktop: 4860 },
    { weeks: "TUE", desktop: 805 },
    { weeks: "WED", desktop: 1150 },
    { weeks: "THU", desktop: 980 },
    { weeks: "FRI", desktop: 2000 },
    { weeks: "SAT", desktop: 3000 },
    { weeks: "SUN", desktop: 2000 },
  ];
  
  const chartConfig = {
    desktop: {
      label: "Hours",
      color: "blue",
    },
  } satisfies ChartConfig;
  
 function Chart() {
    return (
      <ChartContainer className="w-full 2xl:h-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            // left: 12,
            right: 12,
          }}
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="fillDesktop" x1="1" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbfbfb" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#1500ff" stopOpacity={0.8} />
            </linearGradient>
          </defs>
  
          {/* Axes and Grid */}
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="weeks"
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
            dataKey="desktop"
            type="linear"
            fill="url(#fillDesktop)"
            fillOpacity={0.8}
            stroke="var(--color-desktop)"
            stackId="a"
          />
  
          {/* Line Chart */}
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="#4A3AFF"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
    );
  }
