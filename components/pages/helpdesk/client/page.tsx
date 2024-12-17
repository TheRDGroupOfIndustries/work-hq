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
import RaiseTicket from "../components/raiseTicket";
import HelpDeskTicketsListTable from "@/components/reusables/components/HelpDeskTicketsListTable";

interface Ticket {
  _id: string;
  subject: string;
  ticketNo: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Close";
  ticketDate: string;
  issueType: string;
}

export default function Helpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [issueType, setIssueType] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined, to: Date | undefined }>({ from: undefined, to: undefined });
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data: session } = useSession();
  const {  _id: projectId } = useParams();

  useEffect(() => {
    const fetchTickets = async () => {
      if (session?.user?._id) {
        try {
          const response = await fetch(`/api/ticket/get/${projectId}/${session.user._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch tickets');
          }
          const data = await response.json();
          setTickets(data.tickets || []);
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      }     
    };

    fetchTickets();
  }, [session, projectId]);

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

  // const handleSelectAll = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedRows(filteredTickets.map((ticket) => ticket._id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  // };

  // const handleSelectRow = (ticketId: string, checked: boolean) => {
  //   if (checked) {
  //     setSelectedRows([...selectedRows, ticketId]);
  //   } else {
  //     setSelectedRows(selectedRows.filter((rowId) => rowId !== ticketId));
  //   }
  // };

  // const isRowSelected = (ticketId: string) => selectedRows.includes(ticketId);
  // const isAllSelected =
  //   filteredTickets.length > 0 && selectedRows.length === filteredTickets.length;

    const headLineButtons = [
      { buttonText: "Raise Ticket", lightGrayColor: false, onNeedIcon: true, onClick: () => console.log("Export Report"), dialogContent: <RaiseTicket/> },
    ];

  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} title="Helpdest Tickets" subTitle="Project / Chats" buttonObjects={headLineButtons} />

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
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[53px]">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                  className="border-[#3A3A3A] data-[state=checked]:bg-[#141263]"
                />
              </TableHead>
              <TableHead>Ticket Subject</TableHead>
              <TableHead>Ticket No</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date uploaded</TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket._id} className="cursor-pointer">
                <TableCell>
                  <Checkbox
                    checked={isRowSelected(ticket._id)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(ticket._id, checked as boolean)
                    }
                    aria-label={`Select row ${ticket.ticketNo}`}
                    className="border-[#3A3A3A] data-[state=checked]:bg-[#141263]"
                  />
                </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell className="font-mono">{ticket.ticketNo}</TableCell>
                <TableCell>{ticket.priority}</TableCell>
                <TableCell>
                  <div
                    className={
                      ticket.status === "Open"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {ticket.status}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(ticket.ticketDate), "LLL dd, yyyy")}</TableCell>
                <TableCell>{ticket.issueType}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete ticket
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}


          
        <HelpDeskTicketsListTable filteredTickets={filteredTickets} />
      </div>
    </MainContainer>
  );
}