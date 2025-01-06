"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Role, VENDOR } from "@/types";
import { Plus } from 'lucide-react';
import { useState } from "react";
import CreateGroupDialog from "./create-group-dialog";

export default function Headline({
  role,
  setIsAddChatOpen,
}: {
  role: Role;
  setIsAddChatOpen: (value: boolean) => void;
}) {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <WrHeadline title="Chats">
      <div className="flex gap-3">
        <SquareButton
          role={role}
          onClick={() => setIsCreateGroupOpen(true)}
        >
          <Plus
            color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
          />
          Create Group
        </SquareButton>
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
      </div>
      <CreateGroupDialog
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
    </WrHeadline>
  );
}