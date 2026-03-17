"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";

const beachEmojis = ["🌴", "🏄", "🐚", "🦀", "⛵", "🐠"];

export default function ExperienceTimeline() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + experiences.length) % experiences.length);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 320 : -320, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -320 : 320, opacity: 0 }),
  };

  const exp = experiences[current];
  const [company, role] = exp.title.split(" – ");
  const [city, dates] = exp.location.split(" | ");

  return (
    <section id="experience" className="py-20 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-2">👣 Experience</h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-10">
        Life is a beach — here&apos;s every stop along mine 🌊
      </p>

      {/* Skinny timeline — scrollable on mobile, full width on desktop */}
      <div className="max-w-5xl mx-auto px-8 mb-10">
        <div
          className="overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative min-w-max sm:min-w-0">
            {/* Line */}
            <div className="absolute left-0 right-0 top-[7px] h-px bg-amber-200 dark:bg-slate-600" />
            {/* Markers */}
            <div className="relative flex sm:justify-between gap-10 sm:gap-0">
              {experiences.map((exp, i) => {
                const [co, rl] = exp.title.split(" – ");
                const isActive = i === current;
                return (
                  <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-1.5 group flex-shrink-0">
                    <div className={`rounded-full border-2 transition-all duration-200 ${
                      isActive
                        ? "w-3.5 h-3.5 bg-amber-500 border-amber-500"
                        : "w-2.5 h-2.5 bg-white dark:bg-slate-800 border-amber-300 dark:border-slate-500 group-hover:border-amber-500"
                    }`} />
                    <span className={`text-sm font-semibold leading-tight text-center max-w-[90px] transition-colors duration-200 ${
                      isActive ? "text-amber-500" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600"
                    }`}>
                      {co}
                    </span>
                    <span className={`text-xs leading-tight text-center max-w-[90px] transition-colors duration-200 ${
                      isActive ? "text-amber-400" : "text-gray-400 dark:text-gray-500"
                    }`}>
                      {rl}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Postcard */}
      <div className="max-w-2xl mx-auto px-10 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-md hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-md hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) navigate(1);
                else if (info.offset.x > 80) navigate(-1);
              }}
              className="bg-white/90 dark:bg-slate-800/80 rounded-2xl shadow-lg border-2 border-amber-100 dark:border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              <div className="h-2 bg-gradient-to-r from-sky-400 via-amber-300 to-sky-400" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-sky-500 font-medium mb-1">{dates}</p>
                    <h3 className="text-xl font-bold leading-tight">{company}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{role}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">🏖️ {city}</p>
                  </div>
                  <span className="text-4xl ml-4 flex-shrink-0">{beachEmojis[current % beachEmojis.length]}</span>
                </div>
                <div className="border-t-2 border-dashed border-amber-200 dark:border-slate-600 pt-4">
                  <ul className="space-y-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-200">
                    {exp.bullets.map((b, idx) =>
                      b.link ? (
                        <li key={idx}>
                          <a href={b.link} target="_blank" rel="noopener noreferrer" className="text-sky-500 underline hover:text-sky-600">
                            {b.text}
                          </a>
                        </li>
                      ) : (
                        <li key={idx}>{b.text}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
