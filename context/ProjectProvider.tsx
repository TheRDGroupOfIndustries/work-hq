"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { CustomUser, ProjectValues } from "@/lib/types";

interface ProjectContextType {
  projectDetails: ProjectValues | null;
  userAllProjectsDetails: ProjectValues[];
  selectedProject: { _id: string; name: string };
  setSelectedProject: React.Dispatch<
    React.SetStateAction<{ _id: string; name: string }>
  >;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const [selectedProject, setSelectedProject] = useState<{
    _id: string;
    name: string;
  }>({ _id: "", name: "" });
  const [projectDetails, setProjectDetails] = useState<ProjectValues | null>(
    null
  );
  const [userAllProjectsDetails, setUserAllProjectsDetails] = useState<
    ProjectValues[]
  >([]);

  // Fetch details for all projects when the user has any projects
  useEffect(() => {
    const fetchAllProjectsDetails = async () => {
      if (user?.allProjects && user.allProjects.length > 0) {
        try {
          const projectDetailsPromises = user.allProjects.map(
            async (projectId) => {
              const res = await fetch(
                `/api/project/get/getByProjectID/${projectId}`
              );
              const data = await res.json();
              return data.project;
            }
          );
          const allProjectsDetails = await Promise.all(projectDetailsPromises);
          setUserAllProjectsDetails(allProjectsDetails);
        } catch (error) {
          console.error("Error fetching all project details:", error);
        }
      }
    };

    fetchAllProjectsDetails();
  }, [user?.allProjects]);

  // Update projectDetails when selectedProject changes
  useEffect(() => {
    const selectedProjectDetails = userAllProjectsDetails.find(
      (project) => project._id === selectedProject._id
    );

    if (selectedProjectDetails) {
      setProjectDetails(selectedProjectDetails);
    } else {
      setProjectDetails(null);
    }
  }, [selectedProject, userAllProjectsDetails]);

  return (
    <ProjectContext.Provider
      value={{
        projectDetails,
        userAllProjectsDetails,
        selectedProject,
        setSelectedProject,
      }}
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
