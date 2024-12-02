"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Plus } from "lucide-react";

export default function Headline() {
  return (
    <div className=" w-full my-4  flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-3xl font-semibold">Payments</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          {"Project / payments"}
        </p>
      </div>

      <SquareButton
        onClick={() => {
          console.log("Export Report");
        }}
      >
        <Plus color="#155EEF" />
        Add Payment
      </SquareButton>
    </div>
  );
}
