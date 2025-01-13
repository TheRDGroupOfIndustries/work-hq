"use client";
import Container from "@/components/reusables/wrapper/Container";
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
import { ProjectValues } from "@/lib/types";
import {  MoreVertical } from "lucide-react";
import React from "react";

export default function ProjectList({
  list,
  // employee,
}: {
  list: ProjectValues[];
  // employee: CustomUser;
}) {
  return (
    <Container className="p-4 flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <div className="flex flex-col flex-1">
          <h1 className="text-lg uppercase">Projects</h1>
          <h1 className="text-base ">Total Projects - {list.length}</h1>
        </div>
        {/* <ManageProjects userProjects={list} employee={employee}/> */}
      </div>
      <DataTable list={list} />
    </Container>
  );
}

function DataTable({ list }: { list: ProjectValues[] }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className=" text-gray-600 border-0">
          <TableRow className=" border-0 hover:bg-transparent border-r-[20px] border-l-[20px] border-transparent border-b-0">
            <TableHead className=""></TableHead>
            <TableHead className="">Project Name</TableHead>
            <TableHead className="">Project ID</TableHead>
            <TableHead className="">Time Spent</TableHead>
            <TableHead className="">Tasks Completed</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#3A3A3A] max-h-[400px] text-base border-0 mb-5 px-10 overflow-hidden  ">
          {list.map((row, index) => (
            <TableRow
              key={index || row._id}
              className={`h-[60px]  text-[#1E1B39] hover:bg-transparent rounded-lg mb-5 border-l-[20px] border-transparent border-b-0 `}
            >
              <TableCell className=" ">{`${index + 1}.`}</TableCell>
              <TableCell>{row.projectDetails.projectName}</TableCell>
              <TableCell>{row.projectID}</TableCell>
              <TableCell>
                {row.developmentDetails.projectHours
                  ? row.developmentDetails.projectHours.reduce(
                      (total, item) => total + item.totalHours,
                      0
                    )
                  : 0}
              </TableCell>
              <TableCell>{44}</TableCell>
              <TableCell>{row.developmentDetails.status}</TableCell>
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
    </div>
  );
}

// For now we dont need this feature

// function ManageProjects({
//   userProjects,
//   employee,
// }: {
//   userProjects: ProjectValues[];
//   employee: CustomUser;
// }) {
//   const [projects, setProjects] = useState<ProjectValues[] | []>([]);
//   const [newProjects, setNewProjects] = useState<ProjectValues[] | []>([]);

//   useEffect(() => {
//     setProjects(userProjects);
//   }, [userProjects]);

//   const [submitting, setSubmitting] = useState<boolean>(false);

//   const handleProjectSelect = (project: ProjectValues) => {
//     // console.log("handleProjectSelect");
//     setProjects((prevData) => {
//       if (prevData.some((p) => p._id === project._id)) {
//         return prevData
//       } else {
//         return [...prevData, project];
//       }
//     });

//     setNewProjects((prevData) => {
//       if (prevData.some((p) => p._id === project._id)) {
//         return prevData
//       } else {
//         return [...prevData, project];
//       }
//     });
//   };

//   const handleRemoveProject = (
//     project: ProjectValues,
//     e: React.MouseEvent<SVGSVGElement, MouseEvent>
//   ) => {
//     e.stopPropagation();
//     setProjects((prevData) => prevData.filter((p) => p._id !== project._id));
//   };

//   const handleSubmit = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();
//     setSubmitting(true);
//     // Prepare JSON payload

//     const payload = {
//       _id: employee._id,
//       myProjects: newProjects.map((project) => project._id),
//     };

//     try {

//       const response = await fetch(`/api/user/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to submit data");
//       }

//       const result = await response.json();
//       document.getElementById("close")?.click();
//       console.log("Submission successful:", result);

//       // alert("Data submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Failed to submit data");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Dialog>
//       {/* Prevent DropdownMenu from closing */}
//       <DialogTrigger asChild>
//         <SquareButton
//           className=""
//         >
//           Manage Projects
//         </SquareButton>
//       </DialogTrigger>
//       <DialogContent className="w-[733px] m-4 bg-primary-sky-blue flex flex-col gap-6 rounded-3xl p-5 lg:p-6">
//         <h1 className="text-2xl font-semibold text-dark-gray">
//           Manage Clients Projects
//         </h1>
//         <div className="flex flex-col gap-3">
//           <div className="w-full flex flex-col gap-3">
//             <Label className="text-base font-medium text-gray-800">
//               Employee
//             </Label>
//             <input
//               type="text"
//               disabled
//               value={`${employee.firstName} ${employee.lastName}`}
//               className="w-full text-base h-[40px] outline-none shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4"
//               required
//             />
//           </div>
//           <div className="w-full flex flex-col gap-3">
//             <Label className="text-base font-medium text-gray-800">
//               Project working on
//             </Label>
//             <div className="w-full text-base h-[40px] flex flex-row flex-wrap">
//               {Array.isArray(projects) &&
//                 projects.map((project) => (
//                   <span
//                     key={project._id}
//                     className=" w-fit h-full flex items-center gap-1 shadow-[3px_3px_3px_0px_#789BD399,-3px_-3px_5px_0px_#FFFFFF] bg-transparent rounded-lg px-4  text-base  "
//                   >
//                     {project.projectDetails?.projectName}
//                     <X
//                       size={20}
//                       onClick={(e) => handleRemoveProject(project, e)}
//                     />
//                   </span>
//                 ))}
//             </div>
//           </div>
//           <div className="w-full flex flex-col gap-3">
//             <Label className="text-base font-medium text-gray-800">
//               Select project
//             </Label>
//             <ProjectSelect onSelect={handleProjectSelect} />
//           </div>
//         </div>
//         <div className="flex flex-row gap-2 justify-end">
//           <DialogClose asChild>
//             <SquareButton id="close" className="text-[#6A6A6A] w-fit self-end">
//               Cancel
//             </SquareButton>
//           </DialogClose>
//           <button
//             onClick={(e) => handleSubmit(e)}
//             disabled={submitting}
//             className="flex flex-row items-center py-3 px-5 gap-2 shadow-neuro-9 rounded-xl text-[#ffffff] text-nowrap bg-primary-blue disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {submitting ? (
//               <Loader2 className="w-6 h-6 animate-spin" />
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function ProjectSelect({
//   onSelect,
// }: {
//   onSelect: (project: ProjectValues) => void;
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [proejct, setProject] = useState<ProjectValues[] | []>([]);

//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const projectListRedux = useSelector(
//     (state: RootState) => state.ceo.allProjectsList
//   );

//   useEffect(() => {
//     async function getEmployees() {
//       const res = await fetch("/api/project", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();

//       setProject(data.projects);
//     }

//     if (projectListRedux.length === 0) {
//       getEmployees();
//     } else {
//       setProject(projectListRedux);
//     }
//   }, [projectListRedux]);

//   // Filter projects based on search term
//   const filteredProjects = proejct.filter((pj) =>
//     [pj.projectDetails.projectName].some((field) =>
//       field?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (project: ProjectValues) => {
//     // setSelectedEmployee(employee);
//     setSearchTerm(project.projectDetails.projectName);
//     setIsOpen(false);
//     onSelect(project);
//   };

//   return (
//     <div ref={wrapperRef} className="relative w-full ">
//       <div className="relative">
//         <input
//           type="text"
//           className="w-full text-base h-[40px] outline-none shadow-neuro-3 bg-transparent rounded-lg px-4"
//           placeholder="Search employee..."
//           value={searchTerm}
//           // onClick={(e) => e.stopPropagation()}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onFocus={() => {
//             setIsOpen(true);
//           }}
//         />
//         <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
//           {filteredProjects.length > 0 ? (
//             filteredProjects.map((pj) => (
//               <div
//                 key={pj._id}
//                 className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
//                 onClick={() => handleSelect(pj)}
//               >
//                 <div className="font-medium">
//                   {pj.projectDetails.projectName}
//                 </div>
//                 <div className="text-sm text-gray-500">{""}</div>
//               </div>
//             ))
//           ) : (
//             <div className="px-3 py-2 text-gray-500">No project found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
