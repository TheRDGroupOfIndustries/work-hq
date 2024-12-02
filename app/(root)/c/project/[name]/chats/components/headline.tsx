"use client";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Plus } from "lucide-react";

export default function Headline({
  setIsAddChatOpen,
}: {
  setIsAddChatOpen: (value: boolean) => void;
}) {
  return (
    <div className=" w-full  flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        {/* headline */}
        <h1 className="text-3xl font-semibold">Chats</h1>
        <p className="text-[#6A6A6A] text-base font-normal">
          {"Project / chats"}
        </p>
      </div>

      <SquareButton
        onClick={() => {
          setIsAddChatOpen(true);
        }}
      >
        <Plus color="#155EEF" />
        Add Chat
      </SquareButton>
    </div>
  );
}
