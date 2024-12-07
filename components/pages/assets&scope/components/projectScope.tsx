"use client";

import { useProjectContext } from "@/context/ProjectProvider";
import { ROLE } from "@/tempData";
import Container from "@/components/reusables/wrapper/Container";
import SquareButton from "@/components/reusables/wrapper/squareButton";
import { Download } from "lucide-react";

export default function ProjectScope() {
  const { selectedProjectDetails } = useProjectContext();

  return (
    <Container>
      <h3 className="uppercase text-lg font-semibold">
        Download Project Scope
      </h3>
      <p className="text-[#6A6A6A] text-base font-normal">
        This is the csv file extracted from the detail requirement provided by
        you during the project intialization. For suggesting any more changes,
        raise a ticket through Helpdesk or contact Project Manager.
      </p>
      <div
        title="Download scope file"
        className="w-full flex flex-row items-center justify-end"
      >
        <SquareButton
          role={ROLE}
          className="!text-[#6A6A6A]"
          onClick={() => {
            const scopeFileLink = selectedProjectDetails?.projectDetails?.scope;
            if (scopeFileLink) {
              window.open(scopeFileLink, "_blank");
            } else {
              console.log("No file link available");
            }
          }}
        >
          <Download color="#6A6A6A" />
          Download
        </SquareButton>
      </div>
    </Container>
  );
}
