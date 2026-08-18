import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AI Finance Platform",
  description: "Manage your finances with AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black min-h-screen`}>
          {/*Header*/}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/*Footer*/}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
