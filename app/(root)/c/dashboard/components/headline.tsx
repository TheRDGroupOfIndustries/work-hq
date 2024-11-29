"use client"
import SquareButton from '@/components/reusables/squareButton'
import { Plus } from 'lucide-react'

export default function Headline() {
  return (
    <div className=" w-full my-4  flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* headline */}
          <h1 className="text-3xl font-semibold">Project Overview</h1>
          <p className="text-[#6A6A6A] text-base font-normal">
            Project / Overview{" "}
          </p>
        </div>

        

        <SquareButton onClick={()=>{console.log("Export Report")}}>
          <Plus color="#155EEF" />
          Export Report
        </SquareButton>

      </div>
  )
}
