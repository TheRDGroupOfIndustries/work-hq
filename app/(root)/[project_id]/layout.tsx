import ProjectLayout from "@/components/project/layout/ProjectLayout";

export default async function ProjectLayoutRoute({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { project_id: string };
}>) {
  console.log(params);
  return (
    <>
      <ProjectLayout>{children}</ProjectLayout>
    </>
  );
}
