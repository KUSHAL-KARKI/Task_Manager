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
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
            integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <GlobalProvider>
            <div className="flex min-h-screen">
              <Toaster />
              {userId && <Sidebar />}
              {children}
            </div>
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
