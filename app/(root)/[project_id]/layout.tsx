import ProjectLayout from "@/components/project/layout/ProjectLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProjectLayoutRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  return (
    <>
      <ProjectLayout>{children}</ProjectLayout>
    </>
  );
}
