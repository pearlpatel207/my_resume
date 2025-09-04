"use client";

import { useState } from "react";
import { experiences, Experience } from "@/data/experiences";

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">👣 Experience</h2>
      <div className="relative max-w-5xl mx-auto">
        {/* Central vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-amber-500"></div>

        <div className="space-y-12">
          {experiences.map((exp: Experience, i: number) => (
            <div
            key={i}
            className={`md:flex relative group ${
              exp.align === "left" ? "md:justify-start" : "md:justify-end"
            }`}
          >
            {exp.align === "left" && <div className="md:w-1/2"></div>}
          
            <div
              className={`md:w-1/2 ${
                exp.align === "left" ? "md:pr-8" : "md:pl-8"
              } relative z-10`}
            >
              <div
                className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-4 transition-all duration-300 cursor-pointer group-hover:p-6 group-hover:shadow-xl"
                onClick={() => handleClick(i)}
              >
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.location}</p>
          
                <ul
                  className={`mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-200 overflow-hidden transition-all duration-300 ${
                    expandedIndex === i ? "max-h-96" : "max-h-0 md:group-hover:max-h-96"
                  }`}
                >
                  {exp.bullets.map((b, idx) =>
                    b.link ? (
                      <li key={idx}>
                        <a
                          href={b.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-500 underline hover:text-amber-600 transition-colors"
                        >
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
          
            {exp.align === "right" && <div className="md:w-1/2"></div>}
          </div>
          
          ))}
        </div>
      </div>
    </section>
  );
}
