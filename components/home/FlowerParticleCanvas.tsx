"use client";

import { useEffect, useRef } from "react";

interface FlowerParticleCanvasProps {
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  z: number; // Depth layer 0.5 to 1.5
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  maxLife: number;
  life: number;
  color: string;
  type: "saffron" | "white" | "green" | "fragrance";
  shape: "petal" | "blossom" | "leaf" | "mist";
}

interface Aircraft {
  x: number;
  y: number;
  angle: number;
  speed: number;
  trailType: "saffron" | "white" | "green";
  scale: number;
  pathOffset: number;
}

export function FlowerParticleCanvas({ reducedMotion = false }: FlowerParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) * 0.05;
      mouseRef.current.targetY = (e.clientY - cy) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Color Palettes
    const SAFFRON_COLORS = ["#FF9933", "#F97316", "#F59E0B", "#EAB308", "#FFB74D"];
    const WHITE_COLORS = ["#FFFFFF", "#FAF7F2", "#F5F5F0", "#FDE68A", "#FFFBEB"];
    const GREEN_COLORS = ["#138808", "#047857", "#10B981", "#059669", "#34D399"];

    // 3 Symbolic Aircraft Trajectories across the Sky
    const isMobile = width < 768;
    const aircraftList: Aircraft[] = [
      {
        x: -120,
        y: height * (isMobile ? 0.16 : 0.20),
        angle: 0.12,
        speed: isMobile ? 1.9 : 2.5,
        trailType: "saffron",
        scale: isMobile ? 0.75 : 1.05,
        pathOffset: 0,
      },
      {
        x: -280,
        y: height * (isMobile ? 0.44 : 0.45),
        angle: 0.04,
        speed: isMobile ? 2.1 : 2.8,
        trailType: "white",
        scale: isMobile ? 0.8 : 1.1,
        pathOffset: 100,
      },
      {
        x: -440,
        y: height * (isMobile ? 0.72 : 0.68),
        angle: -0.06,
        speed: isMobile ? 1.8 : 2.4,
        trailType: "green",
        scale: isMobile ? 0.7 : 1.0,
        pathOffset: 200,
      },
    ];

    let particles: Particle[] = [];

    // Draw aircraft silhouette
    const drawAircraft = (c: CanvasRenderingContext2D, a: Aircraft) => {
      c.save();
      c.translate(a.x, a.y);
      c.rotate(a.angle);
      c.scale(a.scale, a.scale);

      // Soft drop shadow for elevation
      c.shadowColor = "rgba(0, 0, 0, 0.15)";
      c.shadowBlur = 8;
      c.shadowOffsetY = 4;

      // Aircraft Body (Sleek Symbolic Jet / Aircraft Silhouette)
      c.fillStyle = "#FFFFFF";
      c.beginPath();
      // Nose
      c.moveTo(24, 0);
      // Right wing
      c.lineTo(4, 3);
      c.lineTo(-12, 18);
      c.lineTo(-16, 17);
      c.lineTo(-8, 3);
      // Fuselage & Tail
      c.lineTo(-24, 2);
      c.lineTo(-32, 10);
      c.lineTo(-35, 10);
      c.lineTo(-30, 0);
      c.lineTo(-35, -10);
      c.lineTo(-32, -10);
      c.lineTo(-24, -2);
      // Left Wing
      c.lineTo(-8, -3);
      c.lineTo(-16, -17);
      c.lineTo(-12, -18);
      c.lineTo(4, -3);
      c.closePath();
      c.fill();

      // Subtle metallic highlight along fuselage
      c.fillStyle = "rgba(255, 255, 255, 0.9)";
      c.beginPath();
      c.ellipse(4, 0, 16, 2, 0, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    // Draw Organic Flower / Petal / Leaf particle
    const drawParticle = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.scale(p.z, p.z);
      c.globalAlpha = p.opacity;

      if (p.shape === "mist") {
        // Fragrance mist micro particle
        const grad = c.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = grad;
        c.beginPath();
        c.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        c.fill();
      } else if (p.shape === "blossom") {
        // 5-petal Marigold / Jasmine flower blossom
        c.fillStyle = p.color;
        for (let i = 0; i < 5; i++) {
          c.rotate((Math.PI * 2) / 5);
          c.beginPath();
          c.ellipse(0, p.size, p.size * 0.45, p.size * 0.8, 0, 0, Math.PI * 2);
          c.fill();
        }
        // Golden flower center
        c.fillStyle = "#FEF08A";
        c.beginPath();
        c.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
        c.fill();
      } else if (p.shape === "leaf") {
        // Organic botanical leaf
        c.fillStyle = p.color;
        c.beginPath();
        c.moveTo(0, -p.size);
        c.quadraticCurveTo(p.size * 0.8, 0, 0, p.size);
        c.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size);
        c.fill();
        // Leaf vein
        c.strokeStyle = "rgba(255, 255, 255, 0.4)";
        c.lineWidth = 0.8;
        c.beginPath();
        c.moveTo(0, -p.size * 0.8);
        c.lineTo(0, p.size * 0.8);
        c.stroke();
      } else {
        // Single organic flower petal
        c.fillStyle = p.color;
        c.beginPath();
        c.ellipse(0, 0, p.size * 0.6, p.size, Math.PI / 4, 0, Math.PI * 2);
        c.fill();
      }

      c.restore();
    };

    // Emit flower particles from aircraft tail
    const emitParticles = (a: Aircraft) => {
      const rate = isMobile ? 2 : 4;
      for (let i = 0; i < rate; i++) {
        // Emit point at rear of aircraft
        const tailX = a.x - Math.cos(a.angle) * 32;
        const tailY = a.y - Math.sin(a.angle) * 32;

        let colors = SAFFRON_COLORS;
        let shape: Particle["shape"] = Math.random() > 0.4 ? "petal" : "blossom";

        if (a.trailType === "white") {
          colors = WHITE_COLORS;
          shape = Math.random() > 0.5 ? "petal" : "blossom";
        } else if (a.trailType === "green") {
          colors = GREEN_COLORS;
          shape = Math.random() > 0.4 ? "leaf" : "petal";
        }

        // Random fragrance mist emission
        if (Math.random() < 0.25) {
          particles.push({
            x: tailX + (Math.random() - 0.5) * 12,
            y: tailY + (Math.random() - 0.5) * 12,
            z: 0.8 + Math.random() * 0.4,
            vx: -a.speed * 0.3 + (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.6,
            size: 3 + Math.random() * 6,
            rotation: 0,
            vRot: 0,
            opacity: 0.5,
            maxLife: 90 + Math.random() * 60,
            life: 90 + Math.random() * 60,
            color: a.trailType === "saffron" ? "rgba(253, 230, 138, 0.4)" : a.trailType === "white" ? "rgba(255, 255, 255, 0.45)" : "rgba(167, 243, 208, 0.4)",
            type: a.trailType,
            shape: "mist",
          });
        }

        particles.push({
          x: tailX + (Math.random() - 0.5) * 14,
          y: tailY + (Math.random() - 0.5) * 14,
          z: 0.6 + Math.random() * 0.7,
          vx: -a.speed * 0.2 + (Math.random() - 0.5) * 1.2,
          vy: 0.2 + Math.random() * 0.8 + (Math.random() - 0.5) * 0.6,
          size: isMobile ? 3.5 + Math.random() * 4 : 4.5 + Math.random() * 6,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          opacity: 0.9,
          maxLife: 180 + Math.random() * 120,
          life: 180 + Math.random() * 120,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: a.trailType,
          shape,
        });
      }
    };

    // Main animation loop
    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const px = mouseRef.current.x;
      const py = mouseRef.current.y;

      if (!reducedMotion) {
        // Update aircraft positions
        aircraftList.forEach((a, idx) => {
          a.x += a.speed;
          a.y += Math.sin(tick * 0.02 + idx * 2) * 0.4;

          // Emit flower trails
          if (a.x > -50 && a.x < width + 50) {
            emitParticles(a);
          }

          // Loop aircraft across screen seamlessly
          if (a.x > width + 150) {
            a.x = -200 - Math.random() * 150;
            if (idx === 0) a.y = height * (0.15 + Math.random() * 0.12);
            if (idx === 1) a.y = height * (0.35 + Math.random() * 0.12);
            if (idx === 2) a.y = height * (0.55 + Math.random() * 0.12);
          }

          // Render aircraft with parallax
          ctx.save();
          ctx.translate(px * 0.3, py * 0.3);
          drawAircraft(ctx, a);
          ctx.restore();
        });
      }

      // Update & Render Flower Particles
      const nextParticles: Particle[] = [];
      const windX = Math.sin(tick * 0.01) * 0.3 - 0.2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life--;

        if (p.life > 0) {
          if (!reducedMotion) {
            p.x += p.vx + windX;
            p.y += p.vy;
            p.rotation += p.vRot;
          }

          p.opacity = Math.min(1, p.life / (p.maxLife * 0.25)) * (p.life / p.maxLife);

          ctx.save();
          ctx.translate(px * (0.2 * p.z), py * (0.2 * p.z));
          drawParticle(ctx, p);
          ctx.restore();

          nextParticles.push(p);
        }
      }

      particles = nextParticles;

      // Limit particle count for high 60 FPS performance
      const maxCount = isMobile ? 350 : 750;
      if (particles.length > maxCount) {
        particles = particles.slice(particles.length - maxCount);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full z-20"
      aria-hidden="true"
    />
  );
}
