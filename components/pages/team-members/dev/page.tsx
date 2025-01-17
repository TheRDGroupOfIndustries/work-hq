"use client";
import Filter from "@/components/icons/Filter";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";

import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectContext } from "@/context/ProjectProvider";
import { CustomUser } from "@/lib/types";
import { ROLE } from "@/tempData";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllClinets() {
  const searchParams = useSearchParams();
  const { selectedProjectDetails } = useProjectContext();
  const id = selectedProjectDetails?._id || searchParams.get("id");

  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const [teamMembers, setTeamMembers] = useState<CustomUser[] | []>([]);

  // const [setProject] = useState<ProjectValues | null>(null);

  // const projectRedux = useSelector(
  //   (state: RootState) => state.ceo.allProjectsList
  // ).find((project) => project._id === id);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const [getProjectRes] = await Promise.all([
          fetch("/api/project/get/getByProjectID/" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        const [getProjectData] = await Promise.all([getProjectRes.json()]);

        // console.log("getProjectData", getProjectData);

        // setProject(getProjectData.project);
        // setTeamMembers(getProjectData.developmentDetails);

        setTeamMembers(getProjectData.project.developmentDetails.teams);
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    // if (projectRedux) {
    //   setProject(projectRedux);
    // } else fetchProject();

    fetchProject();
  }, [id]);

  const headLineButtons = [
    {
      buttonText: "Export Report",
      onNeedIcon: false,
      onClick: () => console.log("Export Repor"),
    },
  ] as ButtonObjectType[];

  return (
    <MainContainer role={ROLE}>
      <Headline
        role={ROLE}
        title="Team Members"
        subTitle="Project"
        buttonObjects={headLineButtons}
      />

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[200px] text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-fit te outline-none gap-1 bg-transparent">
            <div className="w-full text-[#697077] flex flex-row gap-1 items-center justify-end">
              <Filter />
              Filter
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"category"}>{"category"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Container className="p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-col flex-1">
            <h1 className="text-lg uppercase">Team Members</h1>
            <h1 className="text-base ">
              Total Numbers - {teamMembers?.length || 0}
            </h1>
          </div>
        </div>
        <DataTableTasks teamMembers={teamMembers} />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks({
  teamMembers,
}: {
  teamMembers: CustomUser[];
}) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="">Member Name</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="">Task Lift</TableHead>
            <TableHead className="">Task Completed</TableHead>
            <TableHead className="w-fit"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {teamMembers.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px]  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.firstName + " " + row.lastName}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                {row.tasks?.reduce(
                  (total, task) =>
                    task.status !== "completed" ? total + 1 : total,
                  0
                )}
              </TableCell>
              <TableCell>
                {row.tasks?.reduce(
                  (total, task) =>
                    task.status === "completed" ? total + 1 : total,
                  0
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}