"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session]);
  // const handleEmailOrPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let inputValue = e.target.value;
  //   setEmailOrPhone(inputValue);
  //   setEmail("");

  //   if (emailPattern.test(inputValue)) {
  //     setIsEmail(true);
  //     setEmail(inputValue);
  //     toast.success("Valid e-mail");
  //     setDisableBtn(false);
  //   } else {
  //     setIsEmail(false);

  //     if (/^\d+$/.test(inputValue)) {
  //       inputValue = inputValue.slice(0, 10);
  //       setEmailOrPhone(inputValue);
  //       if (inputValue.length === 10) toast.success("Valid phone number");

  //       setDisableBtn(inputValue.length !== 10);
  //     } else {
  //       setDisableBtn(true);
  //     }
  //   }
  // };

  const handleEmailOrPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setEmailOrPhone(inputValue);
    setEmail("");

    if (emailPattern.test(inputValue)) {
      console.log("Valid email");
      setIsEmail(true);
      setEmail(inputValue);
      setEmailError("");
      setDisableBtn(false);
    } else if(inputValue.length === 10 && /^\d+$/.test(inputValue)) {
      console.log("Valid phone number");
      if (/^\d+$/.test(inputValue)) {
        inputValue = inputValue.slice(0, 10);
        setEmailOrPhone(inputValue);
        if (inputValue.length === 10) {
          setEmailError("");
          toast.success("Valid phone number");
        }

        setDisableBtn(inputValue.length !== 10);
      } else {
        setDisableBtn(true);
      }
    } else{
      setDisableBtn(true);
      setEmail("");
      setEmailError("Invalid email or phone number");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  
    if (inputValue.trim() === "") {
      setPasswordError("Password is required.");
      setDisableBtn(true);
    } else if (!/(?=.*[a-z])/.test(inputValue)) {
      setPasswordError("Include at least one lowercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*[A-Z])/.test(inputValue)) {
      setPasswordError("Include at least one uppercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*\d)/.test(inputValue)) {
      setPasswordError("Include at least one digit.");
      setDisableBtn(true);
    } else if (!/(?=.*[@$!%*?&])/.test(inputValue)) {
      setPasswordError("Include at least one special character (@$!%*?&).");
      setDisableBtn(true);
    } else if (inputValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setDisableBtn(true);
    } else if (!passwordPattern.test(inputValue)) {
      setPasswordError("Invalid password.");
      setDisableBtn(true);
    } else {
      setPasswordError("");
      setDisableBtn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailOrPhone) {
      if (isEmail) {
        if (!email || !password) {
          return toast.error("Please provide your email and password!");
        } else {
          return toast.error("Please provide your email or phone number!");
        }
      } else {
        return toast.error("Please provide credentials!");
      }
    }

    setSubmitting(true);

    const login = async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: isEmail ? email : "",
          phone: !isEmail ? emailOrPhone : "",
          password,
        });
        // console.log("res:", res);

        if (res?.error) {
          console.log(res.error);
          setSubmitting(false);
          throw new Error(
            "User doesn't exist or Invalid e-mail/phone or password!"
          );
        }

        if (res?.url) {
          console.log(res?.url);

          setSubmitting(true);
          setSuccess(true);
          router.replace("/");
          return "Logged in successfully!";
        } else {
          setSubmitting(false);
          throw new Error("Something went wrong, please try again!");
        }
      } catch (error) {
        setSubmitting(false);
        throw error;
      }
    };

    toast.promise(login(), {
      loading: "Logging in...",
      success: "Logged in successfully!",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" animate-fade-in">
        <input
          type={isEmail ? "email" : "text"}
          name="email"
          placeholder="Email or Phone"
          required
          value={emailOrPhone}
          onChange={handleEmailOrPhone}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              passwordInputRef?.current?.focus();
            }
          }}
          className="input-style"
        />

        <div className="text-red-500 text-sm">{emailError}</div>
        <div className="input-style flex gap-2 cursor-text">
          <input
            type={showPass}
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassword}
            ref={passwordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showPass === "text") setShowPass("password");
              else setShowPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>
        <div className="text-red-500 text-sm mb-4">{passwordError}</div>
        <div className="flex justify-end text-sm font-medium font-[family-name:var(--font-geist-mono)] mb-4">
          <Link href="/auth/forget-password" className="hover-link">
            Forgot your password?
          </Link>
        </div>

        <Button
          disabled={disableBtn || submitting || success}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {submitting ? "Loggin..." : success ? "Logged in" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default SignIn;
