"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { useMemo, useState } from "react";

import type { ProjectCard } from "./data/ProjectData";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectGrid({ cards }: { cards: ProjectCard[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(cards.map((c) => c.category));
    return ["All", ...Array.from(set).sort()];
  }, [cards]);

  const filtered = useMemo(
    () => (filter ? cards.filter((c) => c.category === filter) : cards),
    [cards, filter],
  );

  return (
    <LayoutGroup>
      {/* Filter chips */}
      <motion.div className="flex flex-wrap items-center gap-2 mb-10" layout>
        {categories.map((cat) => {
          const active = filter === cat || (cat === "All" && filter === null);
          return (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setFilter(cat === "All" ? null : cat)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                active ? "text-accent-fg border-accent" : "text-muted border-line hover:text-fg"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{cat}</span>
            </motion.button>
          );
        })}
        <span className="label ml-2 hidden sm:inline">{filtered.length} shown</span>
      </motion.div>

      {/* Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((card) => (
            <motion.article
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="group rounded-xl border border-line bg-base overflow-hidden hover:border-accent transition-colors"
            >
              <Link href={`/project/${card.id}`} className="block h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface border-b border-line">
                  <Image
                    src={card.image}
                    alt={card.name || "Project image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 mono text-[0.65rem] uppercase tracking-wider rounded bg-black/50 text-white px-2 py-1 backdrop-blur-sm">
                    {card.category}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg tracking-tight">{card.name}</h2>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2 flex-1">{card.short}</p>
                  {card.language?.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {card.language.slice(0, 4).map((lang) => (
                        <li key={lang} className="mono text-[0.66rem] rounded border border-line px-1.5 py-0.5 text-muted">
                          {lang}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    View project
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-4 rounded-xl border border-line p-12 text-center text-muted">No projects match this filter.</div>
      )}
    </LayoutGroup>
  );
}
