import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "nova-commerce",
    number: "01",
    title: "Nova Commerce",
    category: "Full Stack",
    description:
      "A scalable e-commerce platform with real-time inventory, secure checkout, and an admin dashboard built for high-traffic retail workflows.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    accent: "from-[#7b00ff]/50 via-[#A775FF]/20 to-[#0b0b0f]",
  },
  {
    id: "pulse-analytics",
    number: "02",
    title: "Pulse Analytics",
    category: "Front End",
    description:
      "Interactive analytics dashboard with animated charts, dark-mode UI, and responsive data views designed for fast decision-making.",
    tags: ["React", "TypeScript", "Tailwind", "GSAP"],
    liveUrl: "#",
    githubUrl: "#",
    accent: "from-[#A775FF]/40 via-[#7b00ff]/15 to-[#111118]",
  },
  {
    id: "vault-api",
    number: "03",
    title: "Vault API Gateway",
    category: "Backend",
    description:
      "RESTful microservice architecture with JWT auth, rate limiting, and modular service layers for secure enterprise integrations.",
    tags: ["Spring Boot", "Java", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    accent: "from-[#7b00ff]/35 via-transparent to-[#0b0b0f]",
  },
  {
    id: "orbit-portfolio",
    number: "04",
    title: "Orbit Portfolio Engine",
    category: "Creative Dev",
    description:
      "A motion-rich portfolio system with scroll-driven storytelling, shader-inspired visuals, and a component-driven design language.",
    tags: ["React", "GSAP", "Three.js", "WebGL"],
    liveUrl: "#",
    githubUrl: "#",
    accent: "from-[#A775FF]/45 via-[#7b00ff]/25 to-black",
  },
];

const Projects = () => {

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
      });

      cards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const isMobile = window.innerWidth < 768;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          x: isMobile ? 0 : isEven ? -70 : 70,
          y: isMobile ? 50 : 30,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
        });
      });
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
      id="work"
      ref={sectionRef}
      className="relative bg-black/90 overflow-hidden py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-20 lg:px-40"
    >
      {/* Subtle grid backdrop — different from Skills radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,117,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(167,117,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-[#7b00ff]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#A775FF]/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 sm:mb-16 md:mb-20">
          <p className="mb-3 font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-[#A775FF]/80">
            Selected Work
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="syne text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-none tracking-wide text-white/95">
              Projects
            </h2>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/45">
              A curated selection of builds — from full-stack systems to motion-driven interfaces.
            </p>
          </div>
          <div
            ref={lineRef}
            className="mt-6 h-px w-full max-w-xs bg-gradient-to-r from-[#A775FF] via-[#7b00ff]/60 to-transparent"
          />
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
          {projectsData.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
              >
                <div
                  className={`
                    relative flex flex-col overflow-hidden rounded-2xl border border-white/5
                    bg-[#0b0b0f]/70 backdrop-blur-md
                    transition-all duration-500
                    hover:border-[#7b00ff]/35 hover:shadow-[0_0_45px_rgba(123,0,255,0.15)]
                    md:flex-row md:min-h-[320px] lg:min-h-[360px]
                    ${isReversed ? "md:flex-row-reverse" : ""}
                  `}
                >
                  {/* Visual panel */}
                  <div className="relative h-48 sm:h-56 md:h-auto md:w-[45%] lg:w-[42%] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.accent} transition-transform duration-700 ease-out group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(167,117,255,0.35),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,15,0.9),transparent_60%)] md:bg-[linear-gradient(to_right,rgba(11,11,15,0.85),transparent_50%)]" />

                    <span className="absolute left-4 top-4 sm:left-6 sm:top-6 syne text-[clamp(3rem,10vw,5rem)] font-black leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-[#A775FF]/15">
                      {project.number}
                    </span>

                    {/* Hover overlay links */}
                    <div className="absolute inset-0 flex items-end justify-start gap-3 p-4 sm:p-6 opacity-100 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#A775FF]/40 bg-black/40 px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#A775FF] backdrop-blur-sm transition-all duration-300 hover:border-[#7b00ff] hover:bg-[#7b00ff]/20 hover:text-white"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs font-mono uppercase tracking-wider text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-[#A775FF]/50 hover:text-[#A775FF]"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-10">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#A775FF]/30 px-3 py-1 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-[#A775FF]/90">
                          {project.category}
                        </span>
                        <span className="font-mono text-[0.6rem] text-white/25">
                          {project.number} / 0{projectsData.length}
                        </span>
                      </div>

                      <h3 className="syne mb-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-[#A775FF]">
                        {project.title}
                      </h3>

                      <p className="max-w-xl text-sm sm:text-base leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/65">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.58rem] sm:text-[0.65rem] uppercase tracking-wide text-white/40 transition-colors duration-300 group-hover:border-[#7b00ff]/20 group-hover:text-[#A775FF]/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.liveUrl}
                        className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#A775FF]/80 transition-all duration-300 hover:gap-3 hover:text-[#A775FF]"
                      >
                        View Project
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 sm:mt-20 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-white/5 bg-[#0b0b0f]/50 px-5 py-6 sm:px-8 sm:py-7">
          <p className="text-sm sm:text-base text-white/50">
            Want to see more? Additional case studies and experiments are on the way.
          </p>
          <button
            type="button"
            className="syne shrink-0 rounded-lg border border-[#A775FF] px-5 py-2.5 text-sm text-white/80 transition-all duration-500 hover:border-[#7b00ff] hover:bg-[#7b00ff]/10 hover:text-white hover:shadow-[0_0_30px_#7b00ff]"
          >
            View All Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
