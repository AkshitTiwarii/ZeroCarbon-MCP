"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export function TracingBeam({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress using a spring physics animation
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    
    const updateHeight = () => {
      // Offset height of the container determines the track length
      setSvgHeight(ref.current?.clientHeight ?? 0);
    };

    updateHeight();
    
    // Listen for resize changes
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(ref.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Map progress to height values for the glowing beam
  const y1 = useTransform(smoothY, [0, 1], [50, svgHeight - 50]);
  const y2 = useTransform(smoothY, [0, 1], [50, svgHeight]);

  // Adjust indicator dot glow opacity dynamically based on scroll velocity
  const glowOpacity = useTransform(scrollVelocity, [-1, 0, 1], [0.8, 0.4, 0.8]);

  return (
    <div ref={ref} className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Tracing Beam SVG Track (placed to the left of the content) */}
      <div className="absolute -left-4 md:-left-12 top-0 w-4 h-full select-none pointer-events-none hidden md:block">
        <svg
          viewBox={`0 0 16 ${svgHeight}`}
          width="16"
          height={svgHeight}
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Background track line */}
          <line
            x1="8"
            y1="20"
            x2="8"
            y2={svgHeight}
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-800"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Active glowing trace path */}
          <motion.line
            x1="8"
            y1="20"
            x2="8"
            y2={y2}
            stroke="url(#beam-glow-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Traveling animated indicator dot */}
          <motion.circle
            cx="8"
            cy={y1}
            r="4.5"
            fill="#4ade80"
            stroke="#16a34a"
            strokeWidth="1.5"
          />

          {/* Soft outer glow matching the travel progress */}
          <motion.circle
            cx="8"
            cy={y1}
            r="9"
            fill="#4ade80"
            style={{ opacity: glowOpacity }}
            className="blur-[2px]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="beam-glow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803d" stopOpacity="0" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Page Content */}
      <div className="w-full md:pl-4">
        {children}
      </div>
    </div>
  );
}
