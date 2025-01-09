"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Role, VENDOR } from "@/types";
import { Plus } from 'lucide-react';
import { useState } from "react";
import CreateGroupDialog from "./create-group-dialog";
import { useSession } from "next-auth/react";

export default function Headline({
  role,
  setIsAddChatOpen,
}: {
  role: Role;
  setIsAddChatOpen: (value: boolean) => void;
}) {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const canCreateChat = userRole === 'ceo' || userRole === 'manager' || userRole === 'developer';
  const canCreateGroup = userRole === 'ceo' || userRole === 'manager';

  return (
    <WrHeadline title="Chats">
      <div className="flex gap-3">
        {canCreateGroup && (
          <SquareButton
            role={role}
            onClick={() => setIsCreateGroupOpen(true)}
          >
            <Plus
              color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
            />
            Create Group
          </SquareButton>
        )}
        {canCreateChat && (<SquareButton
          role={role}
          onClick={() => {
            setIsAddChatOpen(true);
          }}
        >
          <Plus
            color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
          />
          Add Chat
        </SquareButton>)}
      </div>
      {canCreateGroup && (
        <CreateGroupDialog
          open={isCreateGroupOpen}
          onOpenChange={setIsCreateGroupOpen}
        />
      )}
    </WrHeadline>
  );
}