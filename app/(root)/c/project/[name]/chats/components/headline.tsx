"use client";
import WrHeadline from "@/components/reusables/wrapper/Headline";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Role, VENDOR } from "@/types";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddChat from "./addChat";
export default function Headline({role}:{role:Role}) {
  return (
    <WrHeadline title="Chats">
      
      <Dialog>
        <DialogTrigger>
        <SquareButton
        role={role}
      >
        <Plus
          color={role === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"}
        />
        Add Chat
      </SquareButton>
        </DialogTrigger>
        <DialogContent>
          <AddChat/>
        </DialogContent>
      </Dialog>
    </WrHeadline>
  );
}
