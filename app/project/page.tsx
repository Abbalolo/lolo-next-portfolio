import { portfolioCards } from "./data/ProjectData";
import { ProjectGrid } from "./ProjectGrid";
import { Reveal } from "../components/motion/Reveal";
import { TextReveal } from "../components/motion/TextReveal";

export default function Project() {
  return (
    <section className="container-page pt-12 md:pt-16 pb-20">
      <Reveal>
        <p className="label">Projects</p>
        <TextReveal
          as="h1"
          text="Things I've built"
          className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
        />
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          A mix of products, landing pages, hackathons, and client work. Filter by type, then dig
          into any project.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProjectGrid cards={portfolioCards} />
      </div>
    </section>
  );
}
