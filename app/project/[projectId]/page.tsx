"use client";

import { BiArrowBack, BiLinkExternal } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";

import { portfolioCards } from "../data/ProjectData";
import { Reveal } from "../../components/motion/Reveal";

const isValidUrl = (url: unknown): url is string => {
  if (typeof url !== "string" || url.length === 0) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string | undefined;

  const project = portfolioCards.find((item) => item.id.toString() === projectId);

  if (!projectId || !project) {
    return (
      <div className="container-page py-24 text-center">
        <p className="label">404</p>
        <h1 className="mt-3 text-3xl tracking-tight">Project not found</h1>
        <p className="mt-3 text-muted">We couldn&apos;t find that project.</p>
        <Link href="/project" className="btn btn-primary mt-6">
          <BiArrowBack /> Back to projects
        </Link>
      </div>
    );
  }

  const { name, language, github, host, description, short } = project;
  const hostUrl = isValidUrl(host) ? host : "#";

  return (
    <section className="container-page pt-12 md:pt-16 pb-24">
      <motion.button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BiArrowBack /> Back
      </motion.button>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Media */}
        <Reveal y={20} className="lg:sticky lg:top-24">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-surface">
            <Image
              src={project.image}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 label">
            <span className="rounded-md border border-line px-2.5 py-1">{project.category}</span>
            {project.field && <span>{project.field}</span>}
          </div>
        </Reveal>

        {/* Info */}
        <div>
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em]">{name}</h1>
            <p className="mt-3 text-lg text-muted">{short}</p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <h2 className="label mb-2">About</h2>
            <p className="text-muted leading-relaxed">{description}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8">
            <h2 className="label mb-3">Technologies</h2>
            <ul className="flex flex-wrap gap-2">
              {language.map((lang) => (
                <li key={lang} className="mono text-xs rounded-md border border-line bg-surface px-2.5 py-1">
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {isValidUrl(hostUrl) && (
              <a
                href={hostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-1 justify-center"
              >
                <BiLinkExternal /> Live project
              </a>
            )}
            {isValidUrl(github) && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex-1 justify-center"
              >
                <AiFillGithub /> Source code
              </a>
            )}
          </div>

          {isValidUrl(github) && (
            <p className="mt-4 mono text-xs text-muted break-all">{github}</p>
          )}
        </div>
      </div>
    </section>
  );
}
