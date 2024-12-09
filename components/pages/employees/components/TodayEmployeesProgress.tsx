import MidSizeCard from "@/components/reusables/wrapper/midSizeCard";
import React from "react";

export default function TodayEmployeesProgress() {
  return (
    <MidSizeCard className="h-full">
      <div className="w-full h-full flex flex-col gap-2 p-5">
        <Title />
        <div className=" h-[1px] w-full bg-[#D0D5DD]"></div>
        <div className="w-full h-full flex flex-row items-center">
          <div className=" w-full sm:w-1/2  min-w-[280px] flex flex-col gap-2 h-full items-center justify-center"></div>
          <div className=" hidden sm:flex sm:w-1/2   flex-col gap-2 h-full items-center justify-center mr-8  ">
            <div className="flex flex-row w-full items-center justify-between">
                <h6 className="text-dark-gray text-base font-medium">Logged In</h6>
                <p className="text-dark-gray text-base font-normal">14</p>
            </div>

            <div className="flex flex-row  w-full items-center justify-between">
                <h6 className="text-dark-gray text-base font-medium">Total Work Hours</h6>
                <p className="text-dark-gray text-base font-normal">14</p>
            </div>

            <div className="flex flex-row  w-full items-center justify-between">
                <h6 className="text-dark-gray text-base font-medium">VS Code Work Hours</h6>
                <p className="text-dark-gray text-base font-normal">14</p>
            </div>
          
          </div>
        </div>
      </div>
    </MidSizeCard>
  );
}

function Title() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-lg text-dark-gray font-semibold">
        Today's Employees Progress
      </h2>
      <p className="text-light-gray text-sm font-normal">
        Employees work hours today
      </p>
    </div>
  );
}
