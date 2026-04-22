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

  const ROBOT_W = 72;
  const cycles = 4;
  const phase = scrollPct * Math.PI * 2 * cycles - Math.PI / 2;
  const xNorm = (Math.sin(phase) + 1) / 2;
  const xPos = xNorm * (windowWidth - ROBOT_W - 20);
  const facingRight = Math.cos(phase) > 0;
  const wheelAngle = scrollPct * cycles * 900;

  return (
    <motion.div
      className="fixed bottom-4 z-40 pointer-events-none select-none hidden sm:block"
      style={{ left: 0 }}
      animate={{ x: xPos }}
      transition={{ type: "spring", stiffness: 45, damping: 14 }}
    >
      <motion.div
        animate={{ scaleX: facingRight ? 1 : -1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <RobotSVG wheelAngle={wheelAngle} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function RobotSVG({ wheelAngle }: { wheelAngle: number }) {
  // tread marks at 8 positions around wheel
  const treadAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg width="72" height="92" viewBox="0 0 68 92" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Metallic body: top-left bright → bottom-right dark */}
        <linearGradient id="r-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#848484" />
          <stop offset="42%"  stopColor="#4e4e4e" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </linearGradient>

        {/* Head: slightly lighter metal */}
        <linearGradient id="r-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#929292" />
          <stop offset="45%"  stopColor="#585858" />
          <stop offset="100%" stopColor="#222222" />
        </linearGradient>

        {/* Dark recessed parts */}
        <linearGradient id="r-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2c2c2c" />
          <stop offset="100%" stopColor="#101010" />
        </linearGradient>

        {/* Wheel: radial → 3D sphere illusion */}
        <radialGradient id="r-wheel" cx="33%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#aaaaaa" />
          <stop offset="30%"  stopColor="#606060" />
          <stop offset="70%"  stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#080808" />
        </radialGradient>

        {/* Eye screen: slight glow */}
        <radialGradient id="r-eye" cx="40%" cy="36%" r="70%">
          <stop offset="0%"   stopColor="#d8d8d8" />
          <stop offset="55%"  stopColor="#686868" />
          <stop offset="100%" stopColor="#181818" />
        </radialGradient>

        {/* Sheen: glossy top highlight */}
        <linearGradient id="r-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.07" />
        </linearGradient>

        {/* Drop shadow for all main pieces */}
        <filter id="r-drop" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="2" dy="3" stdDeviation="2.2"
            floodColor="#000000" floodOpacity="0.6" />
        </filter>

        {/* Inner bevel — subtle inset shadow on edges */}
        <filter id="r-bevel" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b" />
          <feOffset dx="1" dy="1" in="b" result="ob" />
          <feComposite operator="arithmetic" k2="-1" k3="1" in="SourceGraphic" in2="ob" />
        </filter>
      </defs>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="34" cy="90" rx="24" ry="3.5" fill="#000000" opacity="0.28" />

      {/* ── ANTENNA ── */}
      <rect x="32" y="3" width="4" height="11" rx="2" fill="url(#r-dark)" />
      {/* tube highlight */}
      <rect x="32.5" y="3" width="1.2" height="11" rx="0.6" fill="#888" opacity="0.35" />
      {/* ball tip */}
      <circle cx="34" cy="3.5" r="4.5" fill="url(#r-wheel)" filter="url(#r-drop)" />
      <circle cx="32.6" cy="2.2" r="1.6" fill="#cccccc" opacity="0.45" />
      {/* pulse ring */}
      <circle cx="34" cy="3.5" r="4.5" fill="none" stroke="#888" strokeWidth="1.5" opacity="0">
        <animate attributeName="r"       values="4.5;9;4.5"     dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35"   dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* ── HEAD ── */}
      {/* main box */}
      <rect x="13" y="13" width="38" height="23" rx="5" fill="url(#r-head)" filter="url(#r-drop)" />
      {/* gloss sheen */}
      <rect x="13" y="13" width="38" height="23" rx="5" fill="url(#r-sheen)" />
      {/* top & left edge highlights */}
      <line x1="16" y1="13.6" x2="48" y2="13.6" stroke="#c0c0c0" strokeWidth="0.9" opacity="0.5" />
      <line x1="13.6" y1="16"  x2="13.6" y2="34" stroke="#c0c0c0" strokeWidth="0.9" opacity="0.4" />
      {/* bottom & right edge shadows */}
      <line x1="16" y1="35.4" x2="48" y2="35.4" stroke="#000" strokeWidth="0.9" opacity="0.5" />
      <line x1="50.4" y1="16" x2="50.4" y2="34" stroke="#000" strokeWidth="0.9" opacity="0.35" />

      {/* LEFT EYE */}
      <circle cx="23" cy="24" r="6.5" fill="#080808" />
      <circle cx="23" cy="24" r="5.5" fill="url(#r-eye)" />
      {/* specular */}
      <circle cx="21.2" cy="22.2" r="1.8" fill="#ffffff" opacity="0.6" />
      <circle cx="20.4" cy="21.5" r="0.7" fill="#ffffff" opacity="0.35" />

      {/* RIGHT EYE */}
      <circle cx="41" cy="24" r="6.5" fill="#080808" />
      <circle cx="41" cy="24" r="5.5" fill="url(#r-eye)" />
      <circle cx="39.2" cy="22.2" r="1.8" fill="#ffffff" opacity="0.6" />
      <circle cx="38.4" cy="21.5" r="0.7" fill="#ffffff" opacity="0.35" />

      {/* SMILE */}
      <path d="M 19 31 Q 32 37 45 31" stroke="#707070" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* ── NECK ── */}
      <rect x="26" y="36" width="16" height="7" rx="3" fill="url(#r-dark)" />
      <rect x="26" y="36" width="16" height="3" rx="1.5" fill="#606060" opacity="0.35" />

      {/* ── BODY ── */}
      <rect x="8" y="43" width="52" height="28" rx="6" fill="url(#r-body)" filter="url(#r-drop)" />
      <rect x="8" y="43" width="52" height="28" rx="6" fill="url(#r-sheen)" />
      {/* top & left highlights */}
      <line x1="12" y1="43.7" x2="56" y2="43.7" stroke="#c0c0c0" strokeWidth="0.9" opacity="0.42" />
      <line x1="8.7" y1="47"  x2="8.7" y2="67"  stroke="#c0c0c0" strokeWidth="0.9" opacity="0.33" />
      {/* bottom & right shadows */}
      <line x1="12" y1="70.3" x2="56" y2="70.3" stroke="#000" strokeWidth="0.9" opacity="0.55" />
      <line x1="59.3" y1="47" x2="59.3" y2="67" stroke="#000" strokeWidth="0.9" opacity="0.4" />

      {/* CHEST PANEL */}
      <rect x="17" y="49" width="34" height="16" rx="3.5" fill="url(#r-dark)" />
      <rect x="17" y="49" width="34" height="16" rx="3.5" fill="none" stroke="#505050" strokeWidth="0.9" />
      {/* panel top sheen */}
      <rect x="17" y="49" width="34" height="5"  rx="3.5" fill="#ffffff" opacity="0.04" />

      {/* HORIZONTAL PANEL LINES on body sides */}
      <line x1="9"  y1="55" x2="16" y2="55" stroke="#444" strokeWidth="1"   opacity="0.7" />
      <line x1="52" y1="55" x2="59" y2="55" stroke="#444" strokeWidth="1"   opacity="0.7" />
      <line x1="9"  y1="61" x2="16" y2="61" stroke="#333" strokeWidth="0.8" opacity="0.55" />
      <line x1="52" y1="61" x2="59" y2="61" stroke="#333" strokeWidth="0.8" opacity="0.55" />

      {/* RIVET BOLTS */}
      <circle cx="14" cy="48" r="1.6" fill="#2a2a2a" stroke="#666" strokeWidth="0.6" />
      <circle cx="54" cy="48" r="1.6" fill="#2a2a2a" stroke="#666" strokeWidth="0.6" />
      <circle cx="14" cy="65" r="1.6" fill="#2a2a2a" stroke="#666" strokeWidth="0.6" />
      <circle cx="54" cy="65" r="1.6" fill="#2a2a2a" stroke="#666" strokeWidth="0.6" />

      {/* ANIMATED LEDs (grey tones) */}
      <circle cx="26" cy="57" r="2.8" fill="#2e2e2e">
        <animate attributeName="fill" values="#2e2e2e;#949494;#2e2e2e" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="34" cy="57" r="2.8" fill="#262626">
        <animate attributeName="fill" values="#262626;#808080;#262626" dur="2.2s" begin="0.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="42" cy="57" r="2.8" fill="#202020">
        <animate attributeName="fill" values="#202020;#6e6e6e;#202020" dur="2.2s" begin="1.4s" repeatCount="indefinite" />
      </circle>

      {/* ── ARMS ── */}
      {/* Left arm */}
      <rect x="1" y="46" width="7" height="13" rx="3.5" fill="url(#r-body)" filter="url(#r-drop)" />
      <rect x="1" y="46" width="7" height="4"  rx="2"   fill="#ffffff" opacity="0.05" />
      <line x1="1.6" y1="49" x2="1.6" y2="57" stroke="#b0b0b0" strokeWidth="0.7" opacity="0.3" />
      {/* Right arm */}
      <rect x="60" y="46" width="7" height="13" rx="3.5" fill="url(#r-body)" filter="url(#r-drop)" />
      <rect x="60" y="46" width="7" height="4"  rx="2"   fill="#ffffff" opacity="0.05" />

      {/* ── UNDERCARRIAGE ── */}
      <rect x="13" y="71" width="42" height="6" rx="2.5" fill="#252525" />
      <rect x="13" y="71" width="42" height="2.5" rx="1.5" fill="#555" opacity="0.35" />

      {/* ── LEFT WHEEL ── */}
      {/* tyre outer ring */}
      <circle cx="19" cy="81" r="11" fill="#111111" />
      {/* main disc */}
      <circle cx="19" cy="81" r="10"  fill="url(#r-wheel)" />
      {/* tread marks */}
      {treadAngles.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={`lt-${deg}`}
            x1={19 + Math.cos(rad) * 9.5}
            y1={81 + Math.sin(rad) * 9.5}
            x2={19 + Math.cos(rad) * 10.8}
            y2={81 + Math.sin(rad) * 10.8}
            stroke="#2a2a2a"
            strokeWidth="2"
          />
        );
      })}
      {/* rotating spokes */}
      <g transform={`rotate(${wheelAngle}, 19, 81)`}>
        <line x1="19" y1="72" x2="19" y2="90" stroke="#3e3e3e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="81" x2="28" y2="81" stroke="#3e3e3e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12.6" y1="74.6" x2="25.4" y2="87.4" stroke="#343434" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="25.4" y1="74.6" x2="12.6" y2="87.4" stroke="#343434" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {/* hub cap */}
      <circle cx="19" cy="81" r="4.5" fill="#252525" />
      <circle cx="19" cy="81" r="3"   fill="#4a4a4a" />
      <circle cx="17.8" cy="79.8" r="1.1" fill="#aaaaaa" opacity="0.65" />

      {/* ── RIGHT WHEEL ── */}
      <circle cx="49" cy="81" r="11" fill="#111111" />
      <circle cx="49" cy="81" r="10" fill="url(#r-wheel)" />
      {treadAngles.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={`rt-${deg}`}
            x1={49 + Math.cos(rad) * 9.5}
            y1={81 + Math.sin(rad) * 9.5}
            x2={49 + Math.cos(rad) * 10.8}
            y2={81 + Math.sin(rad) * 10.8}
            stroke="#2a2a2a"
            strokeWidth="2"
          />
        );
      })}
      <g transform={`rotate(${wheelAngle}, 49, 81)`}>
        <line x1="49" y1="72" x2="49" y2="90" stroke="#3e3e3e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="81" x2="58" y2="81" stroke="#3e3e3e" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42.6" y1="74.6" x2="55.4" y2="87.4" stroke="#343434" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="55.4" y1="74.6" x2="42.6" y2="87.4" stroke="#343434" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <circle cx="49" cy="81" r="4.5" fill="#252525" />
      <circle cx="49" cy="81" r="3"   fill="#4a4a4a" />
      <circle cx="47.8" cy="79.8" r="1.1" fill="#aaaaaa" opacity="0.65" />
    </svg>
  );
}
