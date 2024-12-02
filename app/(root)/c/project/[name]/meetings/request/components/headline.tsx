"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Headline({
  handleSubmit,
}: {
  handleSubmit: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter()
  const handleNavigation = () => {
    const updatedPath = pathname.replace("request","details"); 
    router.push(updatedPath); 
  };
  return (
    <div className=" w-full my-4  flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-3xl font-semibold">Request a Meeting</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          {"Project / meetings / request meeting"}
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <SquareButton
          className="text-[#6A6A6A]"
          onClick={() => handleNavigation()}
        >
          Cancel
        </SquareButton>

        <SquareButton
          onClick={() => {
            handleSubmit();
          }}
        >
          <Plus color="#155EEF" />
          Confirm Request
        </SquareButton>
      </div>
    </div>
  );
}
