'use client';
import ProjectProvider from "@/context/ProjectProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ProjectProvider>
        <>{children}</>
      </ProjectProvider>
    </Provider>
  );
}
