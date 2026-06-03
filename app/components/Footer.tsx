"use client"
import { AiFillGithub, AiFillInstagram } from "react-icons/ai"; 
import { useEffect } from "react";
import { useState } from "react";
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai"
import Link from "next/link";


function Footer() {

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <>
  <footer
  className={
    scrolling
      ? "fixed bottom-0 left-0 right-0 z-50 lg:hidden backdrop-blur-md bg-black/70 dark:bg-white/70 shadow-2xl"
      : "hidden"
  }
>
  <div className="flex justify-around items-center py-3 text-2xl text-gray-300 dark:text-gray-600">
    <Link target="_blank" href="https://web.facebook.com/lolo.fundz/">
      <AiFillFacebook className="hover:text-blue-700 duration-300" />
    </Link>

    <Link
      target="_blank"
      href="https://www.linkedin.com/in/ibrahim-lawal-2772a8243/"
    >
      <AiFillLinkedin className="hover:text-blue-500 duration-300" />
    </Link>

    <Link target="_blank" href="https://twitter.com/Ibrahim46284657">
      <AiFillTwitterCircle className="hover:text-blue-300 duration-300" />
    </Link>

    <Link target="_blank" href="https://github.com/Abbalolo">
      <AiFillGithub className="hover:text-white duration-300" />
    </Link>

    <Link
      target="_blank"
      href="https://instagram.com/lohloh009?igshid=OGQ5ZDc2ODk2ZA=="
    >
      <AiFillInstagram className="hover:text-red-300 duration-300" />
    </Link>
  </div>
</footer>
    </>
  )
}

export default Footer