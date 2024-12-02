"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { ChevronDown, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Headline() {
  const pathname = usePathname();
  const router = useRouter()
  const handleNavigation = () => {
    const updatedPath = pathname.replace("details", "request"); 
    router.push(updatedPath); 
  };

  return (
    <WrHeadline title="Meetings detail">
      <div className="flex flex-col sm:flex-row gap-4">
          <SquareButton
            onClick={() => {
              handleNavigation();
            }}
          >
            <Plus color="#155EEF" />
            Request Meeting
          </SquareButton>

          <SquareButton className="text-[#6A6A6A] w-fit self-end">
            7 days <ChevronDown color="#6A6A6A" />
          </SquareButton>
        </div>
    </WrHeadline>
  );
}
