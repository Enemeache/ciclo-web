"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  delay = 0,
  colorFrom = "#22d3ee",
  colorTo = "#4ade80",
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l from-transparent via-[var(--color-from)] to-[var(--color-to)]",
          className
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round 8px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
          } as React.CSSProperties
        }
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration,
          delay,
          ease: "linear",
        }}
      />
    </div>
  );
}
