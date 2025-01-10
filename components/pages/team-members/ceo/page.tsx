"use client";
import Filter from "@/components/icons/Filter";
import Headline, {
  ButtonObjectType,
} from "@/components/reusables/components/headline";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { Textarea } from "@/components/ui/textarea";
import { CustomUser, ProjectValues } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { ROLE } from "@/tempData";
import { Loader2, Search, Trash, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function AllClinets() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const [teamMembers, setTeamMembers] = useState<CustomUser[] | []>([]);

  const [project, setProject] = useState<ProjectValues | null>(null);

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

        setProject(getProjectData.project);
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
          <ManageTeamMembers projectId={id || ""} project={project} />
        </div>
        <DataTableTasks teamMembers={teamMembers} projectID={id || ""} />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks({
  teamMembers,
  projectID,
}: {
  teamMembers: CustomUser[];
  projectID: string;
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
              <TableCell className="flex gap-3">
                <AddTasks
                  projectID={projectID}
                  teamMemberName={row.firstName + " " + row.lastName}
                  teamMemberID={row._id}
                  teamMemberAvatar={row.profileImage || ""}
                />
                <SquareButton className="">
                  <Trash />
                </SquareButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ManageTeamMembers({
  projectId,
  project,
}: {
  projectId: string;
  project: ProjectValues | null;
}) {
  const [newTeamMember, setNewTeamMember] = useState<CustomUser[] | []>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleNewTeamMemberSelect = (employee: CustomUser) => {
    setNewTeamMember((prevData) => [...prevData, employee]);
  };

  const handleRemoveProject = (
    ntm: CustomUser,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNewTeamMember((prevData) => prevData.filter((p) => p._id !== ntm._id));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    // Prepare JSON payload

    try {
      const updatePromises = newTeamMember.map((user) => {
        const oldProjectsId = user.myProjects
          ? user.myProjects
              .filter(
                (project): project is ProjectValues =>
                  typeof project !== "string"
              )
              .map((project) => project._id)
          : [];

        const payload = {
          _id: user._id,
          myProjects: [...oldProjectsId, projectId], // Assuming `projects` is available in scope
        };

        return fetch(`/api/user/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update user ${user._id}`);
          }
          return response.json();
        });
      });

      updatePromises.push(
        fetch(`/api/project/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: projectId,
            teams: newTeamMember.map((member) => member._id),
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update Team in project ${projectId}`);
          }
          return response.json();
        })
      );

      const results = await Promise.allSettled(updatePromises);

      const successfulUpdates = results.filter(
        (result: PromiseSettledResult<unknown>) => result.status === "fulfilled"
      );

      const failedUpdates = results.filter(
        (result: PromiseSettledResult<unknown>) => result.status === "rejected"
      );

      console.log("Successful updates:", successfulUpdates);
      console.log("Failed updates:", failedUpdates);

      document.getElementById("close")?.click();

      // alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      {/* Prevent DropdownMenu from closing */}
      <DialogTrigger asChild>
        <SquareButton className="">Manage Projects</SquareButton>
      </DialogTrigger>
      <DialogContent className="w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
        <h1 className="text-2xl font-semibold text-dark-gray">
          Add New Team Member
        </h1>
        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Project
            </Label>
            <input
              type="text"
              disabled
              value={project ? project?.projectDetails.projectName : ""}
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Working on
            </Label>
            <div className="w-full text-base h-[40px] flex flex-row flex-wrap">
              {Array.isArray(newTeamMember) &&
                newTeamMember.map((ntm) => (
                  <span
                    key={ntm._id}
                    className=" w-fit h-full flex items-center gap-1 shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4  text-base  "
                  >
                    {ntm.firstName}
                    <X size={20} onClick={(e) => handleRemoveProject(ntm, e)} />
                  </span>
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Select project
            </Label>
            <NewTeamMembersSelect onSelect={handleNewTeamMemberSelect} />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
              Cancel
            </SquareButton>
          </DialogClose>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={submitting}
            className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff] text-nowrap bg-primary-blue disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NewTeamMembersSelect({
  onSelect,
}: {
  onSelect: (project: CustomUser) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<CustomUser[] | []>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const reduxEmployeesList = useSelector(
    (state: RootState) => state.ceo.employeesList
  );

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const [getAllDevsRes] = await Promise.all([
          fetch("/api/user/get/getAllDevs", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        const [getAllDevsData] = await Promise.all([getAllDevsRes.json()]);

        setEmployees(getAllDevsData.developers || []);
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    if (reduxEmployeesList && reduxEmployeesList.length > 0) {
      setEmployees(reduxEmployeesList);
    } else fetchPayrollHistory();
  }, [reduxEmployeesList]);

  // Filter projects based on search term
  const filteredEmployees = employees.filter((emp) =>
    [emp.firstName, emp.lastName].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (employee: CustomUser) => {
    // setSelectedEmployee(employee);
    setSearchTerm(employee.firstName + " " + employee.lastName);
    setIsOpen(false);
    onSelect(employee);
  };

  return (
    <div ref={wrapperRef} className="relative w-full ">
      <div className="relative">
        <input
          type="text"
          className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
          placeholder="Search employee..."
          value={searchTerm}
          // onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
          }}
        />
        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((pj) => (
              <div
                key={pj._id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSelect(pj)}
              >
                <div className="font-medium">
                  {pj.firstName} {pj.lastName}
                </div>
                <div className="text-sm text-gray-500">{""}</div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No employees found</div>
          )}
        </div>
      )}
    </div>
  );
}

function AddTasks({
  projectID,
  teamMemberName,
  teamMemberID,
  teamMemberAvatar,
}: {
  projectID: string;
  teamMemberName: string;
  teamMemberID: string;
  teamMemberAvatar: string;
}) {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [submitting, setSubmitting] = useState(false);

  const [taskDescription, setTaskDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  // const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      projectID,
      createdBy: user._id,
      // taskNo: null, // Backend handles auto-increment
      issueSubject: taskDescription,
      estimatedTime: estimatedTime ? parseFloat(estimatedTime) : undefined,
      assignedTo: {
        _id: teamMemberID,
        name: teamMemberName,
        avatar: teamMemberAvatar,
      },
      status: "pending",
      priority,
      dueDate: new Date(dueDate),
    };

    try {
      // Replace with actual API endpoint and handle response
      const response = await fetch("/api/task/create/" + projectID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create task");

      setSubmitting(false);
      document.getElementById("close")?.click();

      alert("Task created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquareButton className="ml-auto">Add Task</SquareButton>
      </DialogTrigger>
      <DialogContent className="w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
        <h1 className="text-2xl font-semibold text-dark-gray">
          Manage Clients Projects
        </h1>
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto px-3">
          {/* Developer Name */}
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Dev Name
            </Label>
            <Input
              type="text"
              value={teamMemberName}
              disabled
              className="w-full text-base h-[40px] bg-transparent rounded-lg px-4"
            />
          </div>

          {/* Task Description */}
          <div className="w-full flex flex-col gap-2">
            <Label className="text-base font-medium text-gray-800">
              Task Description
            </Label>
            <Textarea
              name="description"
              required
              rows={6}
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full resize-none h-[120px] bg-transparent rounded-lg px-4"
            />
          </div>

          {/* Estimated Time */}
          <div className="w-full flex flex-col gap-2">
            <Label className="text-base font-medium text-gray-800">
              Estimated Time (hours)
            </Label>
            <Input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="Enter estimated time"
              className="w-full bg-transparent rounded-lg px-4"
            />
          </div>

          {/* Status */}
          {/* <div className="w-full flex flex-col gap-2">
            <Label className="text-base font-medium text-gray-800">Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-transparent rounded-lg px-4 h-[40px]"
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="refactoring">Refactoring</option>
            </select>
          </div> */}

          {/* Priority */}
          <div className="w-full flex flex-col gap-2">
            <Label className="text-base font-medium text-gray-800">
              Priority
            </Label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-transparent rounded-lg px-4 h-[40px]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="w-full flex flex-col gap-2">
            <Label className="text-base font-medium text-gray-800">
              Due Date
            </Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-transparent rounded-lg px-4"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
              Cancel
            </SquareButton>
          </DialogClose>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="py-3 px-5 bg-primary-blue text-white rounded-xl disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
