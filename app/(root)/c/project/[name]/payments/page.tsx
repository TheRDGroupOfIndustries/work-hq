import Payments from "@/components/pages/payments/client/Payments";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PaymentsPage() {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");

  return <Payments />;
}
