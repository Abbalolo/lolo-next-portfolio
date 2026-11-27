"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

const SOCIALS = [
  { href: "https://github.com/Abbalolo", label: "GitHub", Icon: AiFillGithub },
  { href: "https://www.linkedin.com/in/ibrahim-lawal-2772a8243/", label: "LinkedIn", Icon: AiFillLinkedin },
  { href: "https://twitter.com/Ibrahim46284657", label: "Twitter", Icon: AiFillTwitterCircle },
  { href: "https://web.facebook.com/lolo.fundz/", label: "Facebook", Icon: AiFillFacebook },
  { href: "https://instagram.com/lohloh009", label: "Instagram", Icon: AiFillInstagram },
];

const NAV = [
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/project", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-page pt-16 pb-10 border-t border-line mt-24">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mono text-accent text-lg font-semibold tracking-tight">~/</div>
          <p className="mt-3 text-sm text-muted max-w-xs leading-relaxed">
            Ibrahim Lawal Abba — full-stack &amp; frontend developer building fast, accessible web
            experiences. Let&apos;s ship something.
          </p>
          <Link href="/contact" className="mt-4 inline-flex text-sm text-accent underline-link">
            Start a conversation →
          </Link>
        </div>

        <div>
          <p className="label mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted hover:text-fg underline-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-fg"
                >
                  <s.Icon size={16} />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted mono">
        <span>© {year} Ibrahim Lawal Abba. All rights reserved.</span>
        <motion.a
          href="mailto:abbalolo360@gmail.com"
          className="hover:text-accent"
          whileHover={{ x: 2 }}
        >
          abbalolo360@gmail.com
        </motion.a>
      </div>
    </footer>
  );
}
