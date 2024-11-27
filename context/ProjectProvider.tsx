"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { CustomUser, ProjectValues } from "@/lib/types";

interface ProjectContextType {
  selectedProject: string;
  projectDetails: ProjectValues | null;
  setProject: (id: string) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [selectedProject, setSelectedProject] = useState<ProjectContextType["selectedProject"]>(() => {
    if (user?.allProjects && user.allProjects.length > 0) {
      return user.allProjects[user.allProjects.length - 1];
    } else {
      return "";
    }
  });

  const [projectDetails, setProjectDetails] = useState<ProjectContextType["projectDetails"]>(null);

  useEffect(() => {
    if (user?.allProjects && user.allProjects.length > 0) 
      setSelectedProject(user.allProjects[user.allProjects.length - 1]);
    else 
      setSelectedProject("");
  }, [user?.allProjects]);

  const getProjectDetails = async (_id: string) => {
    try {
      const res = await fetch(`/api/allProjects/${_id}`);
      const data = await res.json();
      setProjectDetails(data.project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedProject)
      getProjectDetails(selectedProject);
  }, [selectedProject]);

  const setProject = async (_id: string) => {
    setSelectedProject(_id);
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