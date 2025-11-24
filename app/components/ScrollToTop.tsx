import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const  pathname  = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}