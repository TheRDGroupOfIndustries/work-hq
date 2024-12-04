import { ChatProvider } from "@/context/ChatProvider";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ChatProvider>
                {children}
            </ChatProvider>
        </>
    );
}
