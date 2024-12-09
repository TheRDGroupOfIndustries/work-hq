import { redirect } from "next/navigation";

export default async function ProjectPage() {
  redirect(`/c/all-projects`);
  return <div>ProjectPage</div>;
}
