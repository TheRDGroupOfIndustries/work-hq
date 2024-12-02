"use client";

import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { authFormPages } from "@/lib/sections/authFormPages";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpRole } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { RootState } from "@/redux/rootReducer";

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  // const router = useRouter();
  const { status } = useSession();

  const dispatch = useDispatch();
  const SignUpRole = useSelector((state: RootState)=> state.auth.signUpRole);

  useEffect(()=>{
    if(!SignUpRole){
    const signUpRoleCookie = Cookies.get("SignUpRole");
    dispatch(setSignUpRole(signUpRoleCookie? signUpRoleCookie : "client"));
    }
  },[dispatch, SignUpRole])

  // Find the current form page based on the pathname
  const currentPage = authFormPages.find(page => pathname.includes(page.href));

  // Default header if no match is found
  const header = currentPage ? currentPage.head : "Authentication";

  // Determine the type for conditional rendering
  const type = currentPage ? currentPage.type : null;

  // Function to handle OAuth login with custom query parameters
  const handleOAuthSignIn = (provider: string) => {
    if (currentPage) {
      dispatch(setSignUpRole(currentPage.role));
      Cookies.set("SignUpRole", currentPage.role ? currentPage.role : "null");
    }
    signIn(provider);
  };

  return (
    <div className="w-full h-screen select-none flex-center flex-col">
      <div className="w-96 h-fit animate-slide-up p-6 rounded-lg border border-zinc-300 dark:border-zinc-800/50 border-opacity-30 shadow-md dark:shadow-muted hover:shadow-lg ease-in-out duration-300 overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-4 py-1 overflow-hidden">
          {header}
        </h1>

        {children}

        <div className="text-center mt-6">
          {type === "signIn" ? (
            <Link
              href="/auth/sign-up"
              className="group"
            >
              Don{"'"}t have an account?{" "}
              <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                Sign Up
              </span>
            </Link>
          ) : type === "signUp" ? (
            <Link
              href="/auth/sign-in"
              className="group"
            >
              Already have an account?{" "}
              <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                Log in
              </span>
            </Link>
          ) : null}
        </div>
        {(type === "signIn" || type === "signUp") && (
          <div className="w-full flex-center flex-col gap-2 mt-4 animate-fade-in">
            <div className="flex-center gap-1">
              <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
              <span className="text-[#8b8d93] font-semibold">OR</span>
              <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
            </div>
            <div className="w-full flex-between gap-2 px-10 animate-slide-up">
              <Button
                onClick={() => handleOAuthSignIn("google")}
                disabled={status === "loading"}
                title={status === "loading" ? "Logging in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FcGoogle size={20} />
              </Button>
              <Button
                onClick={() => handleOAuthSignIn("github")}
                disabled={status === "loading"}
                title={status === "loading" ? "Logging in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FaGithub size={20} />
              </Button>
              <Button
                onClick={() => handleOAuthSignIn("linkedin")}
                disabled={status === "loading"}
                title={status === "loading" ? "Logging in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FaLinkedin size={20} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

