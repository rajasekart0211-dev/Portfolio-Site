import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid, Code2, Film, Fingerprint, Server, Sparkles } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    id: "ui-ux",
    title: "Front-End Design",
    desc: "Creating intuitive, obsidian-grade interfaces that prioritize user flow and high-fidelity interaction design.",
    tag: "React, Tailwind, G-sap, Redux, TypeScript, Javascript, Html, css",
    colSpan: "lg:col-span-2",
    icon: "code",//layout
  },
  {
    id: "frontend",
    title: "BackEnd Development",
    desc: "Engineering performant, scalable web applications with a focus on clean code and pixel-perfect execution.",
    tag: "Spring-Boot, Node.js, Express",
    rowSpan: "lg:row-span-2",
    icon: "server",//code
  },
  {
    id: "motion",
    title: "Databases & ORM",
    desc: "Designing dynamic narratives, vector animations, and visual storytelling interfaces that capture attention.",
    tag: "SQL, MongoDB, AWS, Prisma, JPA",
    colSpan: "",
    icon: "play",
  },
  {
    id: "branding",
    title: "Languages",
    desc: "Forging cohesive visual identities, design systems, and brand strategies that leave a memorable mark.",
    tag: "Java, Python, c",
    colSpan: "lg:row-span-2",
    icon: "award",
  },
  {
    id: "backend",
    title: "Concepts",
    desc: "Architecting secure, distributed server infrastructures and databases that scale seamlessly.",
    tag: "DSA, system design, OOPS, solid principles",
    colSpan: "",
    icon: "sparkles",
  }
];

const renderIcon = (icon) => {
  const size = 32;
  const strokeWidth = 1.2;
  switch (icon) {
    case "layout": return <LayoutGrid size={size} strokeWidth={strokeWidth} />;
    case "code": return <Code2 size={size} strokeWidth={strokeWidth} />;
    case "play": return <Film size={size} strokeWidth={strokeWidth} />;
    case "award": return <Fingerprint size={size} strokeWidth={strokeWidth} />;
    case "server": return <Server size={size} strokeWidth={strokeWidth} />;
    case "sparkles": return <Sparkles size={size} strokeWidth={strokeWidth} />;
    default: return null;
  }
};

const Skills = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const getViewportTier = () => {
      const width = window.innerWidth;
      if (width < 640) return "sm";
      if (width < 768) return "md";
      return "lg";
    };

    // Create GSAP ScrollTrigger Context
    const ctx = gsap.context(() => {
      const tier = getViewportTier();
      const isMobile = tier !== "lg";
      const isSmallMobile = tier === "sm";

      // Set up pinned scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isSmallMobile ? "+=130%" : isMobile ? "+=150%" : "+=180%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Text fades out and scales down to 0
      gsap.set(titleRef.current, { transformOrigin: "center center" });

      tl.to(titleRef.current, {
        scale: 0.1,
        opacity: 0,
        y: isSmallMobile ? -30 : isMobile ? -50 : -100,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // 2. Animate cards from random shattered positions to origin
      cards.forEach((card, index) => {
        // Calculate explosion angle and radius
        const angle = (index / cards.length) * Math.PI * 2;
        // Keep scatter radius within viewport on smaller screens
        const radius = isSmallMobile
          ? (120 + Math.random() * 80)
          : isMobile
            ? (200 + Math.random() * 120)
            : (750 + Math.random() * 450);
        
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;
        const startZ = (Math.random() - 0.5) * (isMobile ? 200 : 600);
        
        const startRotX = (Math.random() - 0.5) * 240;
        const startRotY = (Math.random() - 0.5) * 240;
        const startRotZ = (Math.random() - 0.5) * 240;
        const startScale = 0.2 + Math.random() * 0.4;

        // Set the initial shattered properties
        gsap.set(card, {
          x: startX,
          y: startY,
          z: startZ,
          rotationX: startRotX,
          rotationY: startRotY,
          rotationZ: startRotZ,
          scale: startScale,
          opacity: 0
        });

        // Assemble animation timeline
        tl.to(card, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0.2); // Start slightly after title starts shrinking
      });
    }, containerRef); 

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black/90 overflow-hidden flex flex-col justify-center items-center py-16 sm:py-20 px-4 sm:px-6 md:px-20 lg:px-40"
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
    >
      {/* Background radial highlight for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,0,255,0.08),transparent_70%)] pointer-events-none" />

      {/* Floating Center Text */}
      <div className="absolute inset-0 h-[100vh] flex items-center justify-center pointer-events-none px-3 sm:px-4">
        <h2
          ref={titleRef}
          className="text-center syne font-black text-[clamp(2rem,13vw,3.75rem)] sm:text-[clamp(2.5rem,11vw,4.5rem)] md:text-[clamp(4rem,10vw,8rem)] text-white/95 select-none drop-shadow-[0_0_40px_rgba(167,117,255,0.45)] uppercase tracking-wide sm:tracking-wider leading-none max-w-full"
        > 
          Skills
        </h2>
      </div>

      {/* Grid Layout Container */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        {skillsData.map((skill, index) => (
          <div
            key={skill.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`
              relative overflow-hidden p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/5
              bg-[#0b0b0f]/80 backdrop-blur-md
              transition-all duration-500 group
              hover:border-[#7b00ff]/40 hover:shadow-[0_0_35px_rgba(123,0,255,0.2)]
              flex flex-col justify-between min-h-[180px] sm:min-h-[200px] md:min-h-[220px]
              ${skill.colSpan || ""} ${skill.rowSpan || ""}
            `}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle glow border line at the top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A775FF]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Neon radial glow in corner on hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#7b00ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            <div>
              {/* Icon Container with smooth hover bump */}
              <div className="text-[#A775FF]/80 mb-4 sm:mb-6 w-fit scale-90 sm:scale-100 origin-left transform transition-transform duration-300 group-hover:scale-110 group-hover:text-[#A775FF]">
                {renderIcon(skill.icon)}
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl text-white font-semibold syne mb-2 sm:mb-3 tracking-wide group-hover:text-[#A775FF] transition-colors duration-300">
                {skill.title}
              </h3>
              
              <p className="text-xs sm:text-sm md:text-base text-white/50 leading-relaxed font-sans group-hover:text-white/70 transition-colors duration-300">
                {skill.desc}
              </p>
            </div>

            <div className="mt-5 sm:mt-8 flex justify-between items-start sm:items-center text-[0.58rem] sm:text-[0.65rem] md:text-[0.75rem] tracking-[0.12em] sm:tracking-widest text-[#A775FF]/70 uppercase font-mono">
              <span className="font-semibold break-words leading-snug transition-all duration-300 group-hover:text-[#A775FF] group-hover:translate-x-1">
                • {skill.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
