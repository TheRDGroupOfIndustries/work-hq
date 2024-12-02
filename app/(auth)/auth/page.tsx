import { redirect } from "next/navigation";

export default function AuthPage() {
  redirect("/auth/c-sign-in");
  return <div>AuthPage</div>;
}
