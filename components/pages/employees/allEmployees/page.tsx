"use client";
import Filter from "@/components/icons/Filter";
import Container from "@/components/reusables/wrapper/Container";
import MainContainer from "@/components/reusables/wrapper/mainContainer";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { CustomUser, ProjectValues } from "@/lib/types";
import { RootState } from "@/redux/rootReducer";
import { setEmployeesList } from "@/redux/slices/ceo";
import { ROLE } from "@/tempData";
import { VENDOR } from "@/types";
import { Loader2, MoreVertical, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeesSummary from "../components/EmployeesSummary";
import TodayEmployeesProgress from "../components/TodayEmployeesProgress";
export default function AllEmployees() {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const dispatch = useDispatch();
  const reduxEmployeesList = useSelector(
    (state: RootState) => state.ceo.employeesList
  );

  const [employees, setEmployees] = useState<CustomUser[] | []>([]);

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const response = await fetch("/api/user/get/getAllDevs", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        setEmployees(data.developers || []);

        dispatch(
          setEmployeesList(
            // Filter users with role "developer"
            data.developers
          )
        );
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    if (reduxEmployeesList && reduxEmployeesList.length > 0) {
      setEmployees(reduxEmployeesList);
    } else fetchPayrollHistory();
  }, [dispatch, reduxEmployeesList]);

  return (
    <MainContainer role={ROLE}>
      <div className="w-full my-4 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* headline */}
          <h1 className="text-2xl font-semibold">Payments Management</h1>
          <p className="text-[#6A6A6A] text-base font-normal">
            All Projects/ payments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <SquareButton role={ROLE}>
            <Plus
              color={
                ROLE === VENDOR ? "var(--vendor-dark)" : "var(--primary-blue)"
              }
            />
            Export Report
          </SquareButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex text-desktop flex-row items-center font-medium gap-2 shadow-[3px_3px_10px_0px_#789BD399,-3px_-3px_10px_0px_#FFFFFF] rounded-xl text-nowrap  py-3 px-3">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Projects </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Dialog>
                  {/* Prevent DropdownMenu from closing */}
                  <DialogTrigger asChild>
                    <button
                      className="w-full text-left"
                      onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                    >
                      Ban Employee
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <h2 className="text-lg font-semibold">Ban Employee</h2>
                    <p>Are you sure you want to ban this employee?</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="btn-cancel">Cancel</button>
                      <button className="btn-confirm">Confirm</button>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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

      <div className="w-full flex flex-col xl:flex-row gap-4 ">
        <EmployeesSummary />
        <TodayEmployeesProgress />
      </div>

      <Container className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-base text-dark-gray font-semibold uppercase">
            All Employees List
          </h1>
          <p className="text-sm text-[#6A6A6A]">Total Employees - 05</p>
        </div>
        <DataTableTasks employees={employees} />
      </Container>
    </MainContainer>
  );
}

function DataTableTasks({ employees }: { employees: CustomUser[] }) {
  return (
    <div className=" w-full ">
      <Table>
        <TableHeader className=" text-nowrap text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="min-w-[200px]">Employees Name</TableHead>
            <TableHead className="min-w-[150px]">Working On</TableHead>
            <TableHead className="min-w-[150px]">Tasks Completed</TableHead>
            <TableHead className="min-w-[150px]">Tasks Pending</TableHead>
            <TableHead className="min-w-[150px]">Status</TableHead>
            <TableHead className="min-w-[150px]">Today Work Hour</TableHead>
            <TableHead className="min-w-[150px]">Total Work Hour</TableHead>
            <TableHead className="min-w-[150px]">Email</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {employees.map((row, index) => (
            <TableRow
              key={row.id}
              className={`h-[60px] text-nowrap  text-[#344054] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-full">
                    <Image
                      src={row.profileImage || "/assets/user.png"}
                      width={40}
                      height={40}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-base font-medium ">{row.firstName}</h6>
                    <p className="text-sm font-normal ">{row.role}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {row.myProjects?.map((p, index) => (
                  <span key={index}>
                    {typeof p === "object" &&
                      (p.projectDetails?.projectName as string)}
                    {index < (row.myProjects?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </TableCell>
              <TableCell>{"idk"}</TableCell>
              <TableCell>{"idk"}</TableCell>
              <TableCell
                className={`${
                  row.workStatus === "loggedIn"
                    ? "!text-green-400"
                    : "!text-primary-blue"
                }`}
              >
                {row.workStatus}
              </TableCell>
              <TableCell>{"isk"}</TableCell>
              <TableCell>{"isk"}</TableCell>
              <TableCell className="text-primary-blue">{row.email}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ManageProjects
                        userProjects={row.myProjects as ProjectValues[]}
                        employee={row}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Dialog>
                        {/* Prevent DropdownMenu from closing */}
                        <DialogTrigger asChild>
                          <button
                            className="w-full text-left"
                            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                          >
                            Ban Employee
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <h2 className="text-lg font-semibold">
                            Ban Employee
                          </h2>
                          <p>Are you sure you want to ban this employee?</p>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button className="btn-cancel">Cancel</button>
                            <button className="btn-confirm">Confirm</button>
                          </div>
                        </DialogContent>
                      </Dialog>
                  
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ManageProjects
                        userProjects={row.myProjects as ProjectValues[]}
                        employee={row}
                      />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ManageProjects({
  userProjects,
  employee,
}: {
  userProjects: ProjectValues[];
  employee: CustomUser;
}) {
  const [projects, setProjects] = useState<ProjectValues[] | []>([]);


  useEffect(()=>{
    setProjects(userProjects)
  },[userProjects])

  console.log("project", projects);
  console.log("userProjects", userProjects);
  const [submitting, setSubmitting] = useState<boolean>(false);


  const handleProjectSelect = (project: ProjectValues) => {
    console.log("handleProjectSelect");
    setProjects((prevData) => [...prevData, project]);
  };

  const handleRemoveProject = (project: ProjectValues) => {
    setProjects((prevData) => prevData.filter((p) => p._id !== project._id));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSubmitting(true);
    // Prepare JSON payload

    const payload = {
      _id: employee._id,
      myProjects: projects.map((project) => project._id),
    };

    try {
      const response = await fetch(`/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit data");
      }

      const result = await response.json();
      document.getElementById("close")?.click();
      console.log("Submission successful:", result);

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
        <button
          className="w-full text-left"
          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
        >
          Manage Projects
        </button>
      </DialogTrigger>
      <DialogContent className="w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
        <h1 className="text-2xl font-semibold text-dark-gray">
          Manage Clients Projects
        </h1>
        <div className="flex flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Employee
            </Label>
            <input
              type="text"
              disabled
              value={`${employee.firstName} ${employee.lastName}`}
              className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Project working on
            </Label>
            <div className="w-full text-base h-[40px] flex flex-row flex-wrap">
              {Array.isArray(projects) && projects.map((project) => (
                <span
                  key={project._id}
                  className=" w-fit h-full flex items-center gap-1 shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4  text-base  "
                >
                  {project.projectDetails?.projectName}
                  <X size={20} onClick={() => handleRemoveProject(project)} />
                </span>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label className="text-base font-medium text-gray-800">
              Select project
            </Label>
            <ProjectSelect onSelect={handleProjectSelect} />
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

function ProjectSelect({
  onSelect,
}: {
  onSelect: (project: ProjectValues) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [proejct, setProject] = useState<ProjectValues[] | []>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const projectListRedux = useSelector(
    (state: RootState) => state.ceo.allProjectsList
  );

  useEffect(() => {
    async function getEmployees() {
      const res = await fetch("/api/project", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setProject(data.projects);
    }

    if (projectListRedux.length === 0) {
      getEmployees();
    } else {
      setProject(projectListRedux);
    }
  }, [projectListRedux]);

  // Filter projects based on search term
  const filteredProjects = proejct.filter((pj) =>
    [pj.projectDetails.projectName].some((field) =>
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

  const handleSelect = (project: ProjectValues) => {
    // setSelectedEmployee(employee);
    setSearchTerm(project.projectDetails.projectName);
    setIsOpen(false);
    onSelect(project);
  };

  return (
    <div ref={wrapperRef} className="relative w-full ">
      <div className="relative">
        <input
          type="text"
          className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
          placeholder="Search employee..."
          value={searchTerm}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setIsOpen(true)}}
        />
        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((pj) => (
              <div
                key={pj._id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSelect(pj)}
              >
                <div className="font-medium">
                  {pj.projectDetails.projectName}
                </div>
                <div className="text-sm text-gray-500">{""}</div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No project found</div>
          )}
        </div>
      )}
    </div>
  );
}
