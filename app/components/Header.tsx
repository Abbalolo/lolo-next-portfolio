"use client"
import { CgDarkMode } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Blur from "./Blur";
import { ReactTyped } from "react-typed";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Ibrahimresume.pdf"; 
    link.download = "Ibrahim_Lawal_Abba.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleDarkMode = () => {
    const html = document.querySelector("html");
    if (theme === "light") {
      setTheme("dark");
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
      setTheme("light");
    }
  };

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  const closeNav = () => {
    setOpenNav(false);
  };

  // Active link style function
  const getNavLinkClass = (path:string) => {
    return pathname === path 
      ? "text-blue-500 font-semibold underline underline-offset-4" 
      : "";
  };

  return (
    <header className={`bg-[#212529] dark:bg-[#f9f7f6] text-[#f9f7f6] dark:text-[#545454] px-3 py-3 lg:px-16 flex items-center justify-between fixed top-0 left-0 w-full z-10`}>
      {openNav && <Blur handleNav={handleNav} />}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <h1 className="text-[20px] text-blue-500 font-semibold md:text-[30px] lg:text-start cursor-pointer">
              IBRAHIM LAWAL ABBA
            </h1>
          </Link>
          <ReactTyped
            className="font-bold lg:text-xl text-[12px] text-gray-400 dark:text-gray-400"
            strings={[
              "A FullStack Developer",
              "A FrontEnd Developer"
            ]}
            typeSpeed={120}
            backSpeed={120}
            loop
          />
        </div>
      </div>
      
      <nav className={openNav ? "flex bg-[#212529] dark:bg-[#f9f7f6] text-[#f9f7f6] dark:text-[#545454] fixed shadow-md left-0 top-0 w-full h-full z-50 px-10 duration-500 ease-in-out" : "fixed top-full"}>
        <ul className="pt-10 mx-auto text-center">
          <button className="cursor-pointer text-xl absolute left-12" onClick={handleToggleDarkMode}>
            <CgDarkMode onClick={closeNav} />
          </button>
          <li className="py-3 hover:text-4xl text-xl duration-300 ease-in hover:underline underline-offset-4" onClick={closeNav}>
            <Link href="/" className={getNavLinkClass("/")}>Home</Link>
          </li>
          <li className="py-3 hover:text-4xl text-xl duration-300 ease-in hover:underline underline-offset-4" onClick={closeNav}>
            <Link href="/skills" className={getNavLinkClass("/skills")}>Skills</Link>
          </li>
          <li className="py-3 hover:text-4xl text-xl duration-300 ease-in hover:underline underline-offset-4" onClick={closeNav}>
            <Link href="/experience" className={getNavLinkClass("/experience")}>Experience</Link>
          </li>
          <li className="py-3 hover:text-4xl text-xl duration-300 ease-in hover:underline underline-offset-4" onClick={closeNav}>
            <Link href="/project" className={getNavLinkClass("/project")}>Projects</Link>
          </li>
          <li className="py-3 hover:text-4xl text-xl duration-300 ease-in hover:underline underline-offset-4" onClick={closeNav}>
            <Link href="/contact" className={getNavLinkClass("/contact")}>Contact</Link>
          </li>
          <div className="w-full flex items-center justify-center my-4">
            <button
              onClick={handleDownload}
              className="flex text-white items-center gap-3 bg-linear-to-r duration-300 transition-all hover:scale-110 shadow-md from-blue-700 to-teal-600 py-1 px-3 rounded-md"
            >Resume</button>
          </div>
        </ul>
      </nav>
     
      <div className="flex items-center gap-5">
        <button
          onClick={handleDownload}
          className="hidden md:flex text-white items-center gap-3 bg-linear-to-r duration-300 transition-all hover:scale-110 shadow-md from-blue-700 to-teal-600 py-1 px-3 rounded-md"
        >Resume</button>
        <button className="cursor-pointer text-xl hidden md:flex" onClick={handleToggleDarkMode}>
          <CgDarkMode />
        </button>
        
        <button className="z-50 md:hidden transition-all duration-500 ease-in-out" onClick={handleNav}>
          {!openNav ? (
            <AiOutlineMenu size={20} />
          ) : (
            <AiOutlineClose size={20} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;