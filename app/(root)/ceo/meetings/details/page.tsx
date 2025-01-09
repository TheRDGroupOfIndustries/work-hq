import MeetingsDetails from "@/components/pages/meetings/details/ceo/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/ceo-sign-in");

  return <MeetingsDetails />;
}