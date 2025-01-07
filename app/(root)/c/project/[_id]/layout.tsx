import { clientLinks } from "@/constants/links";
import { SpecificProjectlayoutProps } from "@/lib/types";
import Project from "@/components/layout/client/project/Project";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SpecificProjectlayout({
  params,
  children,
}: SpecificProjectlayoutProps) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");
  return (
    <div className="min-h-[calc(100vh-80px)] h-full flex flex-row">
      <DesktopSidebar links={clientLinks} _id={params._id} />
      <Project projectId={params._id}>{children}</Project>
    </div>
  );
}
