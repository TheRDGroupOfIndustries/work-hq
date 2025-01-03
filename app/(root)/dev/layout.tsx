import Navbar from "@/components/layout/dev/Navbar";
import { ROLE } from "@/tempData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");
  return (
    <>
      <Navbar role={ROLE} />
      {children}
    </>
  );
}
