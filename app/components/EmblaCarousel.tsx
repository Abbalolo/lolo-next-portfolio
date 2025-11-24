// components/EmblaCarousel.tsx
"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ProjectCard {
  id: string | number;
  name: string;
  image: string | StaticImageData;
  language: string[];
  github: string;
  host: string;
  description: string;
  short: string;
  category: string;
  achieve?: string;
  field?: string;
}

interface EmblaCarouselProps {
  currentCard: ProjectCard[];
}

export function EmblaCarousel({ currentCard }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const isCompactView = currentCard.length > 3;

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentCard.map((card) => (
              <div key={card.id} className="rounded-md group">
                <Link href={`/project/${card.id}`}>
                  <div className="relative rounded-md overflow-hidden h-full">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={card.image}
                      alt={card.name || "Project image"}
                      width={500}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute top-0 left-0 h-full w-full flex items-end justify-end duration-300 gap-5 ${
                      isCompactView 
                        ? 'group-hover:backdrop-brightness-50' 
                        : 'backdrop-brightness-75'
                    }`}>
                      <div className={`w-full p-3 ${
                        isCompactView ? 'hidden group-hover:flex flex-col' : 'flex flex-col'
                      }`}>
                        <h1 className="text-xl text-white font-extrabold">
                          {card.name}
                        </h1>
                        <p className="text-gray-100">{card.short}</p>
                        {!isCompactView && (
                          <div className="flex flex-wrap gap-2 py-1">
                            {card.language.map((language, index) => (
                              <span
                                key={index}
                                className="text-[12px] md:text-md text-white hover:bg-blue-500 hover:text-white bg-gray-400 rounded-2xl py-0.5 px-2 text-center duration-300 cursor-pointer"
                              >
                                {language}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}