"use client";

import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, ArrowLeft, CheckCircle2,
  User, Zap, Users, DollarSign, Heart,
} from "lucide-react";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}
import Link from "next/link";

/* --- CONSTANTS ----------------------------------------------- */
const TOTAL_STEPS = 4;

const SERVICE_OPTIONS = [
  {
    id: "todo",
    label: "Que hagan todo por mí",
    description: "CICLO diseña, implementa y opera la IA dentro de tu negocio de punta a punta.",
    Icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    activeBorder: "border-cyan-400/60",
    activeBg: "bg-cyan-400/10",
  },
  {
    id: "capacitacion",
    label: "Capacitar a mi equipo",
    description: "Entrenamos a tu equipo para que opere con nuestras estructuras y sistemas de forma autónoma.",
    Icon: Users,
    color: "text-green-400",
    bg: "bg-green-400/10",
    activeBorder: "border-green-400/60",
    activeBg: "bg-green-400/10",
  },
] as const;

const BUDGET_OPTIONS = [
  {
    id: "1500plus",
    label: "USD 1.500 o más",
    description: "Estoy listo para una inversión real con resultados medibles.",
    qualified: true,
    color: "text-green-400",
    activeBorder: "border-green-400/60",
    activeBg: "bg-green-400/10",
  },
  {
    id: "<1000",
    label: "Menos de USD 1.000",
    description: "Mi presupuesto disponible hoy es menor a mil dólares.",
    qualified: false,
    color: "text-white/35",
    activeBorder: "border-white/20",
    activeBg: "bg-white/[0.04]",
  },
] as const;

const slide = {
  initial: (d: number) => ({ opacity: 0, x: d * 28 }),
  animate: { opacity: 1, x: 0 },
  exit:    (d: number) => ({ opacity: 0, x: d * -28 }),
};

/* --- PAGE ---------------------------------------------------- */
export default function ApplyPage() {
  const [step,       setStep]       = useState(1);
  const [dir,        setDir]        = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState<"success" | "disqualified" | null>(null);
  const [form, setForm] = useState({
    nombre: "", instagram: "", acuerdo: "", servicio: "", presupuesto: "",
  });

  const goNext = () => { setDir(1);  setStep((s) => s + 1); };
  const goPrev = () => { setDir(-1); setStep((s) => s - 1); };

  const canProceed = (): boolean => {
    if (step === 1) return form.nombre.trim().length > 1 && form.instagram.trim().length > 1;
    if (step === 2) return form.acuerdo !== "";
    if (step === 3) return form.servicio !== "";
    if (step === 4) return form.presupuesto !== "";
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res  = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data.calificado ? "success" : "disqualified");
    } catch {
      // fallback offline: decide by budget
      setResult(form.presupuesto === "<1000" || form.acuerdo === "no" ? "disqualified" : "success");
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = form.nombre.trim().split(" ")[0] || "amigo";

  /* -- Result screens -- */
  if (result === "success") {
    return (
      <ResultScreen
        icon={<CheckCircle2 className="h-10 w-10 text-green-400" />}
        iconBg="bg-green-500/15 border-green-500/30"
        title={`¡Perfecto, ${firstName}! 🚀`}
        lines={[
          "Ya tenemos todo lo que necesitamos. Nos vamos a poner en contacto muy pronto para agendar tu diagnóstico gratuito y arrancar a trabajar juntos.",
          "Mientras tanto, seguinos en Instagram para ver casos reales y aprender sobre IA aplicada a negocios.",
        ]}
        ctaColor="border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/15"
      />
    );
  }

  if (result === "disqualified") {
    return (
      <ResultScreen
        icon={<Heart className="h-10 w-10 text-cyan-400" />}
        iconBg="bg-cyan-500/10 border-cyan-500/20"
        title={`¡Gracias, ${firstName}! 💙`}
        lines={[
          "Nos encanta que estés pensando en esto -- ya estás un paso adelante de la mayoría.",
          <>
            Por el momento, nuestros programas arrancan desde{" "}
            <span className="font-semibold text-white">USD 1.500</span>. No porque no queramos
            ayudarte, sino porque es lo que necesitamos para garantizar resultados reales para tu negocio.
          </>,
          "Seguinos en Instagram y estate atento: estamos preparando opciones para todos los presupuestos. ¡Cuando el momento sea el indicado, acá vamos a estar! 🌱",
        ]}
        ctaColor="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/15"
      />
    );
  }

  /* -- Multi-step form -- */
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[oklch(0.08_0_0)] px-5 py-16">

      {/* Logo */}
      <div className="mb-10 text-center">
        <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition-opacity">
          CICLO<span className="text-cyan-400">.</span>
        </Link>
      </div>

      {/* Progress */}
      <div className="mb-7 w-full max-w-lg">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-white/20">// DIAGNÓSTICO GRATUITO</span>
          <span className="font-mono text-[10px] text-cyan-500/50">{step} / {TOTAL_STEPS}</span>
        </div>
        <div className="h-px w-full rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-green-400"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={slide}
            initial="initial" animate="animate" exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}>

            {/* -- Step 1 -- */}
            {step === 1 && (
              <div className="p-6 md:p-8">
                <StepHeader
                  title="Contanos sobre tu negocio"
                  sub="Dos datos rápidos para conocerte mejor."
                />
                <div className="space-y-4">
                  <Field label="Nombre y apellido">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                      <input type="text" value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Ej: María González"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-9 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20" />
                    </div>
                  </Field>
                  <Field label="Usuario de Instagram del negocio">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-white/30">@</span>
                      <input type="text" value={form.instagram}
                        onChange={(e) => setForm({ ...form, instagram: e.target.value.replace("@", "") })}
                        placeholder="tu_negocio"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-8 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20" />
                    </div>
                  </Field>
                </div>
              </div>
            )}

            {/* -- Step 2 -- */}
            {step === 2 && (
              <div className="p-6 md:p-8">
                <StepHeader
                  title="Una pregunta clave"
                  sub="Necesitamos estar alineados antes de seguir."
                />
                <p className="mb-5 text-sm leading-relaxed text-white/70">
                  ¿Estás de acuerdo en que te interesa optimizar tu negocio y apalancarte de la tecnología para crecer?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "si",  label: "Sí, totalmente", emoji: "💪" },
                    { id: "no",  label: "Por ahora no",   emoji: "🤔" },
                  ] as const).map((opt) => (
                    <button key={opt.id}
                      onClick={() => setForm({ ...form, acuerdo: opt.id })}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all",
                        form.acuerdo === opt.id
                          ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                          : "border-white/[0.08] bg-white/[0.025] text-white/45 hover:border-white/15 hover:bg-white/[0.04]"
                      )}>
                      <span className="text-2xl">{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
                {form.acuerdo === "no" && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-white/40">
                    Sin problema. Si en algún momento cambia tu situación, acá vamos a estar. 🌱
                  </motion.p>
                )}
              </div>
            )}

            {/* -- Step 3 -- */}
            {step === 3 && (
              <div className="p-6 md:p-8">
                <StepHeader
                  title="¿Cómo te gustaría trabajar?"
                  sub="Elegí el modelo que mejor se adapta a tu negocio."
                />
                <div className="space-y-3">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button key={opt.id}
                      onClick={() => setForm({ ...form, servicio: opt.id })}
                      className={cn(
                        "group w-full rounded-xl border p-4 text-left transition-all",
                        form.servicio === opt.id
                          ? cn(opt.activeBorder, opt.activeBg)
                          : "border-white/[0.08] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]"
                      )}>
                      <div className="flex items-start gap-3">
                        <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", opt.bg)}>
                          <opt.Icon className={cn("h-4 w-4", opt.color)} />
                        </div>
                        <div>
                          <p className="mb-1 text-sm font-semibold text-white">{opt.label}</p>
                          <p className="text-xs text-white/45">{opt.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* -- Step 4 -- */}
            {step === 4 && (
              <div className="p-6 md:p-8">
                <StepHeader
                  title="¿Qué inversión estás considerando?"
                  sub="Para llegar a tus objetivos en el menor tiempo posible."
                />
                <div className="space-y-3">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button key={opt.id}
                      onClick={() => setForm({ ...form, presupuesto: opt.id })}
                      className={cn(
                        "group w-full rounded-xl border p-4 text-left transition-all",
                        form.presupuesto === opt.id
                          ? cn(opt.activeBorder, opt.activeBg)
                          : "border-white/[0.08] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]"
                      )}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                          <DollarSign className={cn("h-4 w-4", opt.color)} />
                        </div>
                        <div>
                          <p className={cn("mb-1 text-sm font-semibold", opt.qualified ? "text-white" : "text-white/45")}>
                            {opt.label}
                          </p>
                          <p className="text-xs text-white/35">{opt.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4 md:px-8">
          {step > 1 ? (
            <button onClick={goPrev}
              className="flex items-center gap-2 text-sm text-white/35 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Volver
            </button>
          ) : (
            <Link href="/"
              className="flex items-center gap-2 text-sm text-white/35 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Inicio
            </Link>
          )}

          {step < TOTAL_STEPS ? (
            <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)"
              borderRadius="10px" className="px-5 py-2.5 text-sm font-semibold"
              onClick={goNext} disabled={!canProceed()}>
              Siguiente <ArrowRight className="ml-1.5 h-4 w-4" />
            </ShimmerButton>
          ) : (
            <ShimmerButton shimmerColor="#22d3ee" background="oklch(0.14 0.05 168)"
              borderRadius="10px" className="px-5 py-2.5 text-sm font-semibold"
              onClick={handleSubmit} disabled={!canProceed() || submitting}>
              {submitting ? "Enviando..." : <>Enviar <ArrowRight className="ml-1.5 h-4 w-4" /></>}
            </ShimmerButton>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-white/20">
        Tu información es privada y nunca la compartimos con terceros.
      </p>
    </main>
  );
}

/* --- Sub-components ------------------------------------------ */

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-white/40">{sub}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-white/45">{label}</label>
      {children}
    </div>
  );
}

function ResultScreen({
  icon, iconBg, title, lines, ctaColor,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  lines: (string | React.ReactNode)[];
  ctaColor: string;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[oklch(0.08_0_0)] px-5 py-16">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg text-center">
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border ${iconBg}`}>
          {icon}
        </div>
        <h1 className="mb-5 text-3xl font-black text-white md:text-4xl">{title}</h1>
        {lines.map((line, i) => (
          <p key={i} className="mb-4 text-sm leading-relaxed text-white/55 md:text-base">{line}</p>
        ))}
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="https://instagram.com/ciclo.ai" target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm transition-colors ${ctaColor}`}>
            <IgIcon className="h-4 w-4" /> Seguir en Instagram
          </a>
          <Link href="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white">
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
