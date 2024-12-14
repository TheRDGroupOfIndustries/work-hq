"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { ChevronDown, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Headline({btnText,goTo}: {btnText: string, goTo: string}) {
  const pathname = usePathname()
  const router = useRouter();

  const handleRequestMeeting = () => {
    const updatedPath = pathname.replace("details",`${goTo}`); 
    router.push(updatedPath); 
  };

  return (
    <WrHeadline title="Meetings detail">
      <div className="flex flex-col sm:flex-row gap-4">
          <SquareButton
            onClick={() =>{handleRequestMeeting()} }
          >
            <Plus color="#155EEF" />
          {btnText}
          </SquareButton>

          <SquareButton className="text-[#6A6A6A] w-fit self-end">
            7 days <ChevronDown color="#6A6A6A" />
          </SquareButton>
        </div>
    </WrHeadline>
  );
}
