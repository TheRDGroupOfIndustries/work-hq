import HomePage from "@/components/pages/c/dashboard/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return <HomePage />;
}
