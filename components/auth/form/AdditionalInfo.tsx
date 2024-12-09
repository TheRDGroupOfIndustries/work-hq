"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField"; // Adjust the import path as necessary
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types"; // Adjust the import path as necessary
import { useUser } from "@/context/UserProvider";

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phonePattern = /^\d{10}$/;

const AdditionalInfo: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const router = useRouter();

  const generateUsername = (firstName: string) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${firstName}${randomNum}`;
  };

  const [username, setUsername] = useState(user?.username || generateUsername(user?.firstName || ""));
  useEffect(() => {
    setUsername(user?.username || generateUsername(user?.firstName || ""));
  }, [user?.username, user?.firstName]);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const {SignUpRole : signUpRole } = useUser();
  useEffect(() => {
    if (user?.role === "client" && !user?.phone) {
      setPhone("");
    }
    if (user?.role === "client" && !user?.email) {
      setEmail("");
    }
  }, [user]);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (emailPattern.test(inputValue)) {
      setEmailError("");
      setDisableBtn(false);
    } else {
      setEmailError("Invalid email address");
      setDisableBtn(true);
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPhone(inputValue);

    if (phonePattern.test(inputValue)) {
      setPhoneError("");
      setDisableBtn(false);
    } else {
      setPhoneError("Invalid phone number");
      setDisableBtn(true);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.length >= 6) {
      setPasswordError("");
      setDisableBtn(false);
    } else {
      setPasswordError("Password must be at least 6 characters long");
      setDisableBtn(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || (!email && !phone) || (!user?.password && !password)) {
      return toast.error("Please fill all the required fields!");
    }

    setSubmitting(true);

    const submitInfo = async () => {
      try {
        const res = await fetch("/api/user/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: user._id,
            username,
            email: email || undefined,
            phone: phone || undefined,
            password: password || undefined,
            loginStep: 1,
            role: signUpRole, // Include the role from the cookie
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update user information");
        }

        const data = await res.json();

        setSuccess(true);
        console.log("Additional info submitted:", data.message);
        if(signUpRole === "client") {
          router.push("/welcome");
        } else if(signUpRole === "developer") {
          router.push("/wakaTime/auth");
        } else {
          router.push("/dashboard");
        }
        return data.message;
      } catch (error) {
        console.log("Error submitting additional info:", error);
        setSubmitting(false);
        throw new Error("Something went wrong, please try again!");
      }
    };

    toast.promise(submitInfo(), {
      loading: "Submitting...",
      success: "Information submitted successfully!",
      error: (err) => `${err.message}`,
    });
  };

  const handleGenerateUsername = () => {
    setUsername(generateUsername(user?.firstName || ""));
  };

  useEffect(() => {
    if (user?.loginStep === 1 && signUpRole === "client" ) {
      if (user?.allProjects?.length === 0)
      router.push("/c/welcome");
      else 
      router.push("/c/all-projects");
    } else if (user?.loginStep === 1 && signUpRole === "developer") {
      router.push("/wakaTime/auth");
    } else if (user?.loginStep === 1) {
      router.push("/c/all-projects");
    }
  }, [user?.loginStep, router, user?.allProjects?.length, signUpRole]);

  return (
    <>
    {/* <div className="w-full mb-4 text-center">Additional Information needed for {signUpRole}</div> */}
      <form onSubmit={handleSubmit} className="animate-fade-in space-y-4">
        <InputField
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              emailInputRef?.current?.focus();
            }
          }}
          required
        />
        <Button
          type="button"
          onClick={handleGenerateUsername}
          className=""
        >
          Generate Random Username
        </Button>

        {user?.role === "client" && !user?.phone && (
          <InputField
            type="text"
            name="phone"
            label="Phone (optional)"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handlePhone}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
            error={phoneError}
            inputRef={phoneInputRef}
            
          />
        )}

        {user?.role === "client" && !user?.email && (
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                phoneInputRef?.current?.focus();
              }
            }}
            error={emailError}
            inputRef={emailInputRef}
            required
          />
        )}

        {!user?.password && (
          <InputField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
            error={passwordError}
            inputRef={passwordInputRef}
            required
          />
        )}

        <Button
          disabled={disableBtn || submitting || success}
          type="submit"
          className={`w-full ${disableBtn && "animate-pulse"}`}
        >
          {submitting ? "Submitting..." : success ? "Submitted" : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default AdditionalInfo;