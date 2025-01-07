import Navbar from "@/components/layout/ceo/Navbar";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import { ceoLinks, } from "@/constants/links";
import { SpecificProjectlayoutProps } from "@/lib/types";
import { ROLE } from "@/tempData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SpecificProjectlayout({
  params,
  children,
}: SpecificProjectlayoutProps)  {
    const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return (
    <>
      <Navbar role={ROLE} />
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar links={ceoLinks} _id={params._id} />
        {children}
      </div>
    </>
  );
}
