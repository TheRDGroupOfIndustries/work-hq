import Container from "@/components/reusables/wrapper/Container";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dashbordHoursCount } from "@/tempData";
import { Role, VENDOR } from "@/types";
import { TrendingDown, TrendingUp, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts";

interface CardData {
  totalRevenue: {
    value: number;
    percentage: number;
    isUp: boolean;
    exportReport: () => void;
  };
  payrollExpenses: {
    value: number;
    percentage: number;
    isUp: boolean;
    exportReport: () => void;
  };
  totalWorkHours: {
    value: number;
    percentage: number;
    isUp: boolean;
    exportReport: () => void;
  };
}
type SelectedCard = "Total Revenue" | "Payroll Expenses" | "Total Work Hours";

export default function CompanyStatusSummary() {
  const [selectedCard, setSelectedCard] =
    useState<SelectedCard>("Total Revenue");

  const [cardData] = useState({
    totalRevenue: {
      value: 44400,
      percentage: 7.6,
      isUp: true,
      exportReport: () => {},
    },
    payrollExpenses: {
      value: 44400,
      percentage: 7.6,
      isUp: true,
      exportReport: () => {},
    },
    totalWorkHours: {
      value: 44400,
      percentage: 7.6,
      isUp: false,
      exportReport: () => {},
    },
  });
  return (
    <Container>
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Company Status Summary</h2>
        <button className=" font-semibold">View All</button>
      </div>
      <Status
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        cardData={cardData}
      />
      <SpendHour data={dashbordHoursCount} />
      <div className="w-full flex items-center justify-center">
        <span className="text-light-gray text-lg font-semibold uppercase my-1">
          {selectedCard}
        </span>
      </div>
    </Container>
  );
}

export function Status({
  cardData,
  selectedCard,
  setSelectedCard,
}: {
  cardData: CardData;
  selectedCard: SelectedCard;
  setSelectedCard: (card: SelectedCard) => void;
}) {
  return (
    <div className="w-full  grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-4">
        <Container
          onClick={() => {
            setSelectedCard("Total Revenue");
          }}
          className="cursor-pointer"
        >
          <div className="h-fit w-full flex flex-col gap-2">
            <h1 className="text-base text-light-gray font-normal ">
              Total Revenue
            </h1>
            <div className="flex flex-col gap-3  font-normal">
              <StatusCardUPAndDown cardData={cardData.totalRevenue} />
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="flex flex-row text-base items-center w-full">
                <button className="self-end ml-auto mt-1 text-base flex flex-row items-center gap-2 text-primary-blue">
                  <Upload
                    size={16}
                    color="var(--primary-blue)"
                    onClick={() => cardData.totalRevenue.exportReport()}
                  />{" "}
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </Container>
        {selectedCard === "Total Revenue" && (
          <div className="h-[8px] w-[98%] bg-primary-blue mx-auto rounded-full"></div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Container
          onClick={() => {
            setSelectedCard("Payroll Expenses");
          }}
          className="cursor-pointer"
        >
          <div className="h-fit w-full flex flex-col gap-2">
            <h1 className="text-base text-light-gray font-normal ">
              Payroll Expenses
            </h1>
            <div className="flex flex-col gap-3  font-normal">
              <StatusCardUPAndDown cardData={cardData.payrollExpenses} />
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="flex flex-row text-base items-center w-full">
                <button className="self-end ml-auto mt-1 text-base flex flex-row items-center gap-2 text-primary-blue">
                  <Upload
                    onClick={() => cardData.payrollExpenses.exportReport()}
                    size={16}
                    color="var(--primary-blue)"
                  />{" "}
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </Container>
        {selectedCard === "Payroll Expenses" && (
          <div className="h-[8px] w-[98%] bg-primary-blue mx-auto rounded-full"></div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Container
          onClick={() => {
            setSelectedCard("Total Work Hours");
          }}
          className="cursor-pointer"
        >
          <div className="h-fit w-full flex flex-col gap-2">
            <h1 className="text-base text-light-gray font-normal ">
              Total Work Hours
            </h1>
            <div className="flex flex-col gap-3  font-normal">
              <StatusCardUPAndDown cardData={cardData.totalWorkHours} />
              <div className="h-[1px] w-full bg-gray-400"></div>
              <div className="flex flex-row text-base items-center w-full">
                <button className="self-end ml-auto mt-1 text-base flex flex-row items-center gap-2 text-primary-blue">
                  <Upload
                    onClick={() => cardData.totalWorkHours.exportReport()}
                    size={16}
                    color="var(--primary-blue)"
                  />{" "}
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </Container>
        {selectedCard === "Total Work Hours" && (
          <div className="h-[8px] w-[98%] bg-primary-blue mx-auto rounded-full"></div>
        )}
      </div>
    </div>
  );
}

function StatusCardUPAndDown({
  cardData,
}: {
  cardData: {
    value: number;
    percentage: number;
    isUp: boolean;
  };
}) {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  }
  return (
    <div className="flex flex-row text-base items-center w-full justify-between h-full">
      <span className={`text-dark-gray font-bold text-3xl `}>
      {formatValue(cardData.value)}
      </span>
      <div
        className={` h-[30px] w-[80px] ${
          cardData.isUp ? "text-[#067647]" : "text-[#B42318]"
        } border ${
          cardData.isUp ? "border-[#06764780]" : "border-[#B4231880]"
        } bg-[#DDFFEA] text-sm rounded-md flex flex-row items-center justify-center gap-1 `}
      >
        {cardData.isUp ? (
          <TrendingUp size={18} color="#067647" />
        ) : (
          <TrendingDown size={18} color="#B42318" />
        )}{" "}
        {`${cardData.isUp ? cardData.percentage : -cardData.percentage}%`}
      </div>
    </div>
  );
}

// Chart

interface ChartData {
  parameter: string;
  hours: number;
}
export function SpendHour({ data, role }: { data: ChartData[]; role?: Role }) {
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (role === VENDOR) {
      setIsVendor(true);
    }
  }, [role]);
  return (
    <div className="rounded-xl h-[300px] flex flex-row items-center justify-center mt-5">
      <div className="w-full h-full flex flex-col gap-2 ">
        <div className=" w-full  h-full flex flex-col justify-center overflow-hidden ">
          <Chart data={data} isVendor={isVendor} />
        </div>
      </div>
    </div>
  );
}

function Chart({ data, isVendor }: { data: ChartData[]; isVendor: boolean }) {
  const chartConfig = {
    hours: {
      label: "Hours",
      // color: isVendor ? "var(--vendor-dark)" : "var(--primary-blue)",
      color: isVendor ? "#360227" : "#001D6C",
    },
  } satisfies ChartConfig;

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
