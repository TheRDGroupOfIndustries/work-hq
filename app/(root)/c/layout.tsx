import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ChatProvider } from "@/context/ChatProvider";
import { Role } from "@/types";
import Navbar from "@/components/layout/client/Navbar";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return (
    <>
      <ChatProvider>
        <Navbar role={session?.user?.role as Role} />
        {children}
      </ChatProvider>
    </>
  );
}
