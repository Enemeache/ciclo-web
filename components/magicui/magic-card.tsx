"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

interface MagicCardProps {
  className?: string;
  children: React.ReactNode;
  gradientColor?: string;
}

export function MagicCard({
  className,
  children,
  gradientColor = "rgba(34,211,238,0.10)",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10",
        "bg-white/[0.03] transition-all duration-300",
        "hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5",
        className
      )}
    >
      {/* Mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradientColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
