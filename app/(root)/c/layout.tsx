// import DesktopSidebar from "@/components/layout/client/desktopSidebar";
import Navbar from "@/components/layout/client/nevbar";
import { ROLE } from "@/tempData";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar role={ROLE} />
      {children}
    </>
  );
}
