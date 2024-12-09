import { ROLE } from "@/tempData";
import Project from "@/components/layout/client/project/Project";
import DesktopSidebar from "@/components/layout/client/desktopSidebar";

export interface SpecificProjectlayoutProps {
  children: React.ReactNode;
  params: { _id: string };
}

export default function SpecificProjectlayout({
  params,
  children,
}: SpecificProjectlayoutProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] h-full flex flex-row">
      <DesktopSidebar role={ROLE} />
      <Project projectId={params._id}>{children}</Project>
    </div>
  );
}
