content = r'''"use client";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, BarChart3, Bot, Brain, CheckCircle2, ChevronRight,
  Cpu, Globe, Layers, LineChart, Mail, Menu, Rocket, Settings, Shield,
  TrendingUp, Users, X, Zap,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Método", href: "#metodo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Por qué CICLO", href: "#diferenciadores" },
  { label: "Contacto", href: "#contacto" },
];

const CICLO_STEPS = [
  { letter: "C", title: "Consult", description: "Diagnóstico profundo de procesos, datos y capacidades del equipo.", icon: Brain, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { letter: "I", title: "Implement", description: "Desarrollamos e integramos las soluciones de IA en los flujos existentes.", icon: Cpu, color: "text-green-400", bg: "bg-green-400/10" },
  { letter: "C", title: "Capacitate", description: "Entrenamos a los equipos en la práctica, no en la teoría.", icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { letter: "L", title: "Launch", description: "Acompañamos el lanzamiento con soporte activo para maximizar adopción.", icon: Rocket, color: "text-teal-400", bg: "bg-teal-400/10" },
  { letter: "O", title: "Operate", description: "Seguimiento continuo y optimización con el equipo ya autónomo.", icon: Settings, color: "text-sky-400", bg: "bg-sky-400/10" },
];

const STATS = [
  { value: 40, suffix: "+", label: "Proyectos completados", icon: CheckCircle2 },
  { value: 8, suffix: "", label: "Industrias atendidas", icon: Globe },
  { value: 87, suffix: "%", label: "Tasa real de adopción", icon: TrendingUp },
];

const CASES = [
  { industry: "Retail", title: "Automatización de pricing", result: "+32% eficiencia", description: "Motor de pricing dinámico que procesa variables de mercado en tiempo real.", icon: BarChart3, gradient: "from-cyan-500/20 to-cyan-500/5", badge: "bg-cyan-500/20 text-cyan-300", glow: "rgba(34,211,238,0.12)" },
  { industry: "Logística", title: "Optimización de rutas", result: "-18% costos", description: "Sistema de ruteo inteligente que redujo costos operativos y tiempos de entrega.", icon: LineChart, gradient: "from-green-500/20 to-green-500/5", badge: "bg-green-500/20 text-green-300", glow: "rgba(74,222,128,0.12)" },
  { industry: "Finanzas", title: "Procesos contables automáticos", result: "4x velocidad", description: "Cierre contable mensual automatizado con agentes de IA.", icon: Zap, gradient: "from-emerald-500/20 to-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-300", glow: "rgba(52,211,153,0.12)" },
];

const DIFFS = [
  { title: "Consultoras tradicionales", items: ["Solo estrategia", "Entregables estáticos", "Sin implementación real", "Equipo no autónomo"], isUs: false },
  { title: "CICLO", items: ["Estrategia + Ejecución", "Resultados medibles", "Implementación end-to-end", "Equipo 100% autónomo"], isUs: true },
  { title: "Agencias de desarrollo", items: ["Solo construyen", "Sin adopción", "Sin transferencia de conocimiento", "Dependencia continua"], isUs: false },
];

const PROBLEMS = [
  { icon: Shield, title: "Resistencia al cambio", desc: "Los equipos no adoptan herramientas que no entienden ni en cuyo diseño participaron.", color: "text-red-400", glow: "rgba(248,113,113,0.10)" },
  { icon: Layers, title: "Implementación sin contexto", desc: "Las soluciones genéricas no se adaptan a los procesos reales de tu organización.", color: "text-orange-400", glow: "rgba(251,146,60,0.10)" },
  { icon: Bot, title: "Dependencia del proveedor", desc: "Quedar atrapado en contratos de soporte en lugar de construir capacidad interna.", color: "text-yellow-400", glow: "rgba(250,204,21,0.10)" },
];

const INDUSTRIES = [
  "Retail", "Fintech", "Logística", "Healthcare", "Real Estate",
  "Manufactura", "E-commerce", "Educación", "SaaS", "Agro",
];

const TESTIMONIALS = [
  { name: "Martín Rodríguez", role: "CEO · Distribuidora Sur", text: "En 3 meses, nuestro equipo de operaciones pasó de resistir la IA a liderar su adopción interna. El proceso CICLO es diferente.", avatar: "MR" },
  { name: "Lucía Fernández", role: "Directora Comercial · Fintech BA", text: "No solo implementaron — nos enseñaron a hacerlo nosotros mismos. Hoy somos autónomos y seguimos mejorando.", avatar: "LF" },
  { name: "Pablo Navarro", role: "COO · Logística Express", text: "Redujimos el tiempo de cierre contable de 5 días a 6 horas. El equipo no volvió atrás.", avatar: "PN" },
  { name: "Valeria Lagos", role: "Gerente de Proyectos · Retail Group", text: "No son consultores que te dejan un PowerPoint. Trabajan en el día a día hasta que la IA es parte de tu cultura.", avatar: "VL" },
  { name: "Federico Suárez", role: "CTO · SaaS Latam", text: "El diagnóstico inicial fue revelador. Identificaron oportunidades que nosotros no habíamos visto en meses.", avatar: "FS" },
  { name: "Carolina Méndez", role: "CFO · Grupo Industrial", text: "Precio fijo, resultados claros y un equipo que realmente se involucra. Superaron todas las expectativas.", avatar: "CM" },
];

const TYPING_PHRASES = [
  "analizar mis procesos de negocio",
  "automatizar el cierre contable",
  "entrenar a mi equipo con IA",
  "escalar sin contratar más personal",
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GlowDot() {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full bg-emerald-400 shrink-0"
      style={{ animation: "pulse-glow 2s ease-in-out infinite", boxShadow: "0 0 8px 2px rgba(52,211,153,0.55)" }}
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const typingRef = useRef({ phrase: 0, charIndex: 0, deleting: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typing animation
  useEffect(() => {
    const state = typingRef.current;
    const phrase = TYPING_PHRASES[state.phrase];
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!state.deleting) {
        if (state.charIndex < phrase.length) {
          state.charIndex++;
          setTypingText(phrase.slice(0, state.charIndex));
          timeout = setTimeout(tick, 55);
        } else {
          timeout = setTimeout(() => {
            state.deleting = true;
            setIsDeleting(true);
            tick();
          }, 1800);
        }
      } else {
        if (state.charIndex > 0) {
          state.charIndex--;
          setTypingText(phrase.slice(0, state.charIndex));
          timeout = setTimeout(tick, 30);
        } else {
          state.deleting = false;
          setIsDeleting(false);
          state.phrase = (state.phrase + 1) % TYPING_PHRASES.length;
          setPhraseIndex(state.phrase);
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
    <main className="relative overflow-hidden bg-[oklch(0.08_0_0)]">

      {/* ── NAV ── */}
      <nav className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[oklch(0.08_0_0)]/95 backdrop-blur-xl shadow-xl shadow-black/20"
          : "bg-transparent"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo("inicio")}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            CICLO<span className="text-cyan-400">.</span>
          </button>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ShimmerButton
              shimmerColor="#22d3ee"
              background="oklch(0.12 0 0)"
              className="hidden text-sm font-medium sm:flex"
              onClick={() => handleNav("#contacto")}
            >
              Agendá diagnóstico <ChevronRight className="ml-1 h-4 w-4" />
            </ShimmerButton>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/5 bg-[oklch(0.08_0_0)]/98 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-3 border-t border-white/5 pt-3">
                  <ShimmerButton
                    shimmerColor="#22d3ee"
                    background="oklch(0.14 0.05 168)"
                    borderRadius="12px"
                    className="w-full justify-center py-3 text-sm font-semibold"
                    onClick={() => handleNav("#contacto")}
                  >
                    Agendá tu diagnóstico gratuito <ArrowRight className="ml-2 h-4 w-4" />
                  </ShimmerButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        {/* Particles */}
        <Particles className="absolute inset-0 z-0" />

        {/* Dot pattern */}
        <DotPattern className="absolute inset-0 opacity-20" width={28} height={28} />

        {/* Ripple rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
          {[0, 1.4, 2.8].map((delay, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan-500/20"
              style={{
                width: 420,
                height: 420,
                animation: `ripple-out 4.5s ease-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>

        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(34,211,238,0.10) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.08_0_0)]" />

        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-6">
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
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Operamos con tu equipo<br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                hasta que sean autónomos
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              No implementamos tecnología y nos vamos. Trabajamos dentro de tu organización con IA
              hasta que el equipo pueda operar de forma independiente.
            </p>
          </BlurFade>

          {/* Typing terminal */}
          <BlurFade delay={0.35}>
            <div className="w-full max-w-lg rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-left font-mono text-sm text-white/70 backdrop-blur-sm">
              <span className="text-cyan-400">ciclo</span>
              <span className="text-white/30"> ~ </span>
              <span className="text-green-400">$</span>
              {" "}
              <span className="text-white/80">{typingText}</span>
              <span
                className="ml-0.5 inline-block w-0.5 h-4 bg-cyan-400 align-middle"
                style={{ animation: "blink-cursor 1s step-end infinite" }}
              />
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ShimmerButton
                shimmerColor="#22d3ee"
                background="oklch(0.14 0.05 168)"
                borderRadius="12px"
                className="px-8 py-4 text-base font-semibold"
                onClick={() => scrollTo("contacto")}
              >
                Agendá tu diagnóstico gratuito <ArrowRight className="ml-2 h-5 w-5" />
              </ShimmerButton>
              <button
                className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                onClick={() => scrollTo("casos")}
              >
                Ver casos de éxito <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-6 flex flex-wrap justify-center gap-10 border-t border-white/10 pt-8">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">
                    <NumberTicker value={s.value} className="text-3xl font-bold text-white" />{s.suffix}
                  </span>
                  <span className="mt-1 text-sm text-white/50">{s.label}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="h-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── INDUSTRIES MARQUEE ── */}
      <section className="border-t border-white/5 py-14">
        <BlurFade inView>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            Industrias que ya operan con IA
          </p>
        </BlurFade>
        <Marquee pauseOnHover className="gap-8">
          {INDUSTRIES.map((name) => (
            <div
              key={name}
              className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
              <span className="text-base font-semibold text-white/40 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── PROBLEMA / SERVICIOS ── */}
      <section id="servicios" className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">El problema</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                La mayoría de los proyectos de IA<br />
                <span className="text-white/40">no sobreviven al primer mes</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-white/60">
                Las organizaciones invierten en tecnología, pero los equipos no la adoptan.
                El problema no es la IA, es el proceso de cambio.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((item, i) => (
              <BlurFade key={item.title} inView delay={i * 0.1}>
                <MagicCard gradientColor={item.glow} className="p-6 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className={cn("h-6 w-6", item.color)} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA CICLO ── */}
      <section id="metodo" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Nuestra metodología</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                El método{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  CICLO
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-white/60">
                Cinco fases para que la IA quede operando dentro de tu organización como una capacidad interna.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {CICLO_STEPS.map((step, i) => (
              <BlurFade key={step.letter + i} inView delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:-translate-y-1 duration-300 h-full">
                  <BorderBeam size={80} duration={12} delay={i * 2} colorFrom="#22d3ee" colorTo="#4ade80" />
                  <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", step.bg)}>
                    <span className={cn("text-2xl font-black", step.color)}>{step.letter}</span>
                  </div>
                  <div className={cn("mb-3 flex h-8 w-8 items-center justify-center rounded-lg", step.bg)}>
                    <step.icon className={cn("h-4 w-4", step.color)} />
                  </div>
                  <h3 className="mb-2 font-bold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/50">{step.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS ── */}
      <section id="casos" className="py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-green-500/30 bg-green-500/10 text-green-400">Casos reales</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">Resultados que hablan</h2>
              <p className="mx-auto mt-6 max-w-xl text-white/60">
                No son pilotos. Son implementaciones en producción con equipos que hoy operan de forma autónoma.
              </p>
            </div>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            {CASES.map((c, i) => (
              <BlurFade key={c.title} inView delay={i * 0.1}>
                <MagicCard
                  gradientColor={c.glow}
                  className={cn("bg-gradient-to-br p-6 h-full", c.gradient)}
                >
                  <BorderBeam size={120} duration={10} delay={i * 3} />
                  <div className="mb-4 flex items-center justify-between">
                    <Badge className={cn("text-xs font-medium border-0", c.badge)}>{c.industry}</Badge>
                    <c.icon className="h-5 w-5 text-white/30" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{c.title}</h3>
                  <p className="mb-4 text-sm text-white/60">{c.description}</p>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-2xl font-black text-white">{c.result}</span>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADORES ── */}
      <section id="diferenciadores" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">Por qué CICLO</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                No somos una consultora.<br />
                <span className="text-white/40">Tampoco una agencia.</span>
              </h2>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-3">
            {DIFFS.map((d, i) => (
              <BlurFade key={d.title} inView delay={i * 0.1}>
                <div className={cn(
                  "relative overflow-hidden rounded-2xl border p-6 h-full transition-all duration-300",
                  d.isUs
                    ? "border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-green-950/20 shadow-xl shadow-cyan-500/10"
                    : "border-white/10 bg-white/5 opacity-60 hover:opacity-80"
                )}>
                  {d.isUs && <BorderBeam colorFrom="#22d3ee" colorTo="#4ade80" />}
                  {d.isUs && (
                    <div className="absolute right-4 top-4">
                      <Badge className="border-0 bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white">
                        ✦ Nosotros
                      </Badge>
                    </div>
                  )}
                  <h3 className={cn("mb-6 text-lg font-bold", d.isUs ? "text-white" : "text-white/50")}>
                    {d.title}
                  </h3>
                  <ul className="space-y-3">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", d.isUs ? "text-green-400" : "text-white/20")} />
                        <span className={cn("text-sm", d.isUs ? "text-white/80" : "text-white/30")}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/30 via-[oklch(0.1_0_0)] to-green-950/30 p-12 text-center">
              <DotPattern className="opacity-20" width={20} height={20} />
              <BorderBeam size={300} duration={20} colorFrom="#22d3ee" colorTo="#4ade80" />
              <div className="relative z-10">
                <Badge className="mb-6 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Números reales</Badge>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex flex-col items-center"
                    >
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                        <stat.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <span className="text-5xl font-black text-white">
                        <NumberTicker value={stat.value} className="text-5xl font-black text-white" />{stat.suffix}
                      </span>
                      <span className="mt-2 text-sm text-white/50">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <section className="border-t border-white/5 py-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-14 text-center">
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">Testimonios</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">Equipos que ya operan con IA</h2>
            </div>
          </BlurFade>
        </div>
        <div className="space-y-4">
          <Marquee pauseOnHover>
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="w-80 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="mb-4 text-sm leading-relaxed text-white/70">{`"${t.text}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-green-500/30 text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover>
            {TESTIMONIALS.slice(3).map((t) => (
              <div
                key={t.name}
                className="w-80 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="mb-4 text-sm leading-relaxed text-white/70">{`"${t.text}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-green-500/30 text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── CTA / CONTACTO ── */}
      <section id="contacto" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0_0)] to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/30 to-[oklch(0.09_0_0)] p-14">
              <BorderBeam size={400} duration={18} colorFrom="#22d3ee" colorTo="#4ade80" />
              <DotPattern className="opacity-10" width={24} height={24} />
              <div className="relative z-10">
                <Badge className="mb-6 border-green-500/30 bg-green-500/10 text-green-400">Empezá hoy</Badge>
                <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                  ¿Tu equipo listo para<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    operar con IA?
                  </span>
                </h2>
                <p className="mx-auto mb-6 max-w-xl text-lg text-white/60">
                  El diagnóstico es gratuito y lo hacemos con el founder. En 2–3 semanas tenés
                  un roadmap con precio fijo y resultados medibles.
                </p>
                <div className="mb-8 flex flex-wrap items-center justify-center gap-5 text-sm text-white/40">
                  {["Sin compromiso", "Precio fijo", "Resultados medibles", "Founder-led"].map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400/60" /> {item}
                    </span>
                  ))}
                </div>

                {/* Email input + CTA */}
                <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@empresa.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                    />
                  </div>
                  <ShimmerButton
                    shimmerColor="#22d3ee"
                    background="oklch(0.14 0.05 168)"
                    borderRadius="12px"
                    className="px-6 py-3 text-sm font-semibold whitespace-nowrap"
                    onClick={() => {
                      const target = email ? `mailto:hola@ciclo.ai?subject=Diagnóstico gratuito&body=Mi email: ${email}` : "mailto:hola@ciclo.ai";
                      window.open(target, "_blank");
                    }}
                  >
                    Agendá diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
                  </ShimmerButton>
                </div>

                <p className="mt-5 text-sm text-white/30">
                  O escribinos directamente a{" "}
                  <span className="text-cyan-400/70">hola@ciclo.ai</span>
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <button
                onClick={() => scrollTo("inicio")}
                className="text-left text-2xl font-bold text-white hover:opacity-80 transition-opacity w-fit"
              >
                CICLO<span className="text-cyan-400">.</span>
              </button>
              <p className="max-w-xs text-sm leading-relaxed text-white/30">
                Operamos con tu equipo con IA hasta que sean completamente autónomos.
                Estrategia, implementación y adopción en un solo proceso.
              </p>
              <div className="flex items-center gap-2 text-xs text-white/20">
                <GlowDot />
                <span>Todos los sistemas operativos</span>
              </div>
            </div>

            {/* Servicios */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white/70">Servicios</span>
              {["Diagnóstico IA", "Implementación", "Capacitación", "Operación continua"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo("servicios")}
                  className="text-left text-sm text-white/30 transition-colors hover:text-white/70"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Metodología */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white/70">Metodología</span>
              {CICLO_STEPS.map((step) => (
                <button
                  key={step.title}
                  onClick={() => scrollTo("metodo")}
                  className="text-left text-sm text-white/30 transition-colors hover:text-white/70"
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Empresa */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white/70">Empresa</span>
              {[
                { label: "Casos de éxito", id: "casos" },
                { label: "Por qué CICLO", id: "diferenciadores" },
                { label: "Contacto", id: "contacto" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-sm text-white/30 transition-colors hover:text-white/70"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="mailto:hola@ciclo.ai"
                className="text-left text-sm text-white/30 transition-colors hover:text-white/70"
              >
                hola@ciclo.ai
              </a>
            </div>
          </div>

          <Separator className="my-10 bg-white/5" />

          <div className="flex flex-col items-center justify-between gap-3 text-xs text-white/20 md:flex-row">
            <p>© 2025 CICLO. Todos los derechos reservados.</p>
            <p>Hecho con IA, para equipos que usan IA.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
'''

with open("app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("page.tsx written successfully")
