import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SpecificProjectPage(params: { _id: string }) {
  const session = await getServerSession();
  if (!session) redirect("/auth/c-sign-in");
  redirect(`/c/project/${params._id}/dashboard`);
  return <div>ProjectPage</div>;
}
