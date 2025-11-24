"use client";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Hero from "./hero/page";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div  >
      {isLoading && (
        <div className="bg-[#212529] fixed top-0 left-0 h-full z-50 w-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      <div className="flex gap-3">
        <SideBar />
        <Hero />
      </div>
    </div>
  );
}

export default Home;
