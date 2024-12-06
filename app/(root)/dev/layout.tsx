import Navbar from "@/components/layout/dev/Navbar";
import { ROLE } from "@/tempData";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Navbar role={ROLE} />
      {children}
    </>
  );
}
