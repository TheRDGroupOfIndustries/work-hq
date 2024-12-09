"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectProvider";
import Loader from "@/components/ui/Loader";

const Project = ({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: string;
}) => {
  const router = useRouter();
  const { selectedProject, getSelectProjectDetails, selectedProjectDetails } =
    useProjectContext();

  if (!projectId) router.replace("/c/all-projects");

  if (!selectedProject._id) getSelectProjectDetails(projectId);

  if (!selectedProjectDetails) return <Loader />;

  return <>{children}</>;
};

export default Project;
