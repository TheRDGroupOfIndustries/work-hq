"use client"
import Container from "@/components/reusables/Container";
import SquareButton from "@/components/reusables/squareButton";
import { Download } from "lucide-react";
export default function ProjectScope() {
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
        <div className="w-full flex flex-row items-center justify-end">
          <SquareButton
            className="text-[#6A6A6A]"
            onClick={() => {
              console.log("Download");
            }}
          >
            <Download color="#6A6A6A" />
            Download
          </SquareButton>
        </div>
      </Container>
  )
}
