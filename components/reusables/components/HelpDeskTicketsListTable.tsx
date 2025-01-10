"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketValues } from "@/lib/types";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";

export interface Ticket {
  _id: string;
  subject: string;
  ticketNo: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Close";
  ticketDate: string;
  issueType: string;
}

export default function HelpDeskTicketsListTable({
  filteredTickets,
  isCEOSide = false,
}: {
  filteredTickets: TicketValues[];
  isCEOSide?: boolean;
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredTickets.map((ticket) => ticket._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, ticketId]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== ticketId));
    }
  };

  const isRowSelected = (ticketId: string) => selectedRows.includes(ticketId);
  const isAllSelected =
    filteredTickets.length > 0 &&
    selectedRows.length === filteredTickets.length;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[43px]">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              aria-label="Select all rows"
              className="border-[#3A3A3A] data-[state=checked]:bg-[#141263]"
            />
          </TableHead>
          {isCEOSide && <TableHead className="w-[53px]"></TableHead>}
          {isCEOSide && <TableHead>Client/Vendor</TableHead>}
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
            {isCEOSide && <TableCell>{index + 1}</TableCell>}
            {isCEOSide && (
              <TableCell>
                <div className="flex flex-col">
                  {ticket.userID && typeof ticket.userID === "object" ? (
                    <>
                      <h4 className="text-base text-dark-gray">
                        {ticket.userID.firstName + " " + ticket.userID.lastName}
                      </h4>
                      <h5 className="text-base text-light-gray line-clamp-1">
                        {ticket.userID.email}
                      </h5>
                    </>
                  ) : (
                    <h4 className="text-base text-dark-gray">
                      {ticket.userID}
                    </h4>
                  )}
                </div>
              </TableCell>
            )}
            <TableCell>{ticket.subject}</TableCell>
            <TableCell className="font-mono">{ticket.ticketNo}</TableCell>
            <TableCell>{ticket.priority}</TableCell>
            <TableCell>
              <div
                className={
                  ticket.status === "open" ? "text-green-800" : "text-red-800"
                }
              >
                {ticket.status}
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(ticket.ticketDate), "LLL dd, yyyy")}
            </TableCell>
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
    </Table>
  );
}
