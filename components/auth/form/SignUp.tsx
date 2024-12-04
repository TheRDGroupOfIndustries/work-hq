"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { emailPattern, passwordPattern } from "./SignIn";
import { useSession } from "next-auth/react";
import InputField from "@/components/ui/InputField"; // Import InputField

const SignUp: React.FC = () => {
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
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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
    } else if (inputValue.length === 10 && /^\d+$/.test(inputValue)) {
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
    } else {
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
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setDisableBtn(false);
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
      return toast.error("Please fill all the fields!");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setSendingOtp(true);

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
        }),
      });

      const data = await res.json();

      if (res.status === 400) {
        setSendingOtp(false);
        toast.error(`${email} is already registered!`);
      } else if (res.status === 201) {
        setCheckOtpCode(data.otpCode);
        setOtpBtn(true);
        setOtpSuccess(true);
        toast.success(`OTP has been sent to your ${email}, check your email!`);
      } else if (res.status === 200) {
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
      return toast.error("Passwords do not match!");
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
          }),
        });
        // const data = await res.json();

        if (res.status === 400) {
          setSubmitting(false);
          throw new Error(`${emailOrPhone} is already registered!`);
        }
        if (res.status === 402) {
          setSubmitting(false);
          throw new Error(
            `Invalid OTP has been entered for this ${emailOrPhone}!`
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
      <form className="space-y-4 animate-fade-in" onSubmit={handleSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-2">
          <InputField
            type="text"
            name="first-name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            label="First Name"
            disabled={otpBtn && otpSuccess}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                lastNameInputRef.current?.focus();
              }
            }}
          />
          <InputField
            type="text"
            name="last-name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            inputRef={lastNameInputRef}
            label="Last Name"
            disabled={otpBtn && otpSuccess}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                emailInputRef.current?.focus();
              }
            }}
          />
        </div>
        <InputField
          type="email"
          name="email"
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={handleEmailOrPhone}
          required
          inputRef={emailInputRef}
          label="Email or Phone"
          disabled={otpBtn && otpSuccess}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              passwordInputRef.current?.focus();
            }
          }}
        />
        <div className="text-red-500 text-sm">{emailError}</div>
        <div
          className={`flex flex-center ${
            !otpSuccess && "cursor-text relative"
          }`}
        >
          <InputField
            type={showPass}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            inputRef={passwordInputRef}
            label="Password"
            disabled={otpBtn && otpSuccess}
            containerStyle="w-full"
            required
          />
          <div
            onClick={() => {
              setShowPass(showPass === "text" ? "password" : "text");
            }}
            className="w-fit h-fit cursor-pointer flex-center p-3 ease-in-out duration-200 pt-6 absolute right-0 top-1/4"
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
          className={`flex flex-center ${
            !otpSuccess && "cursor-text relative"
          }`}
        >
          <InputField
            type={showConfirmPass}
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            inputRef={confirmPasswordInputRef}
            label="Confirm Password"
            disabled={otpBtn && otpSuccess}
            required
            containerStyle="w-full"
          />
          <div
            onClick={() => {
              setShowConfirmPass(
                showConfirmPass === "text" ? "password" : "text"
              );
            }}
            className="w-fit h-fit cursor-pointer flex-center ease-in-out duration-200 pt-6 p-3 absolute right-0 top-1/4"
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
            disabled={disableBtn || otpBtn || sendingOtp || otpSuccess}
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
            <InputField
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
              }
              required
              disabled={disableBtn || submitting || success}
              label="Enter OTP"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }
              }}
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

export default SignUp;
