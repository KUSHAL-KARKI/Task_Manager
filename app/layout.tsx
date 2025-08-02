import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { auth } from "@clerk/nextjs/server";
import GlobalProvider from "./Context/GlobalProvider";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Task Manager</title>
        </head>
        <body className={nunito.className}>
          <GlobalProvider>
            <Toaster />
            <div className="flex bg-black text-white">
              {userId && <Sidebar />}
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </div>
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
