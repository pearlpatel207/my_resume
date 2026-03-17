"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Mail, Menu, X } from "lucide-react";
import { projects } from "@/data/projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Portfolio() {
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const adjectives = ["smart", "creative", "magical", "ethical", "innovative"];
  const duration = 2.5;

  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  type Theme = 'sunrise' | 'day' | 'sunset' | 'night';

  const [theme, setTheme] = useState<Theme>('day');

  const themeClasses: Record<Theme, string> = {
    sunrise: "bg-gradient-to-b from-orange-200 via-pink-200 to-sky-200 text-gray-800",
    day: "bg-gradient-to-b from-sky-200 via-sky-100 to-amber-100 text-gray-800",
    sunset: "bg-gradient-to-b from-pink-300 via-orange-200 to-purple-300 text-gray-900",
    night: "bg-gradient-to-b from-slate-900 via-slate-800 to-sky-900 text-gray-100",
  };

  const handleDiveIn = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  
    setTimeout(() => {
      const audio = new Audio("/sounds/sound.mp3");
      audio.volume = 0.05;
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

      {/* NAV BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <span className="font-semibold text-amber-500">Pearl Patel</span>

          {/* Desktop links */}
          <div className="hidden sm:flex gap-5 text-sm font-medium">
            {["about", "education", "experience", "projects", "publications", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="capitalize hover:text-amber-500 transition-colors">
                {s}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-1 rounded-md hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden bg-white/95 dark:bg-slate-900/95 border-t border-amber-100 dark:border-slate-700 px-6 py-4 flex flex-col gap-4 text-sm font-medium"
            >
              {["about", "education", "experience", "projects", "publications", "contact"].map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className="capitalize hover:text-amber-500 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {s}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* THEME TOGGLE BUTTONS
      <div className="fixed top-4 right-4 flex flex-col space-y-2 z-50">
        {['sunrise', 'day', 'sunset', 'night'].map((t) => (
          <Button key={t} onClick={() => setTheme(t)} className="px-4 py-2 rounded-lg">
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div> */}

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center h-screen px-6 pt-16">

        {/* Name */}
        <motion.h1
          className="text-4xl md:text-6xl font-semibold mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pearl Patel
        </motion.h1>
        <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
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
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#about">
            <Button
              onClick={handleDiveIn}
              className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-amber-600">
              🌊 Dive In
            </Button>
          </a>
          <a href="/resume.pdf" download>
            <Button variant="outline" className="px-6 py-3 rounded-2xl shadow-lg border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-800">
              📄 Resume
            </Button>
          </a>
        </div>

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
            AI Engineer @ Ayzenberg | Working on GenAI, Digital Twins, Social Media Predictions ✨
          </p>
          <p>Based in Los Angeles, CA ⭐️🏙️</p>
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

      {/* EDUCATION */}
      <section id="education" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">🎓 Education</h2>

        <div className="space-y-8 text-left">
          {/* USC */}
          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <h3 className="text-xl font-semibold">University of Southern California</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Los Angeles, CA</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Master of Science in Computer Science
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">June 2023 – December 2024</p>
          </div>

          {/* Mumbai Univ */}
          <div className="bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <h3 className="text-xl font-semibold">University of Mumbai</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mumbai, India</p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Bachelor of Engineering in Computer Engineering
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">August 2017 – June 2021</p>
          </div>
        </div>
      </section>


      {/* EXPERIENCE - Interactive Timeline */}
      <ExperienceTimeline />
      
      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6">
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
            href="https://scholar.google.com/citations?hl=en&user=UolAykkAAAAJ"
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
          <a href="https://github.com/pearlpatel207" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/pearl-patel-20799/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
          </a>
          <a href="mailto:pearl207@gmail.com"><Mail className="w-8 h-8 hover:text-amber-500"/></a>
        </div>
        <p className="mt-6">Always down to debug over coffee...or a coconut 🥥</p>
      </footer>
    </div>
  );
}
