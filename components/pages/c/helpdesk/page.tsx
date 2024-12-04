'use client';
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RaiseTicket from "./components/raiseTicket";
import Headline from "@/components/reusables/components/headline";


interface Ticket {
  subject: string
  ticketNo: string
  priority: "Low" | "Medium" | "High"
  status: "Open" | "Close"
  dateUploaded: Date
  issueType: string
}

const initialTickets: Ticket[] = [
  {
    subject: "Tech requirements",
    ticketNo: "#0119292",
    priority: "Low",
    status: "Open",
    dateUploaded: new Date("2022-01-04"),
    issueType: "Project Issue",
  },
  {
    subject: "Dashboard screenshot",
    ticketNo: "#01139292",
    priority: "Medium",
    status: "Close",
    dateUploaded: new Date("2022-01-04"),
    issueType: "Payment Issue",
  },
  {
    subject: "Dashboard prototype recording",
    ticketNo: "#0169292",
    priority: "Medium",
    status: "Open",
    dateUploaded: new Date("2022-01-02"),
    issueType: "App Issue",
  },
  {
    subject: "Dashboard prototype FINAL",
    ticketNo: "#0119592",
    priority: "High",
    status: "Open",
    dateUploaded: new Date("2022-01-06"),
    issueType: "Project Issue",
  },
  {
    subject: "UX Design Guidelines",
    ticketNo: "#0179292",
    priority: "Low",
    status: "Open",
    dateUploaded: new Date("2022-01-08"),
    issueType: "Bug Issue",
  },
  {
    subject: "Dashboard interaction",
    ticketNo: "#011h4292",
    priority: "High",
    status: "Close",
    dateUploaded: new Date("2022-01-06"),
    issueType: "Bug Issue",
  },
  {
    subject: "App inspiration",
    ticketNo: "#011j9292n",
    priority: "Low",
    status: "Close",
    dateUploaded: new Date("2022-01-04"),
    issueType: "App Issue",
  },
]



export default function Helpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [search, setSearch] = useState("")
  const [issueType, setIssueType] = useState<string>("all")
  const [priority, setPriority] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({from: undefined, to: undefined})
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesIssueType = issueType === "all" || ticket.issueType === issueType
    const matchesPriority = priority === "all" || ticket.priority === priority
    const matchesDateRange = 
      (!dateRange.from || ticket.dateUploaded >= dateRange.from) &&
      (!dateRange.to || ticket.dateUploaded <= dateRange.to)
    return matchesSearch && matchesIssueType && matchesPriority && matchesDateRange
  })



  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredTickets.map((ticket) => ticket.ticketNo));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (ticketNo: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, ticketNo]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== ticketNo));
    }
  };

  const isRowSelected = (ticketNo: string) => selectedRows.includes(ticketNo);
  const isAllSelected =
  filteredTickets.length > 0 && selectedRows.length === filteredTickets.length;

  
  const headLineButtons = [
    { buttonText: "Raise Ticket", lightGrayColor: false, onNeedIcon: true, onClick: () => console.log("Export Report"), dialogContent: <RaiseTicket/> },
  ];

  return (
    <MainContainer role={ROLE}>
      <Headline role={ROLE} title="Helpdest Tickets" subTitle="Project / Chats" buttonObjects={headLineButtons} />

      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
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
              {/* <Calendar className="mr-2 h-4 w-4" /> */}
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
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="w-[53px]  ">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
                className="border-[#3A3A3A] data-[state=checked]:bg-[#141263] "
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
            {filteredTickets.map((ticket, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell className=" ">
                <Checkbox
                  checked={isRowSelected(ticket.ticketNo)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(ticket.ticketNo, checked as boolean)
                  }
                  aria-label={`Select row ${ticket.ticketNo}`}
                  className="border-[#3A3A3A] data-[state=checked]:bg-[#141263] "
                />
              </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell className="font-mono">{ticket.ticketNo}</TableCell>
                <TableCell>
                  {/* <Badge
                    variant="outline"
                    className={
                      ticket.priority === "High"
                        ? "border-red-500 text-red-500"
                        : ticket.priority === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                    }
                  >
                    {ticket.priority}
                  </Badge> */}
                  {ticket.priority}
                </TableCell>
                <TableCell>
                  <div
                    // variant="secondary"
                    className={
                      ticket.status === "Open"
                        ? " text-green-800"
                        : " text-red-800"
                    }
                  >
                    {ticket.status}
                  </div>
                  {/* {ticket.status} */}
                </TableCell>
                <TableCell>{format(ticket.dateUploaded, "LLL dd, yyyy")}</TableCell>
                <TableCell>{ticket.issueType}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button  className="h-8 w-8 p-0">
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
        </Table>
      </div>
    </MainContainer>
  );
}
