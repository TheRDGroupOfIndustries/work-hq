import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProjectPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/sign-in");
  redirect("/project-id/dashboard");
  return <div>AdminPage</div>;
}
