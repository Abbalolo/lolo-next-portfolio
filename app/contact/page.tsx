"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowDown, FiMail, FiSend } from "react-icons/fi";

import { Reveal } from "../components/motion/Reveal";
import { TextReveal } from "../components/motion/TextReveal";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const field =
  "w-full rounded-lg border border-line bg-transparent px-4 py-3 text-fg placeholder:text-muted outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent-soft";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) {
      toast.error("Form not found");
      return;
    }
    setLoading(true);

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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <section className="container-page pt-12 md:pt-16 pb-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        {/* Intro */}
        <div className="lg:sticky lg:top-24">
          <Reveal>
            <p className="label">Contact</p>
            <TextReveal
              as="h1"
              text="Let's talk"
              className="mt-3 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]"
            />
            <p className="mt-4 text-muted leading-relaxed max-w-md">
              Have a project, role, or idea? Send a message and I&apos;ll get back to you. Open to
              freelance, full-time, and collaborations.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <a
              href="mailto:abbalolo360@gmail.com"
              className="inline-flex items-center gap-2 text-accent hover:underline mono text-sm"
            >
              <FiMail /> abbalolo360@gmail.com
            </a>
          </Reveal>

          <Reveal delay={0.18} className="mt-8">
            <p className="label flex items-center gap-2">
              Write me a message <FiArrowDown className="animate-bounce" />
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <form ref={form} onSubmit={handleForm} className="rounded-xl border border-line bg-surface p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label mb-1.5 block">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="label mb-1.5 block">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={field} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="label mb-1.5 block">Subject</label>
              <input id="subject" name="subject" type="text" required placeholder="What's this about?" className={field} />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="label mb-1.5 block">Message</label>
              <textarea id="message" name="message" required rows={6} placeholder="Tell me about your project…" className={`${field} resize-y`} />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-6 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              <FiSend size={16} />
              {loading ? "Sending…" : "Send message"}
            </motion.button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
