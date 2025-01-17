"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import InputField from "@/components/ui/InputField"; // Import InputField

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignIn: React.FC = () => {
  const router = useRouter();
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

  const handleEmailOrPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmailOrPhone(inputValue);

    if (emailPattern.test(inputValue)) {
      setEmailError("");
      setDisableBtn(false);
    } else if (inputValue.length === 10 && /^\d+$/.test(inputValue)) {
      setEmailError("");
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
      setEmailError("Invalid email or phone number");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.trim() === "") {
      setPasswordError("Password is required.");
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

    if (!emailOrPhone || !password) {
      return toast.error("Please provide your email/phone and password!");
    }

    setSubmitting(true);

    const login = async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: emailPattern.test(emailOrPhone) ? emailOrPhone : "",
          phone: !emailPattern.test(emailOrPhone) ? emailOrPhone : "",
          password,
        });

        if (res?.error) {
          setSubmitting(false);
          throw new Error("Invalid email/phone or password!");
        }

        if (res?.url) {
          setSuccess(true);
          router.replace("/Welcome");
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
      <form onSubmit={handleSubmit} className="animate-fade-in space-y-3">
        <InputField
          type={emailPattern.test(emailOrPhone) ? "email" : "text"}
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={handleEmailOrPhone}
          required
          label="Email or Phone"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              passwordInputRef.current?.focus();
            }
          }}
        />
        <div className="text-red-500 text-sm">{emailError}</div>

        <div className="relative">
          <InputField
            type={showPass}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            inputRef={passwordInputRef}
            label="Password"
            required
          />
          <div
            onClick={() => {
              setShowPass(showPass === "text" ? "password" : "text");
            }}
            className="absolute right-3 top-[60%] transform cursor-pointer"
          >
            {showPass === "text" ? (
              <FaRegEyeSlash size={20} className="text-primary-green" />
            ) : (
              <FaRegEye size={20} />
            )}
          </div>
        </div>
        <div className="text-red-500 text-sm mb-4">{passwordError}</div>

        <div className="flex justify-end text-sm font-medium mb-4">
          <Link href="/auth/forget-password" className="hover-link">
            Forgot your password?
          </Link>
        </div>

        <Button
          disabled={disableBtn || submitting || success}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {submitting ? "Logging in..." : success ? "Logged in" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default SignIn;