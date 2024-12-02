"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { emailPattern } from "./SignIn";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [condition, setCondition] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setCondition(true);
    } else {
      setCondition(false);
      if (!emailPattern.test(inputValue)) {
        toast.error("Please provide valid email!");
      } else {
        toast.success("Valid Email!");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log("email: ", email);
    if (!emailPattern.test(email)) {
      setCondition(false);
      return toast.error("Please provide valid email!");
    }
    try {
      setDisableBtn(true);
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setDisableBtn(false);
        return toast.error("This e-mail doesn't exists");
      }
      if (res.status === 401) {
        setDisableBtn(false);
        toast.error("You haven't sign up with email & password!");
        return router.push("/auth/sign-up");
      }
      if (res.status === 200) {
        setDisableBtn(true);
        toast.success("Check your e-mail!");
        return router.push("/auth/c-sign-in");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmail}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
          className="input-style"
        />
        <div className="w-full h-fit py-0.5 overflow-hidden">
          <span
            className={
              condition == true ? "flex animate-slide-down text-xs" : "hidden"
            }
          >
            Please provide registered email, ex: xyz@gmail.com
          </span>
        </div>

        <Button
          disabled={disableBtn}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {disableBtn ? "Verifying email..." : "Rest password"}
        </Button>
      </form>
    </>
  );
};

export default ForgetPassword;
