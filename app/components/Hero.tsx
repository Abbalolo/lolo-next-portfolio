"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowRight, FiMail } from "react-icons/fi";

import darkPhoto from "../../public/dark.jpg";
import lightPhoto from "../../public/light.jpg";

import { Magnetic } from "./motion/Magnetic";
import { Reveal } from "./motion/Reveal";
import { Stagger, StaggerItem } from "./motion/Stagger";
import { TextReveal } from "./motion/TextReveal";

const TECH = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "Supabase", "Figma"];

const EXPLORE = [
  { href: "/experience", label: "Experience", note: "Where I've shipped", n: "01" },
  { href: "/project", label: "Projects", note: "Things I've built", n: "02" },
  { href: "/skills", label: "Skills", note: "Tools & stack", n: "03" },
];

export default function Hero() {
  return (
    <section className="container-page pt-12 md:pt-20 pb-20">
      <div className="grid lg:grid-cols-[1.65fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <div>
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent">â—</span> Full-Stack &amp; Frontend Developer Â· Kano, Nigeria
          </motion.p>

          <TextReveal
            as="h1"
            text="Ibrahim Lawal Abba"
            className="mt-5 text-[clamp(2.6rem,7vw,5.25rem)] font-semibold tracking-[-0.03em]"
            delay={0.08}
          />

          <Reveal delay={0.35} y={18}>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-muted leading-relaxed">
              I design and build fast, accessible, well-crafted web products â€” from pixel-precise
              interfaces to the APIs behind them. Currently pursuing a Computer Science HND at
              Kano Polytechnic and shipping real work for real users.
            </p>
          </Reveal>

          <Reveal delay={0.45} y={18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="/contact" className="btn btn-primary">
                  Hire me
                  <FiArrowRight size={17} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/project" className="btn btn-ghost">
                  View projects
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.55} y={14}>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 label">
              {TECH.map((t) => (
                <li key={t} className="text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Photo */}
        <Reveal delay={0.25} y={28} className="relative">
          <figure className="relative aspect-[4/5] w-full max-w-[340px] max-h-[460px] mx-auto lg:mx-0 lg:justify-self-end">
            <div className="absolute inset-0 rounded-xl border border-line bg-surface" aria-hidden="true" />
            <div className="relative h-full w-full rounded-xl overflow-hidden border border-line">
              {/* dark theme photo */}
              <Image
                src={darkPhoto}
                alt="Ibrahim Lawal Abba, full-stack developer"
                fill
                priority
                sizes="(max-width: 340px) 90vw, 340px"
                placeholder="blur"
                className="object-cover hidden dark:block"
              />
              {/* light theme photo */}
              <Image
                src={lightPhoto}
                alt="Ibrahim Lawal Abba, full-stack developer"
                fill
                priority
                sizes="(max-width: 340px) 90vw, 340px"
                placeholder="blur"
                className="object-cover block dark:hidden"
              />
            </div>
            {/* small caption chip */}
            <figcaption className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:right-4 rounded-lg border border-line bg-base px-3 py-2 text-xs mono text-muted shadow-sm">
              <span className="text-accent">const</span> role = <span className="text-fg">&quot;Full-Stack Dev&quot;</span>;
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Explore â€” asymmetric list, not a card grid */}
      <Stagger className="mt-24 grid sm:grid-cols-3 gap-px rounded-xl overflow-hidden border border-line bg-line" stagger={0.08}>
        {EXPLORE.map((item) => (
          <StaggerItem key={item.href} className="bg-base">
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4 p-6 h-full bg-base hover:bg-surface transition-colors"
            >
              <div>
                <span className="label">{item.n}</span>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{item.label}</h2>
                <p className="mt-1 text-sm text-muted">{item.note}</p>
              </div>
              <FiArrowRight
                size={20}
                className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Contact strip */}
      <Reveal delay={0.1} className="mt-px">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line bg-surface p-6 mt-px">
          <div>
            <p className="label">Let&apos;s build something</p>
            <p className="mt-1 text-muted text-sm">Open to collaborations, freelance, and full-time roles.</p>
          </div>
          <Magnetic>
            <a href="mailto:abbalolo360@gmail.com" className="btn btn-ghost">
              <FiMail size={16} />
              abbalolo360@gmail.com
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
