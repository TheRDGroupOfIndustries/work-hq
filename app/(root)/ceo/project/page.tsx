import { redirect } from "next/navigation";

export default async function ProjectPage() {
  redirect(`/all-projects`);
  return <div>ProjectPage</div>;
}
