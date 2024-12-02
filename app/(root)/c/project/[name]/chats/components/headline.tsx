"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Role, VENDOR } from "@/types";
import { Plus } from "lucide-react";
export default function Headline({
  role,
  setIsAddChatOpen,
}: {
  role: Role;
  setIsAddChatOpen: (value: boolean) => void;
}) {
  return (
    <WrHeadline title="Chats">
      <SquareButton
        role={role}
        onClick={() => {
          setIsAddChatOpen(true);
        }}
      >
        <Plus
          color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
        />
        Add Chat
      </SquareButton>
    </WrHeadline>
  );
}
