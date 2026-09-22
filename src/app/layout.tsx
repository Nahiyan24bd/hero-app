import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/shered/Navbar";
import Footer from "./components/shered/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HERO.IO - We Build Productive Apps",
  description: "Explore and install top trending mobile and web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between bg-[#f8fafc]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
        <Footer />
      </body>
    </html>
  );
}