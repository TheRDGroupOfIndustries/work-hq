import { redirect } from "next/navigation";

export default async function ProjectPage() {
  redirect(`/dev/all-projects`);
  return <div>ProjectPage</div>;
}
