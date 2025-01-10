'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import Headline from "@/components/reusables/components/headline";
import { ROLE } from "@/tempData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import HelpDeskTicketsListTable from "@/components/reusables/components/HelpDeskTicketsListTable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { TicketValues } from "@/lib/types";

export interface Ticket {
  _id: string;
  subject: string;
  ticketNo: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Close";
  ticketDate: string;
  issueType: string;
}

export default function Helpdesk() {
  const [tickets, setTickets] = useState<TicketValues[]>([]);
  const [search, setSearch] = useState("");
  const [issueType, setIssueType] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined, to: Date | undefined }>({ from: undefined, to: undefined });
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data: session } = useSession();
  const { name: projectName } = useParams();

  const ticketList = useSelector((state: RootState) => state.ceo.helpdeskTicketsList);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketRes = await fetch("/api/ticket/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      const ticketData = await ticketRes.json();
      
      setTickets(ticketData.tickets)
      

    };

    if(ticketList.length > 0){
      setTickets(ticketList);
    } else {
      fetchTickets();
    }

  }, [session, projectName, ticketList]);

  const filteredTickets = (tickets || []).filter((ticket) => {
    const matchesSearch = ticket.subject
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesIssueType = issueType === "all" || ticket.issueType === issueType;
    const matchesPriority = priority === "all" || ticket.priority === priority;
    const matchesDateRange =
      (!dateRange.from || new Date(ticket.ticketDate) >= dateRange.from) &&
      (!dateRange.to || new Date(ticket.ticketDate) <= dateRange.to);
    return matchesSearch && matchesIssueType && matchesPriority && matchesDateRange;
  });


  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} title="Helpdest Tickets" subTitle="Project / Chats"  />

      <div className="flex flex-wrap gap-4">
      <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />
        <Select value={issueType} onValueChange={setIssueType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Issue Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="Project Issue">Project Issue</SelectItem>
            <SelectItem value="Payment Issue">Payment Issue</SelectItem>
            <SelectItem value="App Issue">App Issue</SelectItem>
            <SelectItem value="Bug Issue">Bug Issue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => setDateRange(range as { from: Date | undefined; to: Date | undefined; })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="shadow-[5px_5px_10px_0px_#789BD399,-5px_-5px_10px_0px_#FFFFFF] rounded-xl mt-5 p-2">  
        <HelpDeskTicketsListTable isCEOSide={true} filteredTickets={filteredTickets} />
      </div>
    </MainContainer>
  );
}