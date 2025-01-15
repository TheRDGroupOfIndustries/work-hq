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
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ProjectContextType {
  selectedProjectDetails: ProjectValues | null;
  setProjectDetails: React.Dispatch<React.SetStateAction<ProjectValues | null>>;
  selectedProjectTasks: TaskValues[];
  userAllProjects: ProjectValues[];
  selectedProject: { _id: string; name: string };
  setSelectedProject: React.Dispatch<
    React.SetStateAction<{ _id: string; name: string }>
  >;
  getSelectProjectDetails: (productId: string) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const router = useRouter();

  const [userAllProjects, setUserAllProjects] = useState<ProjectValues[]>([]);
  const [selectedProject, setSelectedProject] = useState<{
    _id: string;
    name: string;
  }>({ _id: "", name: "" });
  const [selectedProjectDetails, setProjectDetails] =
    useState<ProjectValues | null>(null);
  const [selectedProjectTasks, setProjectTasks] = useState<TaskValues[]>([]);

  const fetchUserProjects = useCallback(async () => {
    // if (user?.allProjects && user.allProjects.length > 0) {
    try {
      const SignUpRole = user.role;
      // const SignUpRole = Cookies.get("SignUpRole");
      console.log("Sign up role fetching: ", SignUpRole);
      const res = await fetch("/api/project/get/user-projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userProjectsIds:
            SignUpRole === "developer" ? user.myProjects : user.allProjects,
        }),
      });

      const data = await res.json();
      console.log("data: ", data);
      if (res.ok) {
        setUserAllProjects(data.projects); // Set the fetched projects
      } else {
        console.error("Error fetching user projects:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
    // }
  }, [user?.allProjects, user?.myProjects, user?.role]);

  const getSelectProjectDetails = useCallback(
    async (projectId: string) => {
      if (!projectId) return;
      try {
        const projectRes = await fetch(
          `/api/project/get/getByProjectID/${projectId}`
        );
        const projectDetailsData = await projectRes.json();

        if (!projectDetailsData.success || projectDetailsData.status === 404)
          router.replace("/c/all-projects");

        const taskRes = await fetch(
          `/api/task/get/getByProjectID/${projectId}`
        );
        const taskData = await taskRes.json();
        setProjectDetails(projectDetailsData.project as ProjectValues);
        setProjectTasks(taskData.tasks as TaskValues[]);

        setSelectedProject({
          _id: projectDetailsData.project._id || "",
          name: projectDetailsData.project.projectDetails.projectName || "",
        });
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    },
    [router]
  );

  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  useEffect(() => {
    getSelectProjectDetails(selectedProject._id);
  }, [getSelectProjectDetails, selectedProject._id]);

  return (
    <ProjectContext.Provider
      value={{
        selectedProjectDetails,
        setProjectDetails,
        selectedProjectTasks,
        userAllProjects,
        selectedProject,
        setSelectedProject,
        getSelectProjectDetails,
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
