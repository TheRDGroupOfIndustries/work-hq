"use client";
import DesktopSidebar from "@/components/layout/client/desktopSidebar";
import { useProjectContext } from "@/context/ProjectProvider";
import { ROLE } from "@/tempData";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const { selectedProject } = useProjectContext()


  // if (!selectedProject._id) router.push("/c/all-projects");
  return (
    <>
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar role={ROLE} />
        {children}
      </div>
    </>
  );
}
