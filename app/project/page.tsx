/* eslint-disable */
"use client"
import React, { useEffect, useState } from "react";
import { portfolioCards } from "./data/ProjectData";
import AOS from "aos";
import "aos/dist/aos.css";
import { EmblaCarousel } from "../components/EmblaCarousel";
import SideBar from "../components/SideBar";
import { StaticImageData } from 'next/image';

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

function Project() {
  const [currentCard, setCurrentCard] = useState<ProjectCard[]>(portfolioCards);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [totalCard, setTotalCard] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filterProjects = (category: string | null) => {
    if (category === null) {
      setCurrentCard(portfolioCards);
      setActiveFilter(null);
      setTotalCard(portfolioCards.length);
    } else {
      const filteredProjects = portfolioCards.filter(
        (card) => card.category.toLowerCase() === category.toLowerCase()
      );
      setCurrentCard(filteredProjects);
      setActiveFilter(category);
      setTotalCard(filteredProjects.length);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    setTotalCard(portfolioCards.length);
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setActiveFilter(selectedCategory === "All Projects" ? null : selectedCategory);
    filterProjects(
      selectedCategory === "All Projects" ? null : selectedCategory
    );
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[90vh] w-full fixed top-0 left-0 flex justify-center items-center bg-[#212529] dark:bg-[#f9f7f6]">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col justify-center min-h-screen bg-[#212529] dark:bg-[#f9f7f6] text-[#f9f7f6] dark:text-[#545454]">
      <div className="flex gap-5 p-5 lg:px-16 md:px-10">
        <SideBar />
        <div className="flex-1">
          <h2 className="text-xl md:text-3xl text-blue-500 font-bold mb-5">
            Portfolio.
          </h2>

          {/* Desktop Navigation */}
          <ul className="md:flex items-center justify-between text-[16px] my-2 w-full md:w-[50%] hidden">
            <li
              onClick={() => filterProjects(null)}
              className={`relative cursor-pointer px-4 py-2 transition-all duration-300 ${
                !activeFilter
                  ? "text-blue-500 font-bold after:origin-left after:content-[''] after:w-full after:h-1 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:rounded-lg after:transition-all after:duration-300"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
              }`}
            >
              All
            </li>
            <li
              onClick={() => filterProjects("Landing Page")}
              className={`relative cursor-pointer px-4 py-2 transition-all duration-300 ${
                activeFilter === "Landing Page"
                  ? "text-blue-500 font-bold after:origin-left after:content-[''] after:w-full after:h-1 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:rounded-lg after:transition-all after:duration-300"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
              }`}
            >
              Landing Page
            </li>
            <li
              onClick={() => filterProjects("Freelance Project")}
              className={`relative cursor-pointer px-4 py-2 transition-all duration-300 ${
                activeFilter === "Freelance Project"
                  ? "text-blue-500 font-bold after:origin-left after:content-[''] after:w-full after:h-1 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:rounded-lg after:transition-all after:duration-300"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
              }`}
            >
              Freelance
            </li>
            <li
              onClick={() => filterProjects("Hackathon Project")}
              className={`relative cursor-pointer px-4 py-2 transition-all duration-300 ${
                activeFilter === "Hackathon Project"
                  ? "text-blue-500 font-bold after:origin-left after:content-[''] after:w-full after:h-1 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:rounded-lg after:transition-all after:duration-300"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
              }`}
            >
              Hackathon
            </li>
          </ul>

          {/* Mobile Dropdown */}
          <div
            data-aos="fade-left"
            className="font-bold my-3 flex items-center justify-between"
          >
            <div>
              Total - <span className="text-blue-500">{totalCard}</span>
            </div>
            <div className="md:hidden">
              <select
                className="select select-primary max-w-xs bg-[#212529] dark:bg-[#f9f7f6] text-[#f9f7f6] dark:text-[#545454] border border-gray-600 rounded-md px-3 py-2"
                onChange={handleFilterChange}
                value={activeFilter || "All Projects"}
              >
                <option value="All Projects">All Projects</option>
                <option value="Landing Page">Landing Pages</option>
                <option value="Freelance Project">Freelance Project</option>
                <option value="Hackathon Project">Hackathons</option>
              </select>
            </div>
          </div>

          <EmblaCarousel currentCard={currentCard} />
        </div>
      </div>
    </section>
  );
}

export default Project;