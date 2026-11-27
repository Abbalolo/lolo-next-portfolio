"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiDownload, FiMoon, FiSun } from "react-icons/fi";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/project", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // hydrate theme from storage
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
      setDark(isDark); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // (mobile menu closes on nav-link click)

  // scroll-aware header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/IBRAHIM LAWAL.pdf";
    link.download = "IBRAHIM LAWAL.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-base backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Home">
          <span className="mono text-accent text-lg font-semibold tracking-tight">~/</span>
          <span className="font-semibold tracking-tight text-[0.95rem]">
            ibrahim<span className="text-accent">.dev</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 text-sm transition-colors ${
                isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-fg hover:bg-surface transition-colors"
          >
            {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>

          <button
            type="button"
            onClick={downloadResume}
            className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-md border border-line text-sm text-fg hover:border-accent hover:text-accent transition-colors"
          >
            <FiDownload size={15} />
            Resume
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-fg hover:bg-surface transition-colors"
          >
            {open ? <AiOutlineClose size={18} /> : <AiOutlineMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 z-40 bg-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="container-page pt-6 flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {NAV.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-4 text-2xl font-medium tracking-tight ${
                      isActive(item.href) ? "text-accent" : "text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-line text-sm"
                >
                  {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
                  {dark ? "Light" : "Dark"}
                </button>
                <button
                  type="button"
                  onClick={downloadResume}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-accent text-accent-fg text-sm font-medium"
                >
                  <FiDownload size={16} />
                  Resume
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
