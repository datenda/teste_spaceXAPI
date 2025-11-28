import "./globals.css";
import { ReactNode } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "SpaceX Portal",
  description:
    "A SpaceX Launches Portal built with Next.js, Tailwind, and Apollo GraphQL",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Header />

        <main className="flex flex-1 w-full min-h-3/4">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
