"use client";
import DesktopSidebar from "@/components/layout/dev/desktopSidebar";
import { useProjectContext } from "@/context/ProjectProvider";
import { ROLE } from "@/tempData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { selectedProject } = useProjectContext();
  if (!selectedProject._id) {
    return <>{children}</>;
  }
  return (
    <>
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar role={ROLE} />
        {children}
      </div>
    </>
  );
}
