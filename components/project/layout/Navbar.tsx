
//* Old work done by 'gauravdubey19'
// "use client";

// import { useSession } from "next-auth/react";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { CustomUser } from "@/lib/types";
// import { Button } from "@/components/ui/button";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { useProjectContext } from "@/context/ProjectProvider";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const user = session?.user as CustomUser;
//   const { selectedProject, setProject } = useProjectContext();
//   const userProjects = user?.allProjects;

//   return (
//     <nav className="flex-between py-2 px-6 shadow">
//       <div className="flex-center gap-2 animate-slide-down">
//         <Link href="/" className="flex-center gap-1 animate-slide-down">
//           <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
//             <span className="text-primary">Work</span>
//           </div>
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width="100"
//             height="100"
//             priority
//             className="w-8 h-8 overflow-hidden"
//           />
//         </Link>
//         <div className="relative animate-slide-down">
//           <select
//             defaultValue={selectedProject}
//             onChange={(e) => {
//               const projectSelected = userProjects?.find(
//                 (project) => project === e.target.value
//               );
//               if (projectSelected) {
//                 setProject(projectSelected);
//               }
//             }}
//             className="flex-center cursor-pointer space-x-2 px-3 py-2 rounded shadow-lg"
//           >
//             {userProjects?.map((project) => (
//               <option
//                 key={project}
//                 value={project}
//                 className="cursor-pointer"
//               >
//                 {project}
//               </option>
//             ))}
//           </select>
//         </div>
//         <Link href="/c/add-project">
//           <Button className="animate-slide-down">Add Project</Button>
//         </Link>
//       </div>
//       <div className="flex-center gap-4 animate-slide-down">
//         <input
//           type="text"
//           placeholder="Search"
//           className="px-3 py-1 rounded shadow-lg mr-4"
//         />
//         <div className="ml-4 relative">
//           <IoNotificationsOutline size={24} />
//           <div className="absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 text-xs flex-center rounded-full">
//             5
//           </div>
//         </div>
//         <Image
//           src={user?.profile_image ?? user?.image ?? "/assets/user.png"}
//           alt="Profile Image"
//           width="100"
//           height="100"
//           className="w-10 h-10 rounded-full object-cover overflow-hidden"
//         />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
