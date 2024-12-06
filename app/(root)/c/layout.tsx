import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/client/Navbar";
import { ChatProvider } from "@/context/ChatProvider";
import { ROLE } from "@/tempData";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return (
    <>
      <ChatProvider>
        <Navbar role={ROLE} />
        {children}
      </ChatProvider>
    </>
  );
}
