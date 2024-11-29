import DesktopSidebar from "@/components/layout/client/desktopSidebar";
import Navbar from "@/components/layout/client/nevbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar />
        {children}
      </div>
    </>
  );
}
