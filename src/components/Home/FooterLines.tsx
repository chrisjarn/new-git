"use client";

import { m } from "motion/react";

const easeSwift: [number, number, number, number] = [0.19, 1, 0.22, 1];

// Bottom → Top: danger → caution → control → safe
const lines = [
  { custom: 0, color: "var(--color-accent-green)", className: "",                          opacity: 1    }, // Green — safe, resolved
  { custom: 1, color: "var(--color-accent-cyan)", className: "mx-6 md:mx-12",            opacity: 0.5  }, // Cyan — coordinated, in control
  { custom: 2, color: "var(--color-brand-primary)", className: "mx-12 md:mx-24",           opacity: 0.25 }, // Orange — caution, awareness
  { custom: 3, color: "var(--color-accent-red)", className: "mx-18 md:mx-36",           opacity: 0.12 }, // Red — danger, risk
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const lineVariants = {
  hidden: (i: number) => ({ scaleX: 0.25, y: -12 * i }),
  visible: {
    scaleX: 1,
    y: 0,
    transition: { duration: 1, ease: easeSwift },
  },
};

export default function FooterLines({ showGlow = true }: { showGlow?: boolean }) {
  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1, once: true }}
      className="w-full"
    >
      {lines.map((line) => (
        <m.div
          key={line.custom}
          variants={lineVariants}
          custom={line.custom}
          style={{ opacity: line.opacity }}
          className={`relative h-3 transition-opacity duration-1000 ease-in hover:!opacity-100 hover:transition-opacity hover:duration-[120ms] hover:ease-in ${line.className}`}
        >
          <span
            className="absolute inset-x-0 bottom-0 h-1 rounded-[4px]"
            style={{ backgroundColor: line.color }}
          />
          {showGlow && line.custom === 3 && (
            <span
              className="absolute -inset-x-24 top-full h-48 md:-inset-x-48 md:h-64"
              style={{
                background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${line.color} 0%, transparent 70%)`,
                opacity: 0.3,
              }}
            />
          )}
        </m.div>
      ))}
    </m.div>
  );
}
