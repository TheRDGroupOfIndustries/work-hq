import AdditionalInfo from "@/components/auth/form/AdditionalInfo";
// import DevSignUp from "@/components/auth/form/DevSignUp";
import ForgetPassword from "@/components/auth/form/ForgetPassword";
import SignIn from "@/components/auth/form/SignIn";
import SignUp from "@/components/auth/form/SignUp";

export const authFormPages = [
  // Sign In forms
  {
    id: "c-sign-in", // Updated id to match href
    head: "Sign In For Client Side", // Changed to reflect client sign-in
    href: "/auth/c-sign-in", // Updated href
    sectionNode: SignIn,
    type: "signIn", // Added type for sign in
    role: "client", // Added role for client sign in
  },
  {
    id: "vc-sign-in", // Updated id to match href
    head: "Sign In For Vendor Client", // Changed to reflect vendor client sign-in
    href: "/auth/vc-sign-in", // Updated href
    sectionNode: SignIn,
    type: "signIn", // Added type for sign in
    role: "vendorClient", // Added role for vendor client sign in
  },
  {
    id: "dev-sign-in", // Updated id to match href
    head: "Sign In For Developer Side", // Changed to reflect developer sign-in
    href: "/auth/dev-sign-in", // Updated href
    sectionNode: SignIn,
    type: "signIn", // Added type for sign in
    role: "developer", // Added role for developer sign in
  },
  {
    id: "v-sign-in", // Updated id to match href
    head: "Sign In For Vendor Side", // Changed to reflect vendor sign-in
    href: "/auth/v-sign-in", // Updated href
    sectionNode: SignIn,
    type: "signIn", // Added type for sign in
    role: "vendor", // Added role for vendor sign in
  },

  // Sign up forms
  {
    id: "c-sign-up", // Updated id to match href
    head: "Sign Up For Client Side", // Changed to reflect client sign-up
    href: "/auth/c-sign-up", // Updated href
    sectionNode: SignUp,
    type: "signUp", // Added type for sign up
    role: "client", // Added role for client sign up
  },
  {
    id: "vc-sign-up", // Updated id to match href
    head: "Sign Up For Vendor Client", // Changed to reflect vendor client sign-up
    href: "/auth/vc-sign-up", // Updated href
    sectionNode: SignUp,
    type: "signUp", // Added type for sign up
    role: "vendorClient", // Added role for vendor client sign up
  },
  {
    id: "v-sign-up", // Updated id to match href
    head: "Sign Up For Vendor Side", // Changed to reflect vendor sign-up
    href: "/auth/v-sign-up", // Updated href
    sectionNode: SignUp,
    type: "signUp", // Added type for sign up
    role: "vendor", // Added role for vendor sign up
  },
  {
    id: "dev-sign-up", // Updated id to match href
    head: "Sign Up For Developer Side", // Changed to reflect developer sign-up
    href: "/auth/dev-sign-up", // Updated href
    sectionNode: SignUp,
    type: "signUp", // Added type for sign up
    role: "developer", // Added role for developer sign up
  },

  {
    id: "additional-step", // No change needed
    head: "Additional Step", // No change needed
    href: "/auth/additional-step", // No change needed
    sectionNode: AdditionalInfo,
    type: "additionalInfo", // Added type for additional info
    role: null, // No specific role for additional step
  },
  {
    id: "forget-password", // No change needed
    head: "Forget Password", // No change needed
    href: "/admin/forget-password", // No change needed
    sectionNode: ForgetPassword,
    type: "forgetPassword", // Added type for forget password
    role: null, // No specific role for forget password
  },
];