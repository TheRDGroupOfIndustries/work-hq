"use client";

import SquareButton from "@/components/reusables/wrapper/squareButton";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/context/ChatProvider";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RaiseTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueMessage, setIssueMessage] = useState("");
  const [priority, setPriority] = useState("");
  const { data: session } = useSession();
  const { _id: projectId } = useParams();
  const { client } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (!session?.user?._id || !client) {
      toast.error("You must be logged in to raise a ticket.");
      return;
    }

    // Generate a unique ticket number than create a channel id for chat
    const ticketNo = Date.now().toString();
    // This is just for testing
    const channelID = crypto.randomUUID();
    try {
      const response = await fetch(`/api/ticket/create/${projectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          ticketNo,
          channelID,
          issueType,
          priority,
          issueMessage,
          status: "Open",
          userID: session.user._id,
        }),
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      toast.success("Ticket raised successfully!");
      setIsSubmitting(false);
      document.getElementById("cancel")?.click();

      
      // const jsonResponse = await response.json();

      // const { ticket } = jsonResponse;

      // Create a new chat channel for the ticket
      // const channel = client.channel("messaging", ticket._id, {
      //   name: `Ticket: ${subject}`,
      //   members: [session.user._id],
      // });

      // await channel.create();

      // toast.success("Ticket raised successfully!");
      // Close the dialog or redirect to the new ticket page
    } catch (error) {
      console.log(error);
      console.error("Error raising ticket:", error);
      toast.error("Failed to raise ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="z-10 w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6"
    >
      <h1 className="text-2xl font-semibold text-dark-gray">Raise A Ticket</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Ticket Subject
          </Label>
          <input
            type="text"
            placeholder="E.g. Login issue"
            className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Issue Type
          </Label>
          <Select value={issueType} onValueChange={setIssueType}>
            <SelectTrigger className="w-full bg-primary-sky-blue">
              <SelectValue placeholder="Issue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Project Issue">Project Issue</SelectItem>
              <SelectItem value="Payment Issue">Payment Issue</SelectItem>
              <SelectItem value="App Issue">App Issue</SelectItem>
              <SelectItem value="Bug Issue">Bug Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Issue Message
          </Label>
          <Textarea
            required
            rows={6}
            placeholder="Describe your issue"
            className="w-full resize-none border-0 p-3 focus-visible:ring-0 h-[40px] outline-none shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
            value={issueMessage}
            onChange={(e) => setIssueMessage(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label className="text-base font-medium text-gray-800">
            Priority Level
          </Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-full bg-primary-sky-blue">
              <SelectValue placeholder="Priority Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <DialogClose  asChild>
            <SquareButton id={"cancel"}  className="text-[#6A6A6A] w-fit self-end">
              Cancel
            </SquareButton>
          </DialogClose>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-row items-center py-3 px-5 gap-2 shadow-[3px_3px_10px_0px_#789BD399,5px_5px_15px_0px_#00000099_inset,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-[#ffffff]  text-nowrap bg-primary-blue disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus color="#ffffff" />
            {isSubmitting ? "Createing..." : "Raise Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
