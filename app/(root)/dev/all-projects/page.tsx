import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AllProjects from "@/components/pages/all-projects/dev/AllProjects";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/dev-sign-in");

  return <AllProjects />;
}
