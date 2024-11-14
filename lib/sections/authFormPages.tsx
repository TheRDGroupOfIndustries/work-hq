import ForgetPassword from "@/components/auth/form/ForgetPassword";
import SignIn from "@/components/auth/form/SignIn";
import SignUp from "@/components/auth/form/SignUp";

export const authFormPages = [
  {
    id: "sign-in",
    head: "Sign In",
    href: "/auth/sign-in",
    sectionNode: SignIn,
  },
  {
    id: "sign-up",
    head: "Sign Up",
    href: "/auth/sign-up",
    sectionNode: SignUp,
  },
  {
    id: "forget-password",
    head: "Forget Password",
    href: "/admin/forget-password",
    sectionNode: ForgetPassword,
  },
];
