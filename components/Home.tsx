"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { CustomUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { CustomUser } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpRole } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { RootState } from "@/redux/rootReducer";

export default function Home() {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const router = useRouter();
  const dispatch = useDispatch();

  const SignUpRole = useSelector((state: RootState) => state.auth.signUpRole);

  useEffect(() => {
    if (!SignUpRole) {
      const signUpRoleCookie = Cookies.get("SignUpRole");
      dispatch(setSignUpRole(signUpRoleCookie ? signUpRoleCookie : "client"));
    }
  }, [dispatch, SignUpRole]);

  useEffect(() => {
    // if (prevSessionRef.current !== session) {
    console.log("session", session);
    //   prevSessionRef.current = session;
    // }
  }, [session]);

  useEffect(() => {
    // console.log("Sign Up Role", SignUpRole);
    if (!SignUpRole || SignUpRole === "null") {
      return router.replace("/auth/c-sign-in");
    }
    if (status === "unauthenticated") {
      router.replace("/auth/c-sign-in");
    } else if (user?.loginStep === 0) {
      router.replace("/auth/additional-step");
    } else if (user?.loginStep === 1) {
      if (user?.allProjects?.length === 0 && SignUpRole === "client") {
        router.replace("/add-project");
      } else if (SignUpRole === "developer" && !user?.wakaTime?.access_token) {
        router.replace("/wakaTime/auth");
      } else {
        // alert("Invalid user role");
        // router.replace("/");
      }
    }
  }, [status, user, router, SignUpRole]);

  return (
    <main className="w-full h-screen relative select-none flex-center flex-col gap-4 overflow-hidden">
      <div className="absolute top-2 left-2 flex-center gap-1 animate-slide-down">
        {/* <div className="text-xl md:text-2xl lg:text-3xl font-semibold">
          <span className="text-primary">Work</span>
        </div> */}
        <Image
          src="/logo.png"
          alt="logo"
          width="100"
          height="100"
          priority
          className="w-fit h-fit overflow-hidden"
        />
      </div>
      <div className="space-x-2 animate-fade-in">
        <div className="flex-center flex-col gap-4">
          {session?.user && (
            <div className="flex-center flex-col space-y-2 overflow-hidden">
              <div className="flex items-center gap-2 animate-slide-up bg-white/15 backdrop-blur-sm rounded-xl shadow px-4 py-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={
                      user?.profileImage ??
                      user?.profileImage ??
                      "/assets/user.png"
                    }
                    alt="Profile Image"
                    width="100"
                    height="100"
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                </div>
                <div className="block w-fit h-fit space-y-1">
                  <h4 className="line-clamp-1">
                    {user?.firstName ?? user?.firstName ?? "user name"}
                  </h4>
                  <h6 className="text-xs line-clamp-1">{user?.role}</h6>
                </div>
              </div>
              {user?.allProjects?.length && user?.allProjects?.length > 0 ? (
                <Link href="/c/all-projects" className="mt-4 animate-slide-up">
                  <Button type="button" size="lg" variant="outline">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/add-project" className="mt-4 animate-slide-up">
                  <Button type="button" size="lg" variant="outline">
                    Add Project
                  </Button>
                </Link>
              )}
            </div>
          )}
          <Button
            onClick={() => {
              if (status === "unauthenticated") {
                router.push("/auth/c-sign-in");
              } else {
                signOut();
              }
            }}
            variant={status === "authenticated" ? "destructive" : "default"}
            disabled={status === "loading"}
            title={status === "authenticated" ? "Logout" : "Login"}
            size="lg"
            className="text-lg"
          >
            {status === "loading"
              ? "Loading..."
              : status === "unauthenticated"
              ? "Login"
              : "Logout"}
          </Button>
        </div>
      </div>
    </main>
  );
}
