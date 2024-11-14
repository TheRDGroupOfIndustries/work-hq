import type { Metadata } from "next";
import Auth from "@/components/auth/Auth";

export const metadata: Metadata = {
  title: "Work HQ - Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Auth>{children}</Auth>;
}
