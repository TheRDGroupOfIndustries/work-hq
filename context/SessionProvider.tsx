"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { CustomUser } from "@/lib/types";

interface AuthProviderProps extends SessionProviderProps {
  children: React.ReactNode;
}

const AuthSessionProvider: React.FC<AuthProviderProps> = ({ children, session }) => {
  const customUser = session?.user as CustomUser;
  const updatedSession = {
    ...session,
    user: customUser,
    expires: session?.expires || new Date().toISOString(),
  };

  return <SessionProvider session={updatedSession}>{children}</SessionProvider>;
};

export default AuthSessionProvider;
