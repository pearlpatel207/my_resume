"use client";
import { useState } from "react";
import { experiences } from "@/data/experiences";

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-16">👣 Experience</h2>
      <div className="relative max-w-5xl mx-auto">
        {/* Central vertical line */}
        <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 sm:w-0.5 h-full bg-amber-500"></div>

        <div className="space-y-12 relative">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative flex flex-col sm:flex-row ${
                exp.align === "left" ? "sm:justify-start" : "sm:justify-end"
              }`}
            >
              {/* Marker */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-5 h-5 bg-amber-500 rounded-full shadow-md top-0 sm:top-1/2 sm:-translate-y-1/2 z-20"></div>

              {/* Spacer for alignment */}
              {exp.align === "left" && <div className="sm:w-1/2"></div>}

              <div
                className={`sm:w-1/2 relative z-10 ${
                  exp.align === "left"
                    ? "sm:pr-12 ml-8"
                    : "sm:pl-12 sm:mr-8"
                }`}
              >
                <div
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02]"
                  onClick={() => handleClick(i)}
                >
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    {exp.location}
                  </p>

                  <ul
                    className={`mt-2 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-200 overflow-hidden transition-all duration-300 ${
                      expandedIndex === i
                        ? "max-h-96"
                        : "max-h-0 sm:group-hover:max-h-96"
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

              {exp.align === "right" && <div className="sm:w-1/2"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
