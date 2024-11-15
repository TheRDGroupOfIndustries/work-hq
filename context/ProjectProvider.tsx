"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { CustomUser, ProjectValues } from "@/lib/types";

interface ProjectContextType {
  selectedProject: { _id: string; title: string };
  projectDetails: ProjectValues | null;
  setProject: (id: string, title: string) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [selectedProject, setSelectedProject] = useState<ProjectContextType["selectedProject"]>(user?.projects?.[0] || { _id: "", title: "" });

  const [projectDetails, setProjectDetails] = useState<ProjectContextType["projectDetails"]>(null);
//   console.log("projectDetails", projectDetails);

  useEffect(() => {
    if (user?.projects) setSelectedProject(user.projects[0]);
    else setSelectedProject({ _id: "", title: "" });
  }, [user?.projects]);

  const getProjectDetails = async (_id: string) => {
    try {
      const res = await fetch(`/api/projects/${_id}`);
      const data = await res.json();
      //   console.log(data);

      setProjectDetails(data.project);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectDetails(selectedProject._id);
  }, [selectedProject._id]);

  const setProject = async (_id: string, title: string) => {
    setSelectedProject({ _id, title });
    getProjectDetails(_id);
  };

  return (
    <ProjectContext.Provider
      value={{ selectedProject, projectDetails, setProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
