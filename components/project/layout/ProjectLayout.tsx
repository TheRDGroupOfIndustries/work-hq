import { projectSections } from "@/lib/sections/projectSections";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex">
        <Sidebar sections={projectSections} />
        <div className="w-full h-[calc(100vh-58px)] overflow-x-hidden overflow-y-scroll">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ProjectLayout;
