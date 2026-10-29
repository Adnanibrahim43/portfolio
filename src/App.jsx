import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Dashboard from "./components/Dashboard";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  // Each glass panel slides up and fades in the first time it scrolls into view
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.utils.toArray(".glass").forEach((panel) => {
        gsap.from(panel, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: mainRef }
  );

  return (
    <>
      <CursorFollower />

      {/* Background grid */}
      <div className="bg-grid-pattern pointer-events-none fixed inset-0 z-0" />

      <Navbar />

      <main ref={mainRef} className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Dashboard />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}

export default App;