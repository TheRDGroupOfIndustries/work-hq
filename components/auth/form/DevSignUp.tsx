"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailPattern, passwordPattern } from "./SignIn";
import { useSession } from "next-auth/react";

const DevSignUp: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [passwordError, setPasswordError] = useState("");
  const [ confirmPasswordError, setConfirmPasswordError] = useState("");
const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [checkOtpCode, setCheckOtpCode] = useState("");

  const [otpBtn, setOtpBtn] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [disableBtn, setDisableBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session]);
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

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpswd = e.target.value;

    if (cpswd !== password) {
      setDisableBtn(true);
      // toast.error("Mismatch password!");
      setConfirmPasswordError("Passwords does not match!");
    } else {
      setDisableBtn(false);
      // toast.success("Password matched!");
      setConfirmPasswordError("");
    }
    setConfirmPassword(cpswd);
  };

   const handleGetOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    if (
      !firstName ||
      !lastName ||
      !emailOrPhone ||
      !password ||
      !confirmPassword
    ) {
      // console.log(firstName, lastName, emailOrPhone, password, confirmPassword);
  
      return toast.error("Please fill all the fields!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
  
    setSendingOtp(true);
    // console.log("send otp");
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: isEmail ? email : "",
          phone: !isEmail ? emailOrPhone : "",
          isEmail,
          password,
          otp,
          checkOtpCode,
          role: "developer",
        }),
      });
  
      const data = await res.json();
      console.log("res1: ", res);
      console.log("data1: ", data);
  
      if (res.status === 400) {
        setSendingOtp(false);
        toast.error(`${email} is already registered!`);
      } else if (res.status === 201) {
        setCheckOtpCode(data.otpCode);
        setOtpBtn(true);
        setOtpSuccess(true);
        toast.success(`OTP has been sent to your ${email}, check your email!`);
      } else if (res.status === 200) {
        // User already exists, so redirect
        setSendingOtp(false);
        toast.error("User already exists!");
        router.push("/auth/c-sign-in");
      }
    } catch (error) {
      setSendingOtp(false);
      console.error("Error sending OTP:", error);
      toast.error("Something went wrong, please try again!");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !emailOrPhone ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all the fields!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords does not match!");
    }

    setSubmitting(true);

    const register = async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: isEmail ? email : "",
            phone: !isEmail ? emailOrPhone : "",
            isEmail,
            password,
            otp,
            checkOtpCode,
            role: "developer",
          }),
        });
        const data = await res.json();
        console.log("data: ",data);
        console.log("res: ",res);
        if (res.status === 400) {
          setSubmitting(false);
          throw new Error(`${emailOrPhone} is already registered!`);
        }
        if (res.status === 402) {
          console.log(res);

          setSubmitting(false);
          throw new Error(
            `InValid OTP has been entered for this ${emailOrPhone}!`
          );
        }

        if (res.status === 200) {
          setSuccess(true);
          router.push("/auth/c-sign-in");
          return "Registered successfully!";
        } else {
          setSubmitting(false);
          throw new Error("Something went wrong, please try again!");
        }
      } catch (error) {
        setSubmitting(false);
        console.log("Error registering user:", error);
        throw error;
      }
    };

    toast.promise(register(), {
      loading: "Registering...",
      success: "Registered successfully!",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <>
      <form className="space-y-2 animate-fade-in">
        <div className="w-full grid md:grid-cols-2 gap-2">
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            disabled={otpBtn && otpSuccess}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                lastNameInputRef.current?.focus();
              }
            }}
            className="input-style"
          />
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            disabled={otpBtn && otpSuccess}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            ref={lastNameInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                emailInputRef.current?.focus();
              }
            }}
            className="input-style"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email or Phone"
          disabled={otpBtn && otpSuccess}
          required
          value={emailOrPhone}
          onChange={handleEmailOrPhone}
          ref={emailInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              passwordInputRef.current?.focus();
            }
          }}
          className="input-style"
        />
        <div className="text-red-500 text-sm">{emailError}</div>
        <div
          className={`input-style flex gap-2 ${!otpSuccess && "cursor-text"}`}
        >
          <input
            type={showPass}
            name="password"
            placeholder="Password"
            disabled={otpBtn && otpSuccess}
            required
            value={password}
            onChange={handlePassword}
            ref={passwordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                confirmPasswordInputRef.current?.focus();
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
        <div className="text-red-500 text-sm">{passwordError}</div>
        <div
          className={`input-style flex gap-2 ${!otpSuccess && "cursor-text"}`}
        >
          <input
            type={showConfirmPass}
            name="confirm-password"
            placeholder="Confirm Password"
            disabled={otpBtn && otpSuccess}
            required
            value={confirmPassword}
            onChange={handleConfirmPassword}
            ref={confirmPasswordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGetOtp(
                  e as unknown as React.MouseEvent<HTMLButtonElement>
                );
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showConfirmPass === "text") setShowConfirmPass("password");
              else setShowConfirmPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showConfirmPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>
        <div className="text-red-500 text-sm">{confirmPasswordError}</div>
        {!otpBtn || !otpSuccess ? (
          <Button
            type="button"
            onClick={handleGetOtp}
            disabled={disableBtn|| otpBtn || sendingOtp || otpSuccess}
            className={`w-full ${otpBtn && "animate-pulse"}`}
          >
            {sendingOtp
              ? "Sending OTP..."
              : otpSuccess
              ? "Check your E-mail!"
              : "Send OTP"}
          </Button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              disabled={disableBtn || submitting || success}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
              }
              required
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }
              }}
              className="input-style animate-slide-down"
            />
            <Button
              type="submit"
              onClick={(e) =>
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
              }
              disabled={disableBtn || submitting || success}
              className={`w-full ${disableBtn && "animate-pulse"}`}
            >
              {submitting
                ? "Registering..."
                : success
                ? "Registered Successfully!"
                : "Sign Up"}
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default DevSignUp;
