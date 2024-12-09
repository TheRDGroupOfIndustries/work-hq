'use client';

import { createContext, useContext, useState, 
ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface UserContextValue {
  SignUpRole: string | null; // Role can be a string or null
  setSignUpRole: (role: string | null) => void; // Function to set the role
}

const UserContext = createContext<UserContextValue | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [SignUpRole, setSignUpRole] = useState<string | null>(null); // Default role is null
useEffect(() => {
  if(!SignUpRole) {
    const signUpRoleCookie = Cookies.get("SignUpRole");
    setSignUpRole(signUpRoleCookie ? signUpRoleCookie : "client");
    console.log("SIgn up role is set")
    }}   , [SignUpRole]);
  return (
    <UserContext.Provider value={{ SignUpRole, setSignUpRole }}>
      {children}
    </UserContext.Provider>
  );
};