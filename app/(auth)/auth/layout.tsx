"use client";
import Auth from "@/components/auth/Auth";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
  <Provider store={store}>
    <Auth>{children}</Auth>
  </Provider>
  );
}
