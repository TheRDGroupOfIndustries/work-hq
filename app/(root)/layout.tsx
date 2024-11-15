import ProjectProvider from "@/context/ProjectProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectProvider>
      <>{children}</>
    </ProjectProvider>
  );
}
