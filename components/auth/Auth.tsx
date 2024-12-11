"use client";

import { signIn, useSession } from "next-auth/react";
import { usePathname} from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { authFormPages } from "@/lib/sections/authFormPages";
import Cookies from "js-cookie";
import BackgrounImg from "@/public/SignUp.png";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { useUser } from "@/context/UserProvider";
// import { RootState } from "@/redux/rootReducer";

const Auth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { status } = useSession();

  const {setSignUpRole} = useUser();
  // Find the current form page based on the pathname
  const currentPage = authFormPages.find(page => pathname.includes(page.href));

  // Default header if no match is found
  const header = currentPage ? currentPage.head : "Authentication";

  // Determine the type for conditional rendering
  const type = currentPage ? currentPage.type : null;

  // Function to handle OAuth login with custom query parameters
  const handleOAuthSignIn = (provider: string) => {
    if (currentPage) {
      Cookies.set("SignUpRole", currentPage.role? currentPage.role : "client");
      setSignUpRole(currentPage.role? currentPage.role : "client");
    }
    signIn(provider);
  };

  // Determine the sign-up and sign-in links based on signUpRole
  const signUpLink = authFormPages.find(page => page.type === "signUp" && page.role === currentPage?.role)?.href || "/auth/c-sign-up"; // Default link if not found
  const signInLink = authFormPages.find(page => page.type === "signIn" && page.role === currentPage?.role)?.href || "/auth/c-sign-in"; // Default link if not found

  // if(!currentPage){
  //    router.replace("/auth/c-sign-in");
  // }
  return (
    <div className="w-full select-none flex flex-row items-center bg-primary-sky-blue relative min-h-screen my-0">
     
      <div className="w-[40%] px-16 py-6 flex items-center justify-center h-full relative z-10 scale-[0.85]">
        <div className="w-full h-fit animate-slide-up rounded-lg border-opacity-30 ease-in-out duration-300 overflow-hidden max-w-[400px] min-w-[300px]">
          <div className=" w-40 mx-auto mb-4">
         <Image src={Logo} layout="responsive" objectFit="contain" quality={100} alt="Logo" />
         </div>
          <h1 className="text-2xl font-bold text-center mb-2 overflow-hidden">
            {header}
          </h1>
          <p className="text-center text-light-gray mb-4 overflow-hidden">
            Please enter your details
          </p>

          {children}

          <div className="text-center mt-6">
            {type === "signIn" ? (
              <Link href={signUpLink} className="group">
                Don{"'"}t have an account?{" "}
                <span className="group-hover:text-primary-green group-hover:underline underline-offset-8 ease-in-out duration-300">
                  Sign Up
                </span>
              </Link>
            ) : type === "signUp" ? (
              <Link href={signInLink} className="group">
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
              <div className="w-full flex-between gap-2 px-0 animate-slide-up">
                <Button
                variant={"white"}
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={status === "loading"}
                  title={status === "loading" ? "Logging in..." : "Login"}
                  size="fullIcon"
                  className="text-md"
                >
                  <FcGoogle size={20} />
                </Button>
                <Button
                variant={"white"}
                  onClick={() => handleOAuthSignIn("github")}
                  disabled={status === "loading"}
                  title={status === "loading" ? "Logging in..." : "Login"}
                  size="fullIcon"
                  className="text-md"
                >
                  <FaGithub size={20} />
                </Button>
                <Button
                variant={"white"}
                  onClick={() => handleOAuthSignIn("linkedin")}
                  disabled={status === "loading"}
                  title={status === "loading" ? "Logging in..." : "Login"}
                  size="fullIcon"
                  className="text-md"
                >
                  <FaLinkedin size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative w-[60%] h-full left-10">
      </div>
    
      <div className="fixed w-[60%] h-screen top-0 bottom-0 -right-10">
        <Image src={BackgrounImg} layout="fill" objectFit="cover" quality={100} alt="Auth background" />
      </div>
      <div className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0" style={{
        background: "linear-gradient(135deg, rgba(0,32,146,0) 0%,rgba(21,94,239,0.05) 46%, rgba(21,94,239,0.4) 100%)"
      }}/>
    </div>
  );
};

export default Auth;

