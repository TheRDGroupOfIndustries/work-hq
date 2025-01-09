import Chats from "@/components/pages/chats/client/page";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function ChatsPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");
  return <Chats />;
}
