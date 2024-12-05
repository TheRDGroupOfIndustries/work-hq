// import DesktopSidebar from "@/components/layout/client/desktopSidebar";
import Navbar from "@/components/layout/client/Navbar";
import { ChatProvider } from "@/context/ChatProvider";
import { ROLE } from "@/tempData";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ChatProvider>
        <Navbar role={ROLE} />
        {children}
      </ChatProvider>
    </>
  );
}
