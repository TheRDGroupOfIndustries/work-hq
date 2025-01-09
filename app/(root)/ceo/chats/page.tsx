import Chats from "@/components/pages/chats/ceo/page";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ChatsPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/dev-sign-in");
  return <Chats />;
}
