"use client";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, Brain, CheckCircle2, ChevronRight, Cpu, Globe, Layers, LineChart, Rocket, Settings, Shield, TrendingUp, Users, Zap } from "lucide-react";

const CICLO_STEPS = [
  { letter: "C", title: "Consult", description: "Diagnostico profundo de procesos, datos y capacidades del equipo.", icon: Brain, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { letter: "I", title: "Implement", description: "Desarrollamos e integramos las soluciones de IA en los flujos existentes.", icon: Cpu, color: "text-green-400", bg: "bg-green-400/10" },
  { letter: "C", title: "Capacitate", description: "Entrenamos a los equipos en la practica, no en la teoria.", icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { letter: "L", title: "Launch", description: "Acompanamos el lanzamiento con soporte activo para maximizar adopcion.", icon: Rocket, color: "text-teal-400", bg: "bg-teal-400/10" },
  { letter: "O", title: "Operate", description: "Seguimiento continuo y optimizacion con el equipo ya autonomo.", icon: Settings, color: "text-sky-400", bg: "bg-sky-400/10" },
];
const STATS = [
  { value: 40, suffix: "+", label: "Proyectos completados", icon: CheckCircle2 },
  { value: 8, suffix: "", label: "Industrias atendidas", icon: Globe },
  { value: 87, suffix: "%", label: "Tasa real de adopcion", icon: TrendingUp },
];
const CASES = [
  { industry: "Retail", title: "Automatizacion de pricing", result: "+32% eficiencia", description: "Motor de pricing dinamico que procesa variables de mercado en tiempo real.", icon: BarChart3, gradient: "from-cyan-500/20 to-cyan-500/5", badge: "bg-cyan-500/20 text-cyan-300" },
  { industry: "Logistica", title: "Optimizacion de rutas", result: "-18% costos", description: "Sistema de ruteo inteligente que redujo costos operativos y tiempos de entrega.", icon: LineChart, gradient: "from-green-500/20 to-green-500/5", badge: "bg-green-500/20 text-green-300" },
  { industry: "Finanzas", title: "Procesos contables automaticos", result: "4x velocidad", description: "Cierre contable mensual automatizado con agentes de IA.", icon: Zap, gradient: "from-emerald-500/20 to-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-300" },
];
const DIFFS = [
  { title: "Consultoras tradicionales", items: ["Solo estrategia", "Entregables estaticos", "Sin implementacion real", "Equipo no autonomo"], isUs: false },
  { title: "CICLO", items: ["Estrategia + Ejecucion", "Resultados medibles", "Implementacion end-to-end", "Equipo 100% autonomo"], isUs: true },
  { title: "Agencias de desarrollo", items: ["Solo construyen", "Sin adopcion", "Sin transferencia de conocimiento", "Dependencia continua"], isUs: false },
];
const PROBLEMS = [
  { icon: Shield, title: "Resistencia al cambio", desc: "Los equipos no adoptan herramientas que no entienden.", color: "text-red-400" },
  { icon: Layers, title: "Implementacion sin contexto", desc: "Las soluciones genericas no se adaptan a tu organizacion.", color: "text-orange-400" },
  { icon: Bot, title: "Dependencia del proveedor", desc: "Quedar atrapado en contratos en lugar de construir capacidad interna.", color: "text-yellow-400" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[oklch(0.08_0_0)]">
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[oklch(0.08_0_0)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-white">CICLO<span className="text-cyan-400">.</span></span>
          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            {["Metodo", "Servicios", "Casos", "Insights", "Equipo"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">{item}</a>
            ))}
          </div>
          <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.12 0 0)" className="text-sm font-medium">
            Agenda diagnostico <ChevronRight className="ml-1 h-4 w-4" />
          </ShimmerButton>
        </div>
      </nav>

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <DotPattern className="opacity-30" width={24} height={24} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.08_0_0)]" />
        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-6">
          <BlurFade delay={0.1}>
            <AnimatedGradientText>
              <span className="text-white/80">✦</span>
              <Separator orientation="vertical" className="mx-2 h-4 bg-white/20" />
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">AI Adoption que realmente funciona</span>
              <ChevronRight className="ml-1 h-4 w-4 text-white/50" />
            </AnimatedGradientText>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Operamos con tu equipo<br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent">hasta que sean autonomos</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              No implementamos tecnologia y nos vamos. Trabajamos dentro de tu organizacion con IA hasta que el equipo pueda operar de forma independiente.
            </p>
          </BlurFade>
          <BlurFade delay={0.4}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)" borderRadius="12px" className="px-8 py-4 text-base font-semibold">
                Agenda tu diagnostico gratuito <ArrowRight className="ml-2 h-5 w-5" />
              </ShimmerButton>
              <button className="flex items-center gap-2 text-white/60 transition-colors hover:text-white">
                Ver casos de exito <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </BlurFade>
          <BlurFade delay={0.5}>
            <div className="mt-8 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8">
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
      </section>

      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">El problema</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">La mayoria de los proyectos de IA<br /><span className="text-white/40">no sobreviven al primer mes</span></h2>
              <p className="mx-auto mt-6 max-w-2xl text-white/60">Las organizaciones invierten en tecnologia, pero los equipos no la adoptan. El problema no es la IA, es el proceso de cambio.</p>
            </div>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((item, i) => (
              <BlurFade key={item.title} inView delay={i * 0.1}>
                <Card className="relative overflow-hidden border-white/10 bg-white/5 p-6">
                  <CardContent className="p-0">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                      <item.icon className={cn("h-6 w-6", item.color)} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Nuestra metodologia</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">El metodo <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">CICLO</span></h2>
              <p className="mx-auto mt-6 max-w-xl text-white/60">Cinco fases para que la IA quede operando dentro de tu organizacion como una capacidad interna.</p>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-5">
            {CICLO_STEPS.map((step, i) => (
              <BlurFade key={step.letter + i} inView delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20">
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

      <section className="py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-green-500/30 bg-green-500/10 text-green-400">Casos reales</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">Resultados que hablan</h2>
              <p className="mx-auto mt-6 max-w-xl text-white/60">No son pilotos. Son implementaciones en produccion con equipos que hoy operan de forma autonoma.</p>
            </div>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            {CASES.map((c, i) => (
              <BlurFade key={c.title} inView delay={i * 0.1}>
                <Card className={cn("group relative overflow-hidden border-white/10 bg-gradient-to-br p-6 transition-all hover:scale-[1.02]", c.gradient)}>
                  <BorderBeam size={120} duration={10} delay={i * 3} />
                  <CardContent className="p-0">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge className={cn("text-xs font-medium border-0", c.badge)}>{c.industry}</Badge>
                      <c.icon className="h-5 w-5 text-white/30" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{c.title}</h3>
                    <p className="mb-4 text-sm text-white/60">{c.description}</p>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="text-2xl font-black text-white">{c.result}</span>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-white/10 bg-white/5 text-white/70">Por que CICLO</Badge>
              <h2 className="text-4xl font-bold text-white md:text-5xl">No somos una consultora.<br /><span className="text-white/40">Tampoco una agencia.</span></h2>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-3">
            {DIFFS.map((d, i) => (
              <BlurFade key={d.title} inView delay={i * 0.1}>
                <div className={cn("relative overflow-hidden rounded-2xl border p-6", d.isUs ? "border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-green-950/20" : "border-white/10 bg-white/5 opacity-70")}>
                  {d.isUs && <BorderBeam colorFrom="#22d3ee" colorTo="#4ade80" />}
                  {d.isUs && (
                    <div className="absolute right-4 top-4">
                      <Badge className="border-0 bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white">Nosotros</Badge>
                    </div>
                  )}
                  <h3 className={cn("mb-6 text-lg font-bold", d.isUs ? "text-white" : "text-white/50")}>{d.title}</h3>
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

      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/30 via-[oklch(0.1_0_0)] to-green-950/30 p-12 text-center">
              <DotPattern className="opacity-20" width={20} height={20} />
              <BorderBeam size={300} duration={20} colorFrom="#22d3ee" colorTo="#4ade80" />
              <div className="relative z-10">
                <Badge className="mb-6 border-cyan-500/30 bg-cyan-500/10 text-cyan-400">Numeros reales</Badge>
                <div className="grid gap-8 md:grid-cols-3">
                  {STATS.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex flex-col items-center">
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

      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0_0)] to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <BlurFade inView>
            <Badge className="mb-6 border-green-500/30 bg-green-500/10 text-green-400">Empeza hoy</Badge>
            <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Tu equipo listo para<br />
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">operar con IA</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-white/60">El diagnostico es gratuito. En 2-3 semanas tenes un roadmap con precio fijo y resultados medibles.</p>
            <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)" borderRadius="14px" className="mx-auto px-10 py-5 text-lg font-semibold">
              Agenda tu diagnostico gratuito <ArrowRight className="ml-2 h-5 w-5" />
            </ShimmerButton>
            <p className="mt-4 text-sm text-white/30">Sin compromiso - Precio fijo - Resultados medibles</p>
          </BlurFade>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <span className="text-xl font-bold text-white">CICLO<span className="text-cyan-400">.</span></span>
          <div className="flex gap-8 text-sm text-white/40">
            {["Metodo", "Servicios", "Casos", "Insights", "Equipo"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">{item}</a>
            ))}
          </div>
          <p className="text-sm text-white/30">2024 CICLO. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
