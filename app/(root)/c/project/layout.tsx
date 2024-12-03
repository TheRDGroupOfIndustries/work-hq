import DesktopSidebar from "@/components/layout/client/desktopSidebar";
import { ROLE } from "@/tempData";

export default async function RootLayout({
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
