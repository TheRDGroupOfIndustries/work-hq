import ProjectLayout from "@/components/project/layout/ProjectLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProjectLayoutRoute({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { project_id: string };
}>) {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  console.log(params);
  return (
    <>
      <ProjectLayout>{children}</ProjectLayout>
    </>
  );
}
