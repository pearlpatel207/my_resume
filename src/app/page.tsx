"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Underline } from "lucide-react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";

export default function Portfolio() {
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const adjectives = ["smart", "creative", "magical", "ethical", "innovative"];
  const duration = 2.5;

  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("All");

  type Theme = 'sunrise' | 'day' | 'sunset' | 'night';

  const [theme, setTheme] = useState<Theme>('day');

  const themeClasses: Record<Theme, string> = {
    sunrise: "bg-gradient-to-b from-orange-200 via-pink-200 to-sky-200 text-gray-800",
    day: "bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 text-gray-800",
    sunset: "bg-gradient-to-b from-pink-300 via-orange-200 to-purple-300 text-gray-900",
    night: "bg-gradient-to-b from-slate-900 via-slate-800 to-sky-900 text-gray-100",
  };

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDiveIn = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  
    setTimeout(() => {
      const audio = new Audio("/sounds/sound.mp3");
      audio.play().catch((e) => console.warn("Audio failed to play:", e));
    }, 2);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % adjectives.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (theme === "night") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTheme("sunrise");
    else if (hour >= 12 && hour < 18) setTheme("day");
    else if (hour >= 18 && hour < 21) setTheme("sunset");
    else setTheme("night");
  }, []);

  const waveColors = {
    sunrise: "#FDBA74",
    day: "#60A5FA",
    sunset: "#F472B6",
    night: "#0F172A",
  };
    
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const publications = [
    { title: "FileShare: A Blockchain and IPFS Framework for Secure File Sharing and Data Provenance", authors: "Khatal S., Rane J., Patel D., Patel P., Busnel Y.", venue: "Advances in Machine Learning and Computational Intelligence, Algorithms for Intelligent Systems (Springer), 2021" },
    { title: "Issuing and Verifying University Certificates on Blockchain", authors: "Patel D., Rajan B., Mangnaik Y., Jain J., Mistry V., Patel P.", venue: "IC-BCT 2019, Blockchain Technologies (Springer), 2020" },
    { title: "Blockchain In Depth", authors: "Kotha S, Patel P.", venue: "International Journal of Engineering and Computer Science (IJECS), 2020" },
  ];
    
  const filteredProjects = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className={`font-sans min-h-screen overflow-x-hidden ${themeClasses[theme]}`}>      
      {/* THEME TOGGLE BUTTONS
      <div className="fixed top-4 right-4 flex flex-col space-y-2 z-50">
        {['sunrise', 'day', 'sunset', 'night'].map((t) => (
          <Button key={t} onClick={() => setTheme(t)} className="px-4 py-2 rounded-lg">
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div> */}

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center h-screen px-6">

        {/* Name */}
        <motion.h1
          className="text-4xl md:text-6xl font-semibold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pearl Patel
        </motion.h1>
        <motion.h2
        className="text-2xl md:text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Engineering{" "}
        <span className="text-amber-500 inline-block">
          <AnimatePresence mode="wait">
            <motion.span
              key={adjectives[current]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {adjectives[current]}
            </motion.span>
          </AnimatePresence>
        </span>{" "} AI so humans
        can do extraordinary things.
      </motion.h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          AI/ML + Software Engineer | Generative AI, Full Stack Development
        </p>
        <a href="#about">
          <Button 
          onClick={handleDiveIn}
          className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-amber-600">
            🌊 Dive In
          </Button>
        </a>

        {/* Animated waves*/}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] h-32">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              className="absolute w-[200%] h-32"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
              initial={{ x: 0 }}
              animate={{ x: ["0%", "-10%", "0%"] }}
              transition={{
                duration: 9 + i * 3, // different speed for each layer
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              <path
                d="M0,0V46.29c47.79,22,103.74,29.05,158,17C230,51,284,17,339,7.4c54-9.6,108,6.4,162,22,53,15.6,107,31.6,161,28,53-3.6,107-27,161-43,54-16,108-26,162-14,54,12,108,44,162,61,54,17,108,19,162,11V0Z"
                fill={waveColors[theme]}
                fillOpacity={0.2 + i * 0.1} // layered opacity
              />
            </motion.svg>
          ))}
        </div> 
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} id="about" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">☀️ About Me</h2>
        
        {/* Tiny Summary */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
        Hi there! I’m a passionate AI/ML Engineer building scalable machine learning systems and generative AI applications that solve real-world problems.
        </p>

        {/* Current Work / Projects */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold mb-2">💻 Currently</h3>
          <p className="text-gray-700 dark:text-gray-200">
            Software Engineer @ Easley-Dunn | Working on backend systems, AI/ML projects, and scalable applications ✨
          </p>
        </div>

        {/* Fun Facts + Professional Bits */}
        <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">
          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">🐚 Fun Facts</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>AWS DeepRacer Finalist 🏎️</li>
              <li>Published with Springer 📄</li>
              <li>PyPI library with 2000+ downloads 📦</li>
            </ul>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">🌴 Professional Bits</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>AI/ML systems: NLP, Vision, Generative AI</li>
              <li>Full-stack & distributed systems</li>
              <li>Scalable, production-ready software</li>
            </ul>
          </div>
        </div>
        {/* CONTACT */}
        <section id="contact" className="py-12 px-6 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3">⛵️ Get in Touch</h3>
          <p className="text-gray-700 dark:text-gray-200 mb-3">
            I’m always open to discussing AI, software engineering, or collaboration opportunities.
          </p>
          <p>
          Email: pearl207@gmail.com | <a href="https://www.linkedin.com/in/pearl-patel-20799/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors">
              LinkedIn
            </a>
          </p>
        </section>
      </section>

      {/* EXPERIENCE - Interactive Timeline */}
      <section id="experience" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">👣 Experience</h2>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 md:left-1/2 sm:left-6 transform -translate-x-1/2 md:h-full h-full border-l-2 border-amber-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row ${
                  exp.align === "right" ? "md:justify-end" : "md:justify-start"
                } relative group`}
              >
                <div className="w-full md:w-1/2 md:pr-8 md:pl-8 relative z-10">
                  <div
                    className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-4 transition-all duration-300 group-hover:p-6 group-hover:shadow-xl cursor-pointer"
                    onClick={() => toggleExpand(i)}
                  >
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{exp.location}</p>
                    <ul
                      className={`mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-200 overflow-hidden transition-all duration-300 ${
                        expandedIndex === i ? "max-h-96" : "max-h-0 md:group-hover:max-h-96"
                      }`}
                    >
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-4">🏖️ Side Quests</h2>
      <p className="text-gray-700 dark:text-gray-200 text-center mb-10">
      Check out all the cool projects I've worked on!
      </p>


      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
      {categories.map((cat) => (
      <button
      key={cat}
      onClick={() => setActiveTab(cat)}
      className={`px-4 py-2 rounded-full shadow-md transition ${
      activeTab === cat
      ? "bg-amber-500 text-white"
      : "bg-white/70 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-amber-100"
      }`}
      >
      {cat}
      </button>
      ))}
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {filteredProjects.map((proj, i) => (
      <motion.div
      key={i}
      whileHover={{ y: -5 }}
      className="rounded-2xl shadow-md bg-white/80 dark:bg-slate-800/70 overflow-hidden flex flex-col justify-between"
      >
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{proj.title}</h3>
        <ul className="list-disc list-inside mb-3 text-sm text-gray-600 dark:text-gray-300">
          {proj.desc.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
        {proj.link && (
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 underline hover:text-amber-600"
          >
            Learn More
          </a>
        )}
      </CardContent>

      </motion.div>
      ))}
      </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications" className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">📚 Publications</h2>
        <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
          You can find more on my {" "}
          <a
            href="https://scholar.google.com/citations?user=YOUR-SCHOLAR-ID"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 underline hover:text-amber-600"
          >
            Google Scholar
          </a>
        </p>
        <div className="max-w-4xl mx-auto space-y-6">
          {publications.map((pub, idx) => (
            <div key={idx} className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{pub.authors}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pub.venue}</p>
            </div>
          ))}
        </div>
      </section>



      {/* CONTACT */}
      {/* <footer className="bg-gradient-to-t from-amber-200 to-sky-100 dark:from-slate-800 dark:to-slate-900 py-16 px-6 text-center"> */}
      <footer className={`font-sans ${themeClasses[theme]} py-16 px-6 text-center  bg-sky-50/60 dark:bg-slate-800/40`}>
        <h2 className="text-3xl font-bold mb-6">🍹 Let’s Build Something!</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/pearlpatel207" target="_blank" rel="noopener noreferrer"><Github className="w-8 h-8 hover:text-amber-500"/></a>
          <a href="https://www.linkedin.com/in/pearl-patel-20799/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-8 h-8 hover:text-amber-500"/></a>
          <a href="mailto:pearl207@gmail.com"><Mail className="w-8 h-8 hover:text-amber-500"/></a>
        </div>
        <p className="mt-6">Always down to debug over coffee...or a coconut 🥥</p>
      </footer>
    </div>
  );
}
