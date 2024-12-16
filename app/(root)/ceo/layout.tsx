import Navbar from "@/components/layout/ceo/Navbar";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import { ceoLinks, } from "@/constants/links";
import { SpecificProjectlayoutProps } from "@/lib/types";
import { ROLE } from "@/tempData";

export default function SpecificProjectlayout({
  params,
  children,
}: SpecificProjectlayoutProps)  {

  return (
    <>
      <Navbar role={ROLE} />
      <div className=" min-h-[calc(100vh-80px)] h-full   flex flex-row">
        <DesktopSidebar role={'ceo'} links={ceoLinks} _id={params._id} />
        {children}
      </div>
    </>
  );
}
