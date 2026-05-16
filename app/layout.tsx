import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:["latin"]});




export const metadata: Metadata = {
  title: "EduForge - AI Lesson Generator",
  description: "AI-powered lesson plan generator that creates structured, customizable educational content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
