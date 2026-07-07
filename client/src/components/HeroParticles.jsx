import React, { useEffect, useRef } from "react";

const HeroParticles = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Handle high density displays (Retina/4K screens)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    let particles = [];
    // Color palette: purple/violet gradients & subtle accents matching the portfolio colors
    const colors = [
      "rgba(167, 117, 255, 0.8)",  // #A775FF neon light purple
      "rgba(123, 0, 255, 0.7)",    // #7b00ff rich violet
      "rgba(216, 180, 254, 0.8)",  // light purple
      "rgba(255, 255, 255, 0.9)",  // clean white
      "rgba(244, 114, 182, 0.7)",  // soft pink accent
    ];

    const initParticles = () => {
      // Dynamic count: more particles on larger screens, fewer on mobile
      const count = Math.min(100, Math.floor((width * height) / 24000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1; // particles range from 1px to 3px
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseVx: (Math.random() - 0.5) * 0.6,
          baseVy: (Math.random() - 0.5) * 0.6,
          vx: 0,
          vy: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
      particles.forEach((p) => {
        p.vx = p.baseVx;
        p.vy = p.baseVy;
      });
    };

    // Track mouse position relative to the container element
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    const handleMouseEnter = () => {
      mouse.current.active = true;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseenter", handleMouseEnter);

    handleResize();

    // ResizeObserver ensures updates when container size is changed by other factors (e.g. menu, DOM injection)
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Apply visual friction to return to base speed smoothly
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        // Mouse attraction/magnetic force
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Apply subtle acceleration towards cursor
            p.vx += (dx / dist) * force * 0.15;
            p.vy += (dy / dist) * force * 0.15;
          }
        }

        // Bouncing logic at margins
        const margin = 5;
        if (p.x < margin) {
          p.x = margin;
          p.baseVx *= -1;
          p.vx *= -1;
        } else if (p.x > width - margin) {
          p.x = width - margin;
          p.baseVx *= -1;
          p.vx *= -1;
        }
        if (p.y < margin) {
          p.y = margin;
          p.baseVy *= -1;
          p.vy *= -1;
        } else if (p.y > height - margin) {
          p.y = height - margin;
          p.baseVy *= -1;
          p.vy *= -1;
        }

        // Twinkling animation (adjust alpha)
        p.alpha += p.pulseDir * p.pulseSpeed;
        if (p.alpha > 0.8) {
          p.alpha = 0.8;
          p.pulseDir = -1;
        } else if (p.alpha < 0.2) {
          p.alpha = 0.2;
          p.pulseDir = 1;
        }

        // Draw individual particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 2. Draw connections (network effect)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(167, 117, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // 3. Draw line from mouse to particle
        if (mouse.current.active) {
          const dx = mouse.current.x - p1.x;
          const dy = mouse.current.y - p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.strokeStyle = `rgba(167, 117, 255, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseenter", handleMouseEnter);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeroParticles;
