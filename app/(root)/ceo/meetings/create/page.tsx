
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import MeetingsRequest from "@/components/pages/meetings/create/ceo/page";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/auth/ceo-sign-in");

  return <MeetingsRequest />;
}