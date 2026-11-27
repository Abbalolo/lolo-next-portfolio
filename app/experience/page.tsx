"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { useMemo } from "react";

import { portfolioCards, type ProjectCard } from "../project/data/ProjectData";
import { Reveal } from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { TextReveal } from "../components/motion/TextReveal";

const FILTER = (item: ProjectCard) =>
  item.category === "Experience Project" || item.category === "Freelance Project";

export default function Experience() {
  const items = useMemo(() => portfolioCards.filter(FILTER), []);

  return (
    <section className="container-page pt-12 md:pt-16 pb-20">
      <Reveal>
        <p className="label">Experience</p>
        <TextReveal
          as="h1"
          text="Where I've shipped"
          className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
        />
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          Freelance and client work plus hands-on experience building real products end to end.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.06}>
        {items.map((item) => (
          <StaggerItem key={item.id} className="h-full">
            <motion.article
              className="group relative h-full rounded-xl border border-line bg-base p-4 transition-colors hover:border-accent"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Link href={`/project/${item.id}`} className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="label">{item.field || item.category}</span>
                  <span className="label text-accent">{item.category}</span>
                </div>

                <h2 className="mt-2 text-xl tracking-tight">{item.name}</h2>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                  {item.achieve || item.short}
                </p>

                {item.language?.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.language.slice(0, 5).map((lang) => (
                      <li key={lang} className="mono text-[0.68rem] rounded border border-line px-1.5 py-0.5 text-muted">
                        {lang}
                      </li>
                    ))}
                    {item.language.length > 5 && (
                      <li className="mono text-[0.68rem] rounded border border-line px-1.5 py-0.5 text-muted">
                        +{item.language.length - 5}
                      </li>
                    )}
                  </ul>
                )}

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  View project
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>

      {items.length === 0 && (
        <div className="mt-12 rounded-xl border border-line p-12 text-center text-muted">
          No experience projects found.
        </div>
      )}
    </section>
  );
}
