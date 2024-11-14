"use client";

import { projectSections } from "@/lib/sections/projectSections";

export default function ProjectSectionPage({
  params,
}: {
  params: { project_id: string; section: string };
}) {
  return Array.isArray(projectSections)
    ? projectSections.map(
        (sec) => params.section === sec.id && <sec.sectionNode key={sec.id} />
      )
    : null;
}
