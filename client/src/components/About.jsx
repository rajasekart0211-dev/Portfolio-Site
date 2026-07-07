import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Target, Zap, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const aboutBlocks = [
  {
    id: "who",
    label: "01 — Identity",
    title: "Who Am I?",
    text: "Hi, I'm Raja Sekar — an IT postgraduate and aspiring Full-Stack Developer who loves turning ideas into polished, interactive web experiences.",
    icon: Sparkles,
  },
  {
    id: "what",
    label: "02 — Craft",
    title: "What Do I Do?",
    text: "I specialize in full-stack development — building responsive, performant applications with modern front-end aesthetics and solid backend architecture.",
    icon: Code2,
  },
  {
    id: "goal",
    label: "03 — Direction",
    title: "What Am I Looking For?",
    text: "I'm sharpening DSA and system design while pushing into advanced development concepts to become a sharper, more complete software engineer.",
    icon: Target,
  },
];


const About = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const contentRef = useRef(null);
  const watermarkRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const orbRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const statEls = statsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const isSmall = window.innerWidth < 640;
      const isMedium = window.innerWidth < 1024;

      gsap.set(contentRef.current, { transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      // ── Phase 1: explosive entrance (0 → 35%) ──
      tl.from(
        watermarkRef.current,
        { scale: 1.8, opacity: 0, filter: "blur(20px)", ease: "power3.out" },
        0
      );

      tl.fromTo(  
        headerRef.current?.children ?? [],
        { y: 80, opacity: 0, rotateX: -40, stagger: 0.08, ease: "power3.out" },
        {opacity: 1, y: 0, rotateX: 0},0.1
      );

      tl.from(
        lineRef.current,
        { scaleX: 0, opacity: 0, ease: "power2.inOut" },
        0.1
      );

      cards.forEach((card, i) => {
        tl.from(
          card,
          {
            x: i % 2 === 0 ? (isSmall ? -70 : -110) : isSmall ? 70 : 110,
            y: 50,
            opacity: 0,
            rotateY: i % 2 === 0 ? -16 : 16,
            scale: 0.85,
            ease: "power3.out",
          },
          0.08 + i * 0.05
        );
      });

      statEls.forEach((stat, i) => {
        tl.from(
          stat,
          { y: 35, opacity: 0, scale: 0.6, ease: "back.out(2)" },
          0.2 + i * 0.04
        );
      });

      // ── Phase 2: parallax pulse (35 → 50%) ──
      tl.to(
        watermarkRef.current,
        { scale: 1.08, opacity: 0.07, ease: "none" },
        0.35
      );

      tl.to(
        orbRef.current,
        { x: isSmall ? 25 : 50, y: isSmall ? -15 : -35, scale: 1.25, ease: "none" },
        0.35
      );

      tl.to(cards, { y: -6, stagger: 0.03, ease: "none" }, 0.38);

      // ── Phase 3: hold (50 → 58%) ──
      tl.to({}, { duration: 0.08 }, 0.5);

      // ── Phase 4: crush to zero as Skills stacks on top (58 → 100%) ──
      tl.to(
        contentRef.current,
        {
          scale: 0,
          opacity: 0,
          rotateX: isMedium ? 18 : 25,
          rotateZ: -5,
          y: isSmall ? -30 : -70,
          filter: "blur(14px)",
          ease: "power3.inOut",
        },
        0.58
      );

      tl.to(
        stickyRef.current,
        {
          ease: "power2.inOut",
        },
        0.58
      );
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[220vh] sm:min-h-[240vh] lg:min-h-[260vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-black/90"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={contentRef}
          className="relative flex h-full w-full flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-32 xl:px-40 py-20 sm:py-24"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Background layers */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(123,0,255,0.12),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(167,117,255,0.08),transparent_45%)]" />
          <div
            ref={orbRef}
            className="pointer-events-none absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-[#7b00ff]/20 blur-[100px] sm:h-80 sm:w-80"
          />

          {/* Watermark */}
          <p
            ref={watermarkRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 syne text-[clamp(5rem,22vw,14rem)] font-black uppercase leading-none tracking-widest text-white/[0.04] select-none"
          >
            About
          </p>

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            {/* Header */}
            <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12">
              <div className="mb-3 flex items-center gap-3">
                <Zap size={16} className="text-[#A775FF]" />
                <p className="font-mono text-[0.6rem] sm:text-xs uppercase 
                tracking-[0.3em] text-[#A775FF]/80">
                  The Developer Behind The Code
                </p>
              </div>
              <h2 className="syne text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-none tracking-wide text-white/95">
                About Me
              </h2>
              <div
                ref={lineRef}
                className="mt-5 h-px w-full max-w-sm origin-left bg-gradient-to-r from-[#A775FF] via-[#7b00ff]/70 to-transparent"
              />
            </div>  

            {/* Content cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
              {aboutBlocks.map((block, index) => {
                const Icon = block.icon;
                return (
                  <article
                    key={block.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 bg-[#0b0b0f]/75 p-5 sm:p-6 backdrop-blur-md transition-colors duration-500 hover:border-[#7b00ff]/35"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7b00ff]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A775FF]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-mono text-[0.58rem] sm:text-[0.65rem] uppercase tracking-widest text-[#A775FF]/60">
                          {block.label}
                        </span>
                        <Icon size={18} className="text-[#A775FF]/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#A775FF]" />
                      </div>
                      <h3 className="syne mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#A775FF]">
                        {block.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                        {block.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
