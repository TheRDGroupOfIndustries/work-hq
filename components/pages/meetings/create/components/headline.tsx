"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
// import { Role, VENDOR } from "@/types";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Headline({
  handleSubmit
}: {
  handleSubmit: () => void;
}) {
  const pathname = usePathname()
  const router = useRouter();

  const handleRequestMeeting = () => {
    const updatedPath = pathname.replace("create","details"); 
    router.push(updatedPath); 
  };

  return (
    <WrHeadline title={"Create a Meeting"}>
        <div className="flex flex-row gap-4">
        <SquareButton
          className="text-[#6A6A6A]"
          onClick={() => {
            handleRequestMeeting();
          }}
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
    </WrHeadline>
  );
}