// import Home from "@/components/Home";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");
  redirect(`/c/all-projects`);
  return <main>client page</main>;
}
