"use client";

import { motion } from "motion/react";
import {
  FaFigma,
  FaGitAlt,
  FaNodeJs,
  FaNpm,
  FaServer,
} from "react-icons/fa";
import {
  SiCss3,
  SiDaisyui,
  SiExpress,
  SiFramer,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPosthog,
  SiPostman,
  SiPhp,
  SiPython,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZedindustries,
  SiVitest,
} from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { TbBrandVscode } from "react-icons/tb";
import type { ReactNode } from "react";

import { Reveal } from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { TextReveal } from "../components/motion/TextReveal";

type Tool = { name: string; icon: ReactNode };

const CORE: Tool[] = [
  { name: "HTML5", icon: <SiHtml5 /> },
  { name: "CSS3", icon: <SiCss3 /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <SiPython /> },
  { name: "PHP", icon: <SiPhp /> },
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
];

const FRONTEND: Tool[] = [
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Redux", icon: <SiRedux /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "DaisyUI", icon: <SiDaisyui /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "Figma", icon: <FaFigma /> },
];

const BACKEND: Tool[] = [
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "REST APIs", icon: <FaServer /> },
];

const TOOLS: Tool[] = [
  { name: "Git & GitHub", icon: <FaGitAlt /> },
  { name: "VS Code", icon: <TbBrandVscode /> },
  { name: "Zed", icon: <SiZedindustries /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "npm", icon: <FaNpm /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Vercel SQL", icon: <SiVercel /> },
  { name: "PostHog", icon: <SiPosthog /> },
  { name: "Testing", icon: <SiVitest /> },
  { name: "Supabase", icon: <RiSupabaseFill /> },
  { name: "Jest", icon: <SiJest /> },
];

const GROUPS = [
  { title: "Core", note: "The foundation I reach for first", items: CORE },
  { title: "Frontend", note: "Interface & interaction", items: FRONTEND },
  { title: "Backend & Data", note: "Servers, APIs, databases", items: BACKEND },
  { title: "Tooling", note: "Everything around the code", items: TOOLS },
];

export default function Skills() {
  return (
    <section className="container-page pt-12 md:pt-16 pb-20">
      <Reveal>
        <p className="label">Skills</p>
        <TextReveal
          as="h1"
          text="Tools I build with"
          className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
        />
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          I pick tools that ship fast and stay maintainable. The stack grows, but the goal stays
          the same: clear interfaces, quick loads, and code the next person can read.
        </p>
      </Reveal>

      {/* Education */}
      <Reveal className="mt-14">
        <div className="rounded-xl border border-line bg-surface p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6">
          <div className="mono text-accent text-4xl">{"{}"}</div>
          <div>
            <p className="label">Education</p>
            <h2 className="mt-2 text-2xl tracking-tight">Computer Science</h2>
            <p className="mt-1 text-sm text-muted">Kano State Polytechnic (School of Technology)</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-muted">
              <li>National Diploma — 2021 to 2022</li>
              <li>Higher National Diploma — in progress</li>
              <li>GPA 3.34 / 4.00</li>
              <li>Programming &amp; problem-solving foundation</li>
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Skill groups */}
      <div className="mt-14 space-y-16">
        {GROUPS.map((group, gi) => (
          <Reveal key={group.title} delay={0.05 * gi}>
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 mb-6">
              <h2 className="text-2xl tracking-tight">{group.title}</h2>
              <p className="label hidden sm:block">{group.note}</p>
            </div>
            <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" stagger={0.04}>
              {group.items.map((tool) => (
                <StaggerItem key={tool.name}>
                  <motion.div
                    className="group flex items-center gap-3 rounded-lg border border-line bg-base px-4 py-3 hover:border-accent hover:bg-surface transition-colors h-full"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="text-xl text-muted group-hover:text-accent transition-colors [&>svg]:w-5 [&>svg]:h-5">
                      {tool.icon}
                    </span>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        ))}
      </div>

      {/* Beyond code */}
      <Reveal className="mt-20">
        <div className="rounded-xl border border-line p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="label">Beyond code</p>
            <p className="mt-2 text-lg tracking-tight max-w-xl">
              Hackathons &amp; startups, and FIFA with friends whenever the build is bug-free.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 label">
            <span className="rounded-md border border-line px-3 py-1.5 text-muted">Hackathons</span>
            <span className="rounded-md border border-line px-3 py-1.5 text-muted">Startups</span>
            <span className="rounded-md border border-line px-3 py-1.5 text-muted">FIFA</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
