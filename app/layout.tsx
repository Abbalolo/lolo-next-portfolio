import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import MotionProvider from "./components/motion/MotionProvider";
import PageTransition from "./components/motion/PageTransition";
import ScrollProgress from "./components/motion/ScrollProgress";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahimlawalabba.dev"),
  title: {
    default: "Ibrahim Lawal Abba — Full-Stack & Frontend Developer",
    template: "%s · Ibrahim Lawal Abba",
  },
  description:
    "Ibrahim Lawal Abba is a full-stack and frontend developer in Kano, Nigeria, building fast, accessible, well-crafted web experiences. View projects and get in touch.",
  keywords: [
    "Ibrahim Lawal Abba",
    "full-stack developer",
    "frontend developer",
    "Next.js",
    "React",
    "TypeScript",
    "web developer Nigeria",
  ],
  authors: [{ name: "Ibrahim Lawal Abba" }],
  openGraph: {
    title: "Ibrahim Lawal Abba — Full-Stack & Frontend Developer",
    description:
      "Full-stack and frontend developer building fast, accessible, well-crafted web experiences.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// inline script to set theme before paint (no flash), dark-first
const themeScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  var dark = t ? t === 'dark' : true;
  document.documentElement.classList.toggle('dark', dark);
}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <MotionProvider>
          <ScrollProgress />
          <ScrollToTop />
          <Header />
          <main id="main" className="flex-1 w-full pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
