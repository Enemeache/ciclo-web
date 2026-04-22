"use client";

import { cn } from "@/lib/utils";

interface AuroraBorderProps {
  children: React.ReactNode;
  className?: string;       // outer wrapper classes
  innerClassName?: string;  // inner content wrapper classes
  speed?: "slow" | "normal" | "fast";
  colors?: [string, string]; // [color1, color2]
}

export function AuroraBorder({
  children,
  className,
  innerClassName,
  speed = "normal",
  colors = ["rgba(34,211,238,0.85)", "rgba(74,222,128,0.6)"],
}: AuroraBorderProps) {
  const spinClass = {
    slow: "aurora-spin-slow",
    normal: "aurora-spin",
    fast: "aurora-spin-fast",
  }[speed];

  return (
    <div
      className={cn("relative p-px overflow-hidden rounded-2xl", spinClass, className)}
      style={{
        background: `conic-gradient(
          from var(--aurora-a),
          transparent 35%,
          ${colors[0]} 47%,
          ${colors[1]} 53%,
          ${colors[0]} 58%,
          transparent 68%
        )`,
      }}
    >
      {/* inner solid bg so the gradient only shows on the 1px border */}
      <div
        className={cn(
          "relative h-full rounded-[calc(1rem-1px)] bg-[oklch(0.09_0_0)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
