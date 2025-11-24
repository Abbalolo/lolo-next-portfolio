"use client";

import { AiOutlineArrowDown } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/SideBar"; 

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!form.current) {
      toast.error("Form not found");
      setLoading(false);
      return;
    }

    const formData = new FormData(form.current);

    const data: FormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.current.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="mt-8 flex gap-5 w-full dark:text-black text-[#f9f7f6] px-5 lg:px-16 md:px-10">
        <SideBar />
        <div className="w-full">
          <h2
            data-aos="fade-left"
            className="py-1 font-extrabold text-2xl text-center md:text-4xl text-blue-500 dark:text-blue-500 mb-5"
          >
            Let&apos;s Talk
          </h2>

          <div>
            <h2 className="flex gap-5 justify-center items-center my-5 text-xl">
              Write Me A Message{" "}
              <AiOutlineArrowDown className="text-blue-500 animate-bounce" />
            </h2>

            <form
              ref={form}
              onSubmit={handleForm}
              className="md:w-7/12 md:mx-auto pb-12 w-full"
            >
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="border w-full outline-none border-gray-600 p-2 bg-transparent dark:border-gray-300 mb-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="border w-full outline-none border-gray-600 p-2 bg-transparent dark:border-gray-300 mb-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />

              <input
                name="subject"
                type="text"
                required
                placeholder="Subject"
                className="border w-full outline-none border-gray-600 p-2 bg-transparent dark:border-gray-300 mb-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />

              <textarea
                name="message"
                required
                placeholder="Message"
                rows={8}
                className="border w-full outline-none border-gray-600 p-2 bg-transparent dark:border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="block text-white my-5 bg-linear-to-r duration-300 hover:text-white hover:scale-105 shadow-md from-blue-500 to-teal-600 py-3 px-7 md:w-28 w-full rounded-md font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;