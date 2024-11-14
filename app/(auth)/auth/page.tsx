import { redirect } from "next/navigation";

export default function AuthPage() {
  redirect("/auth/sign-in");
  return <div>AuthPage</div>;
}
