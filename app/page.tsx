"use client";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { AuroraBorder } from "@/components/magicui/aurora-border";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Particles } from "@/components/magicui/particles";
import { ScrollRobot } from "@/components/magicui/scroll-robot";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, Brain, Calendar, CheckCircle2,
  ChevronRight, Cpu, Globe, Layers, LineChart, Mail,
  MapPin, Menu, Rocket, Settings, Shield,
  TrendingUp, Users, X, Zap,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Método",       href: "#metodo" },
  { label: "Servicios",    href: "#servicios" },
  { label: "Casos",        href: "#casos" },
  { label: "Por qué CICLO", href: "#diferenciadores" },
  { label: "Contacto",     href: "#contacto" },
];

const CICLO_STEPS = [
  { letter: "C", title: "Consult",    description: "Diagnóstico profundo de procesos, datos y capacidades del equipo.", icon: Brain,    color: "text-cyan-400",    bg: "bg-cyan-400/10",    corner: "#22d3ee" },
  { letter: "I", title: "Implement",  description: "Desarrollamos e integramos las soluciones de IA en los flujos existentes.", icon: Cpu,      color: "text-green-400",   bg: "bg-green-400/10",   corner: "#4ade80" },
  { letter: "C", title: "Capacitate", description: "Entrenamos a los equipos en la práctica, no en la teoría.", icon: Users,    color: "text-emerald-400", bg: "bg-emerald-400/10", corner: "#34d399" },
  { letter: "L", title: "Launch",     description: "Acompañamos el lanzamiento con soporte activo para maximizar adopción.", icon: Rocket,   color: "text-teal-400",    bg: "bg-teal-400/10",    corner: "#2dd4bf" },
  { letter: "O", title: "Operate",    description: "Seguimiento continuo y optimización con el equipo ya autónomo.", icon: Settings, color: "text-sky-400",     bg: "bg-sky-400/10",     corner: "#38bdf8" },
];

const STATS = [
  { value: 40, suffix: "+", label: "Proyectos", icon: CheckCircle2 },
  { value: 8,  suffix: "",  label: "Industrias", icon: Globe },
  { value: 87, suffix: "%", label: "Adopción real", icon: TrendingUp },
];

const CASES = [
  { industry: "Retail",    title: "Automatización de pricing",      result: "+32% eficiencia", description: "Motor de pricing dinámico que procesa variables de mercado en tiempo real.", icon: BarChart3, gradient: "from-cyan-500/15 to-transparent",    badge: "bg-cyan-500/20 text-cyan-300",       glow: "rgba(34,211,238,0.18)" },
  { industry: "Logística", title: "Optimización de rutas",          result: "-18% costos",     description: "Sistema de ruteo inteligente que redujo costos operativos y tiempos de entrega.", icon: LineChart, gradient: "from-green-500/15 to-transparent",   badge: "bg-green-500/20 text-green-300",     glow: "rgba(74,222,128,0.18)" },
  { industry: "Finanzas",  title: "Procesos contables automáticos", result: "4x velocidad",    description: "Cierre contable mensual automatizado con agentes de IA.", icon: Zap,       gradient: "from-emerald-500/15 to-transparent", badge: "bg-emerald-500/20 text-emerald-300", glow: "rgba(52,211,153,0.18)" },
];

const DIFFS = [
  { title: "Consultoras tradicionales", items: ["Solo estrategia", "Entregables estáticos", "Sin implementación real", "Equipo no autónomo"],       isUs: false },
  { title: "CICLO",                     items: ["Estrategia + Ejecución", "Resultados medibles", "Implementación end-to-end", "Equipo 100% autónomo"], isUs: true  },
  { title: "Agencias de desarrollo",    items: ["Solo construyen", "Sin adopción", "Sin transferencia de conocimiento", "Dependencia continua"],      isUs: false },
];

const PROBLEMS = [
  { icon: Shield, title: "Resistencia al cambio",       desc: "Los equipos no adoptan herramientas que no entienden ni en cuyo diseño participaron.", color: "text-red-400",    glow: "rgba(248,113,113,0.15)" },
  { icon: Layers, title: "Implementación sin contexto", desc: "Las soluciones genéricas no se adaptan a los procesos reales de tu organización.",    color: "text-orange-400", glow: "rgba(251,146,60,0.15)"  },
  { icon: Bot,    title: "Dependencia del proveedor",   desc: "Quedar atrapado en contratos de soporte en lugar de construir capacidad interna.",     color: "text-yellow-400", glow: "rgba(250,204,21,0.15)"  },
];

const PROCESO = [
  { step: "01", title: "Diagnóstico gratuito",   duration: "30 min",      description: "Llamada con el founder. Mapeamos procesos, equipo y oportunidades reales.", icon: Calendar,  color: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-500/30"    },
  { step: "02", title: "Roadmap + precio fijo",  duration: "2–3 semanas", description: "Plan detallado con alcance claro, precio fijo y KPIs medibles antes de empezar.", icon: LineChart, color: "text-green-400",   bg: "bg-green-400/10",   border: "border-green-500/30"   },
  { step: "03", title: "Ejecución end-to-end",   duration: "4–12 semanas",description: "Implementamos, capacitamos y operamos hasta que la IA sea capacidad interna.", icon: Rocket,    color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/30" },
];

const INDUSTRIES = [
  "Retail", "Fintech", "Logística", "Healthcare", "Real Estate",
  "Manufactura", "E-commerce", "Educación", "SaaS", "Agro",
];

const TESTIMONIALS = [
  { name: "Martín Rodríguez",  role: "CEO · Distribuidora Sur",          text: "En 3 meses, nuestro equipo de operaciones pasó de resistir la IA a liderar su adopción interna.", avatar: "MR" },
  { name: "Lucía Fernández",   role: "Directora Comercial · Fintech BA", text: "No solo implementaron — nos enseñaron a hacerlo nosotros mismos. Hoy somos autónomos.", avatar: "LF" },
  { name: "Pablo Navarro",     role: "COO · Logística Express",          text: "Redujimos el tiempo de cierre contable de 5 días a 6 horas. El equipo no volvió atrás.", avatar: "PN" },
  { name: "Valeria Lagos",     role: "Gerente · Retail Group",           text: "Trabajan en el día a día hasta que la IA es parte de tu cultura. No te dejan solo.", avatar: "VL" },
  { name: "Federico Suárez",   role: "CTO · SaaS Latam",                 text: "El diagnóstico inicial fue revelador. Identificaron oportunidades que no veíamos.", avatar: "FS" },
  { name: "Carolina Méndez",   role: "CFO · Grupo Industrial",           text: "Precio fijo, resultados claros y un equipo que realmente se involucra.", avatar: "CM" },
];

const TYPING_PHRASES = [
  "analizar mis procesos de negocio",
  "automatizar el cierre contable",
  "entrenar a mi equipo con IA",
  "escalar sin contratar más personal",
];

/* ─── HELPERS ───────────────────────────────────────────────── */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GlowDot() {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400"
      style={{ animation: "pulse-glow 2s ease-in-out infinite", boxShadow: "0 0 8px 2px rgba(52,211,153,0.55)" }}
    />
  );
}

/* HUD-style section label  e.g.  // 01  METODOLOGÍA */
function HudLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-2">
      <span className="font-mono text-[10px] text-white/20 tracking-widest">//</span>
      <span className="font-mono text-[10px] text-cyan-500/50 tracking-[0.18em] uppercase">{n}</span>
      <div className="h-px w-6 bg-gradient-to-r from-cyan-500/30 to-transparent" />
      <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">{label}</span>
      <div className="h-px w-6 bg-gradient-to-l from-cyan-500/30 to-transparent" />
    </div>
  );
}

/* Cyberpunk corner accent marks */
function CornerAccents({ color = "#22d3ee" }: { color?: string }) {
  const style = (pos: string): React.CSSProperties => ({
    position: "absolute",
    width: 14,
    height: 14,
    ...({
      tl: { top: 0,    left: 0,    borderTop:    `1.5px solid ${color}`, borderLeft:  `1.5px solid ${color}` },
      tr: { top: 0,    right: 0,   borderTop:    `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
      bl: { bottom: 0, left: 0,    borderBottom: `1.5px solid ${color}`, borderLeft:  `1.5px solid ${color}` },
      br: { bottom: 0, right: 0,   borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    } as Record<string, React.CSSProperties>)[pos],
    opacity: 0.45,
    transition: "opacity 0.3s",
  });
  return (
    <>
      <span style={style("tl")} className="group-hover:opacity-100" />
      <span style={style("tr")} className="group-hover:opacity-100" />
      <span style={style("bl")} className="group-hover:opacity-100" />
      <span style={style("br")} className="group-hover:opacity-100" />
    </>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [typingText, setTypingText] = useState("");
  // email state removed — CTA now links to /apply
  const typingRef = useRef({ phrase: 0, charIndex: 0, deleting: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const state = typingRef.current;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const phrase = TYPING_PHRASES[state.phrase];
      if (!state.deleting) {
        if (state.charIndex < phrase.length) {
          state.charIndex++;
          setTypingText(phrase.slice(0, state.charIndex));
          timeout = setTimeout(tick, 55);
        } else {
          timeout = setTimeout(() => { state.deleting = true; tick(); }, 1800);
        }
      } else {
        if (state.charIndex > 0) {
          state.charIndex--;
          setTypingText(phrase.slice(0, state.charIndex));
          timeout = setTimeout(tick, 30);
        } else {
          state.deleting = false;
          state.phrase = (state.phrase + 1) % TYPING_PHRASES.length;
          timeout = setTimeout(tick, 400);
        }
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    setTimeout(() => scrollTo(id), menuOpen ? 300 : 0);
  };

  return (
    <main className="scanlines relative w-full max-w-[100vw] overflow-hidden bg-[oklch(0.08_0_0)]" style={{ WebkitTransform: "translateZ(0)" }}>

      <ScrollRobot />

      {/* ── NAV ── */}
      <nav className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-[oklch(0.08_0_0)]/95 backdrop-blur-xl shadow-lg shadow-black/30"
          : "bg-transparent"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <button onClick={() => scrollTo("inicio")}
            className="font-bold tracking-tight text-white hover:opacity-80 transition-opacity text-lg md:text-xl">
            CICLO<span className="text-cyan-400">.</span>
          </button>

          <div className="hidden items-center gap-7 text-sm text-white/50 md:flex">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className="transition-colors hover:text-white font-medium">{link.label}</button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/apply">
              <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.12 0 0)"
                className="hidden text-sm font-medium sm:flex">
                Agendá diagnóstico <ChevronRight className="ml-1 h-4 w-4" />
              </ShimmerButton>
            </Link>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/5 bg-[oklch(0.07_0_0)]/98 backdrop-blur-xl md:hidden">
              <div className="flex flex-col gap-0.5 px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <button key={link.href} onClick={() => handleNav(link.href)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                    {link.label}
                  </button>
                ))}
                <div className="mt-3 border-t border-white/5 pt-3">
                  <Link href="/apply">
                    <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)" borderRadius="12px"
                      className="w-full justify-center py-3 text-sm font-semibold">
                      Agendá tu diagnóstico gratuito <ArrowRight className="ml-2 h-4 w-4" />
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio"
        className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 pt-24 text-center">
        <Particles className="absolute inset-0 z-0" />
        <DotPattern className="absolute inset-0 opacity-[0.15]" width={28} height={28} />

        {/* Ripple rings — responsive so they don't overflow on iPhone */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
          {[0, 1.5, 3].map((delay, i) => (
            <div key={i} className="absolute rounded-full border border-cyan-500/15"
              style={{ width: "min(440px, 90vw)", height: "min(440px, 90vw)", animation: "ripple-out 5s ease-out infinite", animationDelay: `${delay}s` }} />
          ))}
        </div>

        {/* Radial glow — stronger */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(34,211,238,0.13) 0%, rgba(74,222,128,0.04) 55%, transparent 75%)",
          zIndex: 0,
        }} />
        {/* Fade to black bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.08_0_0)]" />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-5 px-1 md:gap-6 md:px-0">
          <BlurFade delay={0.1}>
            <AnimatedGradientText>
              <GlowDot />
              <Separator orientation="vertical" className="mx-2 h-4 bg-white/20" />
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                AI Adoption que realmente funciona
              </span>
              <ChevronRight className="ml-1 h-4 w-4 text-white/50" />
            </AnimatedGradientText>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl">
              Operamos con tu equipo<br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent
                              drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                hasta que sean autónomos
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg md:text-xl">
              No implementamos tecnología y nos vamos. Trabajamos dentro de tu organización
              hasta que el equipo pueda operar de forma independiente.
            </p>
          </BlurFade>

          {/* Terminal */}
          <BlurFade delay={0.35}>
            <div className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]
                            px-4 py-3 text-left font-mono text-sm backdrop-blur-sm sm:max-w-2xl">
              <span className="text-cyan-400">ciclo</span>
              <span className="text-white/25"> ~ </span>
              <span className="text-green-400">$</span>
              {" "}
              <span className="text-white/80 truncate">{typingText}</span>
              <span className="ml-0.5 inline-block h-[1em] w-0.5 bg-cyan-400 align-middle"
                style={{ animation: "blink-cursor 1s step-end infinite" }} />
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/apply">
                <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)" borderRadius="12px"
                  className="w-full px-7 py-4 text-sm font-semibold sm:w-auto sm:text-base">
                  Agendá tu diagnóstico gratuito <ArrowRight className="ml-2 h-4 w-4" />
                </ShimmerButton>
              </Link>
              <button className="flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                onClick={() => scrollTo("casos")}>
                Ver casos de éxito <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-4 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 sm:gap-10">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white sm:text-3xl">
                    <NumberTicker value={s.value} className="text-2xl font-black text-white sm:text-3xl" />{s.suffix}
                  </span>
                  <span className="mt-1 text-center text-xs text-white/40 sm:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>

        <motion.div className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <motion.div className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ── INDUSTRIES MARQUEE ── */}
      <section className="w-full overflow-hidden border-t border-white/[0.06] py-8 md:py-10">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/25">
          // industrias que ya operan con IA
        </p>
        <Marquee pauseOnHover>
          {INDUSTRIES.map((name) => (
            <div key={name}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
              <span className="text-sm font-semibold text-white/35 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── PROBLEMA / SERVICIOS ── */}
      <section id="servicios" className="relative w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-10 text-center md:mb-14">
              <HudLabel n="01" label="servicios" />
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">El problema</Badge>
              <h2 className="text-3xl font-black text-white md:text-5xl">
                La mayoría de los proyectos de IA<br />
                <span className="text-white/35">no sobreviven al primer mes</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm text-white/50 md:text-base">
                Las organizaciones invierten en tecnología, pero los equipos no la adoptan.
                El problema no es la IA, es el proceso de cambio.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {PROBLEMS.map((item, i) => (
              <BlurFade key={item.title} inView delay={i * 0.1}>
                <MagicCard gradientColor={item.glow} className="p-5 h-full md:p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className={cn("h-5 w-5", item.color)} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white md:text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/45">{item.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA CICLO ── */}
      <section id="metodo" className="relative w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/8 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-10 text-center md:mb-14">
              <HudLabel n="02" label="metodología" />
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Nuestra metodología</Badge>
              <h2 className="text-3xl font-black text-white md:text-5xl">
                El método{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent
                                 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  CICLO
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm text-white/50 md:text-base">
                Cinco fases para que la IA quede operando dentro de tu organización como una capacidad interna.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
            {CICLO_STEPS.map((step, i) => (
              <BlurFade key={step.letter + i} inView delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08]
                                bg-white/[0.03] p-4 transition-all hover:border-white/15
                                hover:-translate-y-1 duration-300 h-full md:p-5">
                  <CornerAccents color={step.corner} />
                  <div className={cn("mb-3 flex h-11 w-11 items-center justify-center rounded-xl", step.bg)}>
                    <span className={cn("text-xl font-black", step.color)}>{step.letter}</span>
                  </div>
                  <div className={cn("mb-3 flex h-7 w-7 items-center justify-center rounded-lg", step.bg)}>
                    <step.icon className={cn("h-3.5 w-3.5", step.color)} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold text-white md:text-base">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45">{step.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS ── */}
      <section id="casos" className="w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-10 text-center md:mb-14">
              <HudLabel n="03" label="casos" />
              <Badge className="mb-4 border-green-500/30 bg-green-500/10 text-green-400">Casos reales</Badge>
              <h2 className="text-3xl font-black text-white md:text-5xl">Resultados que hablan</h2>
              <p className="mx-auto mt-5 max-w-xl text-sm text-white/50 md:text-base">
                No son pilotos. Son implementaciones en producción con equipos que hoy operan de forma autónoma.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {CASES.map((c, i) => (
              <BlurFade key={c.title} inView delay={i * 0.1}>
                <MagicCard gradientColor={c.glow}
                  className={cn("bg-gradient-to-br p-5 h-full md:p-6", c.gradient)}>
                  <div className="mb-4 flex items-center justify-between">
                    <Badge className={cn("text-xs font-medium border-0", c.badge)}>{c.industry}</Badge>
                    <c.icon className="h-4 w-4 text-white/25" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{c.title}</h3>
                  <p className="mb-4 text-xs text-white/55 md:text-sm">{c.description}</p>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5">
                    <span className="text-xl font-black text-white md:text-2xl">{c.result}</span>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADORES ── */}
      <section id="diferenciadores" className="relative w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/8 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-10 text-center md:mb-14">
              <HudLabel n="04" label="diferenciadores" />
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">Por qué CICLO</Badge>
              <h2 className="text-3xl font-black text-white md:text-5xl">
                No somos una consultora.<br />
                <span className="text-white/35">Tampoco una agencia.</span>
              </h2>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-3">
            {DIFFS.map((d, i) => (
              <BlurFade key={d.title} inView delay={i * 0.1}>
                {d.isUs ? (
                  <AuroraBorder speed="slow" className="h-full"
                    innerClassName="p-5 md:p-6 h-full flex flex-col">
                    <div className="absolute right-4 top-4">
                      <Badge className="border-0 bg-gradient-to-r from-cyan-500/25 to-green-500/25 text-white text-xs">
                        ✦ Nosotros
                      </Badge>
                    </div>
                    <h3 className="mb-5 text-base font-bold text-white md:text-lg">{d.title}</h3>
                    <ul className="space-y-3 flex-1">
                      {d.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                          <span className="text-sm text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AuroraBorder>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 h-full opacity-50 hover:opacity-70 transition-opacity duration-300 md:p-6">
                    <h3 className="mb-5 text-base font-bold text-white/45 md:text-lg">{d.title}</h3>
                    <ul className="space-y-3">
                      {d.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/15" />
                          <span className="text-sm text-white/25">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ── */}
      <section className="w-full overflow-hidden py-16 px-5 md:py-20 md:px-6">
        <div className="mx-auto max-w-5xl">
          <BlurFade inView>
            <AuroraBorder speed="slow" colors={["rgba(34,211,238,0.7)", "rgba(74,222,128,0.5)"]}
              innerClassName="p-8 text-center md:p-12">
              <DotPattern className="absolute inset-0 opacity-[0.12]" width={20} height={20} />
              <div className="relative z-10">
                <HudLabel n="05" label="métricas" />
                <Badge className="mb-6 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Números reales</Badge>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 sm:gap-8">
                  {STATS.map((stat, i) => (
                    <motion.div key={stat.label}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                      className="flex flex-col items-center">
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
                        <stat.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <span className="text-4xl font-black text-white md:text-5xl">
                        <NumberTicker value={stat.value} className="text-4xl font-black text-white md:text-5xl" />{stat.suffix}
                      </span>
                      <span className="mt-2 text-xs text-white/45 md:text-sm">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AuroraBorder>
          </BlurFade>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <section className="border-t border-white/[0.06] py-16 px-5 overflow-hidden md:py-24">
        <BlurFade inView>
          <div className="mb-10 text-center md:mb-12">
            <HudLabel n="06" label="testimonios" />
            <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">Testimonios</Badge>
            <h2 className="text-3xl font-black text-white md:text-5xl">Equipos que ya operan con IA</h2>
          </div>
        </BlurFade>
        <div className="space-y-3 md:space-y-4">
          <Marquee pauseOnHover>
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover>
            {TESTIMONIALS.slice(3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── CÓMO EMPEZAR ── */}
      <section className="relative w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/6 to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <BlurFade inView>
            <div className="mb-10 text-center md:mb-14">
              <HudLabel n="07" label="proceso" />
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Primeros pasos</Badge>
              <h2 className="text-3xl font-black text-white md:text-5xl">¿Cómo empezar?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/50 md:text-base">
                Tres pasos desde el primer contacto hasta la autonomía total.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {PROCESO.map((p, i) => (
              <BlurFade key={p.step} inView delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center px-4 md:px-6">
                  {i < PROCESO.length - 1 && (
                    <div className="absolute top-8 left-1/2 hidden h-px w-full md:block"
                      style={{ background: "linear-gradient(90deg,rgba(34,211,238,0.4),rgba(74,222,128,0.2))", backgroundSize: "200% 100%", animation: "beam-flow 2.5s linear infinite" }} />
                  )}
                  <div className={cn("relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border", p.bg, p.border)}>
                    <span className={cn("text-xl font-black", p.color)}>{p.step}</span>
                  </div>
                  <span className="mb-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/40">
                    {p.duration}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-white md:text-lg">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45 md:text-sm">{p.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACTO ── */}
      <section id="contacto" className="relative w-full overflow-hidden py-16 px-5 md:py-24 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0_0)] to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <BlurFade inView>
            <AuroraBorder speed="normal" colors={["rgba(34,211,238,0.9)", "rgba(74,222,128,0.65)"]}
              innerClassName="p-8 text-center md:p-14">
              <DotPattern className="absolute inset-0 opacity-[0.08]" width={24} height={24} />
              <div className="relative z-10">
                <HudLabel n="08" label="contacto" />
                <Badge className="mb-5 border-green-500/30 bg-green-500/10 text-green-400">Empezá hoy</Badge>
                <h2 className="mb-5 text-3xl font-black text-white md:text-5xl">
                  ¿Tu equipo listo para<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent
                                   drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                    operar con IA?
                  </span>
                </h2>
                <p className="mx-auto mb-6 max-w-xl text-sm text-white/55 md:text-lg">
                  El diagnóstico es gratuito y lo hacemos con el founder. En 2–3 semanas
                  tenés un roadmap con precio fijo y resultados medibles.
                </p>
                <div className="mb-7 flex flex-wrap items-center justify-center gap-4 text-xs text-white/35 md:gap-5 md:text-sm">
                  {["Sin compromiso", "Precio fijo", "Resultados medibles", "Founder-led"].map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-400/60" /> {item}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Link href="/apply">
                    <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)"
                      borderRadius="12px" className="px-8 py-4 text-base font-semibold">
                      Completá el formulario <ArrowRight className="ml-2 h-5 w-5" />
                    </ShimmerButton>
                  </Link>
                </div>
                <p className="mt-5 text-xs text-white/25 md:text-sm">
                  Gratis · Sin compromiso · Te contactamos en 24 hs
                </p>
              </div>
            </AuroraBorder>
          </BlurFade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-5">

            {/* Brand */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <button onClick={() => scrollTo("inicio")}
                className="text-left text-xl font-bold text-white hover:opacity-80 transition-opacity w-fit md:text-2xl">
                CICLO<span className="text-cyan-400">.</span>
              </button>
              <p className="max-w-xs text-sm leading-relaxed text-white/30">
                Operamos con tu equipo con IA hasta que sean completamente autónomos.
              </p>
              <div className="flex items-center gap-2.5">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08]
                             bg-white/[0.04] text-white/35 transition-colors hover:border-white/15 hover:text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08]
                             bg-white/[0.04] text-white/35 transition-colors hover:border-white/15 hover:text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="mailto:hola@ciclo.ai"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08]
                             bg-white/[0.04] text-white/35 transition-colors hover:border-white/15 hover:text-white">
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/20">
                <GlowDot />
                <span>Todos los sistemas operativos</span>
              </div>
            </div>

            {/* Link columns – 2 cols on mobile, individual on md+ */}
            <div className="grid grid-cols-2 gap-6 md:contents">
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Servicios</span>
                {["Diagnóstico IA", "Implementación", "Capacitación", "Operación continua"].map((item) => (
                  <button key={item} onClick={() => scrollTo("servicios")}
                    className="text-left text-sm text-white/25 transition-colors hover:text-white/60">{item}</button>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Metodología</span>
                {CICLO_STEPS.map((step) => (
                  <button key={step.title} onClick={() => scrollTo("metodo")}
                    className="text-left text-sm text-white/25 transition-colors hover:text-white/60">{step.title}</button>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Empresa</span>
                {[
                  { label: "Casos de éxito",  id: "casos" },
                  { label: "Por qué CICLO",   id: "diferenciadores" },
                  { label: "Cómo empezar",    id: "contacto" },
                ].map((item) => (
                  <button key={item.label} onClick={() => scrollTo(item.id)}
                    className="text-left text-sm text-white/25 transition-colors hover:text-white/60">{item.label}</button>
                ))}
                <a href="mailto:hola@ciclo.ai"
                  className="flex items-center gap-1.5 text-left text-sm text-white/25 transition-colors hover:text-white/60">
                  <MapPin className="h-3 w-3" /> Buenos Aires, Argentina
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/[0.05]" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/15 md:flex-row">
            <p>© 2025 CICLO. Todos los derechos reservados.</p>
            <p className="font-mono">// hecho con IA, para equipos que usan IA</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

/* ── sub-components ─────────────────────────────────────────── */

function TestimonialCard({ t }: { t: { name: string; role: string; text: string; avatar: string } }) {
  return (
    <div className="w-72 shrink-0 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:w-80">
      <p className="mb-4 text-xs leading-relaxed text-white/60 sm:text-sm">{`"${t.text}"`}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                        bg-gradient-to-br from-cyan-500/25 to-green-500/25 text-xs font-bold text-white">
          {t.avatar}
        </div>
        <div>
          <p className="text-xs font-semibold text-white sm:text-sm">{t.name}</p>
          <p className="text-xs text-white/35">{t.role}</p>
        </div>
      </div>
    </div>
  );
}
