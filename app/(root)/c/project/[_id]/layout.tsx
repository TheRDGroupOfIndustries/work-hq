import { clientLinks } from "@/constants/links";
import { SpecificProjectlayoutProps } from "@/lib/types";
import Project from "@/components/layout/client/project/Project";
import DesktopSidebar from "@/components/layout/DesktopSidebar";

export default function SpecificProjectlayout({
  params,
  children,
}: SpecificProjectlayoutProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] h-full flex flex-row">
      <DesktopSidebar role={'client'} links={clientLinks} _id={params._id} />
      <Project projectId={params._id}>{children}</Project>
    </div>
  );
}
