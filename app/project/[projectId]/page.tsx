// app/project/[projectId]/page.tsx
"use client";
import { BiArrowBack, BiLinkExternal } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useParams } from 'next/navigation';
import { portfolioCards } from "../data/ProjectData";
import { useRouter } from "next/navigation";
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

// Helper function to handle both string and StaticImageData
const getImageSrc = (image: string | StaticImageData): string | StaticImageData => {
  return image;
};

// Type guard to check if a value is a valid URL
const isValidUrl = (url: unknown): url is string => {
  if (typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter()
  const projectId = params?.projectId as string | undefined;
  
  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-64 dark:bg-gray-50 text-gray-50 dark:text-gray-600">
        <p>Project ID not found</p>
      </div>
    );
  }

  const project = portfolioCards.find((item) => 
    item.id.toString() === projectId
  );
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-64 dark:bg-gray-50 text-gray-50 dark:text-gray-600">
        <p>Project not found</p>
      </div>
    );
  }
  
  const { name, language, github, host, description, short } = project;

  const githubUrl = isValidUrl(github) ? github : "#";
  const hostUrl = isValidUrl(host) ? host : "#";

  return (
    <section className='flex flex-col md:flex-row gap-10 relative px-5 lg:px-16 md:px-10 pb-40 dark:bg-gray-50 text-gray-50 dark:text-gray-600'>
    <div className="w-full lg:w-auto">
<button
  className="flex items-center gap-2 p-2 mb-4 hover:text-blue-500 transition-colors"
  onClick={() => router.back()}
>
  <BiArrowBack className="text-xl" />
  Go Back
</button>

  <div className="relative w-full lg:w-[600px] aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
    <Image
      src={getImageSrc(project.image)}
      alt={name}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 600px"
      className="object-cover"
    />
  </div>
</div>

      <div className="flex-1">
        <h1 className='font-extrabold text-2xl pt-2 pb-2'>{name}</h1>
        <p className="pb-3 text-gray-300 dark:text-gray-600 text-lg">{short}</p>
        
        <div className='mt-6'>
          <h2 className='font-semibold text-xl mb-2'>About</h2>
          <p className="text-gray-300 dark:text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className='mt-6'>
          <h2 className='font-semibold text-xl mb-2'>Technologies</h2>
          <div className="flex flex-wrap gap-2 py-1">
            {language.map((lang, index) => (
              <span 
                key={index} 
                className="text-sm md:text-base text-white hover:bg-blue-500 hover:text-white bg-slate-800 dark:bg-transparent dark:border dark:border-gray-400 rounded-md px-3 py-1 text-center duration-300 cursor-pointer"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className='mt-6'>
          <h2 className="font-semibold text-xl mb-2 flex items-center gap-2">
            <AiFillGithub className="text-2xl" />GitHub Repository
          </h2>
          <Link 
            href={githubUrl}
            className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {github}
          </Link>
        </div>

        <Link 
          href={hostUrl}
          target="_blank"
          rel="noopener noreferrer" 
          className="mt-8 bg-blue-900 hover:bg-blue-800 p-4 w-full flex items-center justify-center gap-2 text-white rounded-md transition-colors duration-300 font-semibold"
        >
          Open Project <BiLinkExternal className="text-xl" />
        </Link>
      </div>
    </section>
  );
}