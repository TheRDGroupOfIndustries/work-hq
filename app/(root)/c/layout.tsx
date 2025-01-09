import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ROLE } from "@/tempData";
import Navbar from "@/components/layout/client/Navbar";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return (
    <>
      <Navbar role={ROLE} />
      {children}
    </>
  );
}
