"use client";

import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/auth/sign-in";
  const isRegister = pathname === "/auth/sign-up";
  const isForgetPassword = pathname === "/auth/forget-password";
  const oAuth = isLogin || isRegister;
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <div className="w-full h-screen select-none flex-center flex-col">
      <div className="w-96 h-fit animate-slide-up p-6 rounded-lg border border-zinc-300 dark:border-zinc-800/50 border-opacity-30 shadow-md dark:shadow-muted hover:shadow-lg ease-in-out duration-300 overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin
            ? "Log In"
            : isRegister
            ? "Sign Up"
            : isForgetPassword
            ? "Forget Password"
            : "Reset Password"}
        </h1>

        {children}

        <div className="text-center mt-6">
          <Link
            href={isLogin ? "/auth/sign-up" : "/auth/sign-in"}
            className="group"
          >
            {isLogin ? (
              <>
                Don{"'"}t have an account?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Sign Up
                </span>
              </>
            ) : isRegister ? (
              <>
                Already have an account?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Log in
                </span>
              </>
            ) : (
              <>
                Remember password?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Log in
                </span>
              </>
            )}
          </Link>
        </div>
        {oAuth && (
          <div className="w-full flex-center flex-col gap-2 mt-4">
            <div className="flex-center gap-1">
              <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
              <span className="text-[#8b8d93] font-semibold">OR</span>
              <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
            </div>
            <div className="w-full flex-between gap-2 px-10">
              <Button
                onClick={() => signIn("google")}
                disabled={status === "loading"}
                title={status === "loading" ? "Loggin in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FcGoogle />
                {/* {status === "loading" ? "Loading..." : "Login"} */}
              </Button>
              <Button
                onClick={() => signIn("github")}
                disabled={status === "loading"}
                title={status === "loading" ? "Loggin in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FaGithub />
                {/* {status === "loading" ? "Loading..." : "Login"} */}
              </Button>
              <Button
                onClick={() => signIn("linkedin")}
                disabled={status === "loading"}
                title={status === "loading" ? "Loggin in..." : "Login"}
                size="icon"
                className="text-md"
              >
                <FaLinkedin />
                {/* {status === "loading" ? "Loading..." : "Login"} */}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
