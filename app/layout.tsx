import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Your portfolio description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full px-5 flex items-center flex-col justify-center md:px-10 lg:px-16 py-[70px] md:py-[90px] overflow-x-hidden bg-[#212529] dark:bg-[#f9f7f6] text-[#f9f7f6] dark:text-[#545454]">
        <Header />
        <main className="w-full flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}