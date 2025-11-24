"use client"
import React, { useState } from "react";
import { portfolioCards, ProjectCard } from "../project/data/ProjectData";
import { CgArrowLongRight } from "react-icons/cg";
import SideBar from "../components/SideBar"; 
import Image from "next/image";
import Link from "next/link";

function Experience() {
  const [experienceCard] = useState<ProjectCard[]>(() => 
    portfolioCards.filter((item) => item.category === "Experience Project" || item.category === "Freelance Project")
  );

  return (
    <div className="flex gap-5 dark:text-black text-[#f9f7f6] px-5 lg:px-16 md:px-10 py-8">
      <SideBar/>
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-6">Experience Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
          {experienceCard.map((item) => (
            <div 
              key={item.id} 
              className="border border-gray-600 dark:border-gray-300 rounded-md p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-xl">{item.field || "Project"}</h2>
                <div className="relative h-48 w-full">
                  <Image 
                    className="rounded-md border border-gray-600 object-cover" 
                    src={item.image} 
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-300 dark:text-gray-600 text-sm mb-4 flex-1">
                  {item.achieve || item.short}
                </p>
                <Link 
                  href={`/project/${item.id}`}
                  className="flex items-center justify-between border border-gray-600 dark:border-gray-300 rounded-md p-3 hover:bg-gray-800 dark:hover:bg-slate-100 transition-colors duration-300 group"
                >
                  <span className="text-sm font-medium">Click To View More</span>
                  <CgArrowLongRight className="text-[20px] group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {experienceCard.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 dark:text-gray-500 text-lg">
              No experience projects found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experience;