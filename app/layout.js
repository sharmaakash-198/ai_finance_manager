import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Finance Platform",
  description: "Manage your finances with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black min-h-screen`}>
          {/*Header*/}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/*Footer*/}
          <footer className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-950 dark:to-black text-white py-4 text-center">
            <div className="container mx-auto px-4 text-center text-white">
              <p>Made By Akash Sharma💖</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
