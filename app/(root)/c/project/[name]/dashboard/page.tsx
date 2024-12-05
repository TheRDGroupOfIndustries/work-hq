import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/pages/c/dashboard/Dashboard";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return <Dashboard />;
}
