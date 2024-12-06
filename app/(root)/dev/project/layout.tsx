"use client";
import DesktopSidebar from "@/components/layout/dev/desktopSidebar";
import { ROLE } from "@/tempData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar role={ROLE} />
        {children}
      </div>
    </>
  );
}
