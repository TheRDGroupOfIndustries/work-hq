"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomUser, ProjectValues, TaskValues } from "@/lib/types";
import Cookies from "js-cookie";

interface ProjectContextType {
  selectedProjectDetails: ProjectValues | null;
  selectedProjectTasks: TaskValues | null;
  userAllProjects: ProjectValues[];
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

  const [userAllProjects, setUserAllProjects] = useState<ProjectValues[]>([]);
  const [selectedProject, setSelectedProject] = useState<{
    _id: string;
    name: string;
  }>({ _id: "", name: "" });
  const [selectedProjectDetails, setProjectDetails] =
    useState<ProjectValues | null>(null);
  const [selectedProjectTasks, setProjectTasks] = useState<TaskValues | null>(
    null
  );

  const fetchUserProjects = useCallback(async () => {
    // if (user?.allProjects && user.allProjects.length > 0) {
      try {
        const SignUpRole = Cookies.get("SignUpRole");
        console.log("Sign up role fetching: ", SignUpRole);
        const res = await fetch("/api/project/get/user-projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userProjectsIds: SignUpRole ==='developer'? user.myProjects : user.allProjects }),
        });

        const data = await res.json();
        if (res.ok) {
          setUserAllProjects(data.projects); // Set the fetched projects
        } else {
          console.error("Error fetching user projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    // }
  }, [user.allProjects, user.myProjects]);

  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  useEffect(() => {
    const selectedProjectDetails = userAllProjects.find(async (project) => {
      if (project._id === selectedProject._id) {
        const projectRes = await fetch(
          `/api/project/get/getByProjectID/${project._id}`
        );
        const taskRes = await fetch(
          `/api/task/get/getByProjectID/${project._id}`
        );
        const projectDetailsData = await projectRes.json();
        const taskData = await taskRes.json();
        setProjectDetails(projectDetailsData.project as ProjectValues);
        setProjectTasks(taskData.project as TaskValues);
      }
    });

    if (selectedProjectDetails) {
      setProjectDetails(selectedProjectDetails);
    } else {
      setProjectDetails(null);
    }
  }, [selectedProject, userAllProjects]);

  return (
    <ProjectContext.Provider
      value={{
        selectedProjectDetails,
        selectedProjectTasks,
        userAllProjects,
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
