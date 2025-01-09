import MeetingsDetails from "@/components/pages/meetings/details/dev/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/dev-sign-in");

  return <MeetingsDetails />;
}