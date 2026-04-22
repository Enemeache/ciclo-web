"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollRobot() {
  const [scrollPct, setScrollPct] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const onResize = () => setWindowWidth(window.innerWidth);
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0) setScrollPct(window.scrollY / max);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (windowWidth === 0) return null;

  const ROBOT_W = 56;
  const cycles = 4;
  // sin wave starting at 0 (left edge), using phase offset -PI/2
  const phase = scrollPct * Math.PI * 2 * cycles - Math.PI / 2;
  const xNorm = (Math.sin(phase) + 1) / 2; // 0..1
  const xPos = xNorm * (windowWidth - ROBOT_W - 20);
  const facingRight = Math.cos(phase) > 0;
  // wheels rotate progressively with scroll
  const wheelAngle = scrollPct * cycles * 900;

  return (
    <motion.div
      className="fixed bottom-4 z-40 pointer-events-none select-none hidden sm:block"
      style={{ left: 0 }}
      animate={{ x: xPos }}
      transition={{ type: "spring", stiffness: 45, damping: 14 }}
    >
      {/* flip direction */}
      <motion.div
        animate={{ scaleX: facingRight ? 1 : -1 }}
        transition={{ duration: 0.2 }}
      >
        {/* gentle bob up and down */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <RobotSVG wheelAngle={wheelAngle} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function RobotSVG({ wheelAngle }: { wheelAngle: number }) {
  return (
    <svg
      width="56"
      height="74"
      viewBox="0 0 56 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna */}
      <line x1="28" y1="1" x2="28" y2="10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="2" r="3" fill="#22d3ee" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.4s" repeatCount="indefinite" />
      </circle>

      {/* Head */}
      <rect x="11" y="10" width="34" height="22" rx="5" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Left eye glow */}
      <circle cx="22" cy="21" r="5" fill="#22d3ee" opacity="0.08" />
      <circle cx="22" cy="21" r="3.2" fill="#22d3ee" />
      <circle cx="23.2" cy="20" r="1.3" fill="#050f1f" />

      {/* Right eye glow */}
      <circle cx="34" cy="21" r="5" fill="#22d3ee" opacity="0.08" />
      <circle cx="34" cy="21" r="3.2" fill="#22d3ee" />
      <circle cx="35.2" cy="20" r="1.3" fill="#050f1f" />

      {/* Smile */}
      <path d="M 19 27 Q 28 32.5 37 27" stroke="#22d3ee" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65" />

      {/* Neck */}
      <rect x="23" y="32" width="10" height="5" rx="2" fill="#050f1f" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />

      {/* Body */}
      <rect x="7" y="37" width="42" height="24" rx="6" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Chest panel */}
      <rect x="15" y="42" width="26" height="14" rx="3" fill="#0c2a4a" />
      {/* LEDs */}
      <circle cx="22" cy="49" r="2.5" fill="#22d3ee" opacity="0.95">
        <animate attributeName="opacity" values="0.95;0.3;0.95" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="28" cy="49" r="2.5" fill="#4ade80" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="49" r="2.5" fill="#22d3ee" opacity="0.45">
        <animate attributeName="opacity" values="0.45;0.9;0.45" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>

      {/* Left arm */}
      <rect x="0" y="40" width="7" height="8" rx="3" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.2" />
      {/* Right arm */}
      <rect x="49" y="40" width="7" height="8" rx="3" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.2" />

      {/* Undercarriage */}
      <rect x="12" y="61" width="32" height="4" rx="2" fill="#050f1f" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />

      {/* Left wheel */}
      <circle cx="19" cy="67" r="7" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.5" />
      <g transform={`rotate(${wheelAngle}, 19, 67)`}>
        <line x1="19" y1="61" x2="19" y2="73" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="13" y1="67" x2="25" y2="67" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="14.9" y1="62.9" x2="23.1" y2="71.1" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <line x1="23.1" y1="62.9" x2="14.9" y2="71.1" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </g>
      <circle cx="19" cy="67" r="2" fill="#22d3ee" opacity="0.5" />

      {/* Right wheel */}
      <circle cx="37" cy="67" r="7" fill="#050f1f" stroke="#22d3ee" strokeWidth="1.5" />
      <g transform={`rotate(${wheelAngle}, 37, 67)`}>
        <line x1="37" y1="61" x2="37" y2="73" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="31" y1="67" x2="43" y2="67" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="32.9" y1="62.9" x2="41.1" y2="71.1" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <line x1="41.1" y1="62.9" x2="32.9" y2="71.1" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </g>
      <circle cx="37" cy="67" r="2" fill="#22d3ee" opacity="0.5" />

      {/* Ground shadow glow */}
      <ellipse cx="28" cy="74" rx="18" ry="2.5" fill="#22d3ee" opacity="0.07" />
    </svg>
  );
}
