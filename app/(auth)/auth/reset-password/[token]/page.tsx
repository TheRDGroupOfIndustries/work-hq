"use client";

import React, { useEffect, useState } from "react";
import ResetPassword from "@/components/auth/form/ResetPassword";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  // console.log(params.token);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: params.token,
          }),
        });

        if (res.status === 400) {
          setError("Invalid Token or has expired!");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          // console.log(userData);

          setUser(userData);
        }
      } catch (error) {
        setError("Try again later!");
        console.log("Error", error);
      }
    };
    verifyToken();
  }, [params.token]);
  return (
    <ResetPassword
      //   token={params.token}
      isTokenVerified={verified}
      error={error}
      email={user ? user.email : ""}
    />
  );
}
