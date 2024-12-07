'use client'
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import { ROLE } from "@/tempData";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const dataList = [
    {
      id: 1,
      name: "CSK",
      role: "Engineer",
      taskLeft: "8",
      taskCompleted: "10",
    },
    {
      id: 2,
      name: "CSK",
      role: "Engineer",
      taskLeft: "8",
      taskCompleted: "10",
    },
    {
      id: 3,
      name: "CSK",
      role: "Engineer",
      taskLeft: "8",
      taskCompleted: "10",
    },
  ];

export default function TeamMembers() {
    const [search, setSearch] = useState("");
  return (
    <MainContainer role={ROLE}>
      <div className="w-full my-4 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* headline */}
          <h1 className="text-2xl font-semibold">Team Members</h1>
          <p className="text-[#6A6A6A] text-base font-normal">Project / Team Memebers</p>
        </div>
      </div>

      <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[300px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />

        <Container>
        <h1 className="text-base font-semibold">Total Client Payments - 03</h1>
        <Table>
          <TableHeader>
            <TableRow>
            
              <TableHead></TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Task Left</TableHead>
              <TableHead>Task Comepleted</TableHead>
              {/* <TableHead className="w-[50px]"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataList.map((data,index) => (
              <TableRow key={data.id} className="cursor-pointer">
                <TableCell className=" ">{`${index + 1}.`}
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell >{data.role}</TableCell>
                <TableCell>{data.taskLeft}</TableCell>
                <TableCell> {data.taskCompleted}</TableCell>
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
        </Container>
    </MainContainer>
  );
}
