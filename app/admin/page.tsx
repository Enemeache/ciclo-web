"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  RefreshCcw, User, DollarSign,
  Briefcase, Calendar, ChevronDown,
} from "lucide-react";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}
import Link from "next/link";

/* --- TYPES --------------------------------------------------- */
type Lead = {
  id:          string;
  nombre:      string;
  instagram:   string;
  servicio:    string;
  presupuesto: string;
  estado:      string;
  fecha:       string;
};

/* --- CONSTANTS ----------------------------------------------- */
const ESTADOS = ["Nuevo", "Contactado", "Propuesta enviada", "Cerrado", "Descalificado"] as const;

const ESTADO_STYLE: Record<string, string> = {
  "Nuevo":              "border-cyan-500/30  bg-cyan-500/15  text-cyan-300",
  "Contactado":         "border-blue-500/30  bg-blue-500/15  text-blue-300",
  "Propuesta enviada":  "border-violet-500/30 bg-violet-500/15 text-violet-300",
  "Cerrado":            "border-green-500/30 bg-green-500/15 text-green-300",
  "Descalificado":      "border-red-500/20   bg-red-500/10   text-red-400/70",
};

const BUDGET_STYLE: Record<string, string> = {
  "USD 1.500+":   "border-green-500/25 bg-green-500/10 text-green-300",
  "< USD 1.000":  "border-white/10     bg-white/[0.03] text-white/30",
};

const FILTER_TABS = [
  { label: "Todos",          value: "all"          },
  { label: "Nuevos",         value: "Nuevo"        },
  { label: "Calificados",    value: "qualified"    },
  { label: "Contactados",    value: "Contactado"   },
  { label: "Propuesta",      value: "Propuesta enviada" },
  { label: "Cerrados",       value: "Cerrado"      },
  { label: "Descalificados", value: "Descalificado"},
] as const;

/* --- PAGE ---------------------------------------------------- */
export default function AdminPage() {
  const [leads,    setLeads]    = useState<Lead[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [filter,   setFilter]   = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/leads");
      const data = await res.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      setLeads(data.leads ?? []);
    } catch (e) {
      setError(String(e));
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateEstado = async (id: string, estado: string) => {
    setUpdating(id);
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado }),
      });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, estado } : l));
    } finally {
      setUpdating(null);
    }
  };

  const filtered = leads.filter((l) => {
    if (filter === "all")       return true;
    if (filter === "qualified") return l.presupuesto === "USD 1.500+";
    return l.estado === filter;
  });

  const stats = {
    total:          leads.length,
    nuevos:         leads.filter((l) => l.estado === "Nuevo").length,
    calificados:    leads.filter((l) => l.presupuesto === "USD 1.500+").length,
    cerrados:       leads.filter((l) => l.estado === "Cerrado").length,
    descalificados: leads.filter((l) => l.estado === "Descalificado").length,
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <main className="min-h-screen bg-[oklch(0.08_0_0)] px-4 pb-16 pt-8 md:px-8 md:pt-10">

      {/* -- Header -- */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
            CICLO<span className="text-cyan-400">.</span>
          </Link>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-cyan-500/40 uppercase">
            // panel de leads
          </p>
        </div>
        <button onClick={fetchLeads}
          className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04]
                     px-4 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white">
          <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
          Actualizar
        </button>
      </div>

      {/* -- Stats -- */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { label: "Total",          value: stats.total,          color: "text-white"    },
          { label: "Nuevos",         value: stats.nuevos,         color: "text-cyan-400" },
          { label: "Calificados",    value: stats.calificados,    color: "text-green-400"},
          { label: "Cerrados",       value: stats.cerrados,       color: "text-violet-400"},
          { label: "Descalificados", value: stats.descalificados, color: "text-white/25" },
        ].map((s) => (
          <div key={s.label}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4">
            <p className={cn("text-3xl font-black", s.color)}>{s.value}</p>
            <p className="mt-0.5 text-xs text-white/30">{s.label}</p>
          </div>
        ))}
      </div>

      {/* -- Filter tabs -- */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.value === "all"       ? leads.length :
            tab.value === "qualified" ? stats.calificados :
            leads.filter((l) => l.estado === tab.value).length;
          return (
            <button key={tab.value} onClick={() => setFilter(tab.value)}
              className={cn(
                "rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5",
                filter === tab.value
                  ? "border border-cyan-500/30 bg-cyan-500/15 text-cyan-300"
                  : "border border-white/[0.08] bg-white/[0.025] text-white/35 hover:text-white/60"
              )}>
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                  filter === tab.value ? "bg-cyan-400/20 text-cyan-300" : "bg-white/10 text-white/30"
                )}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* -- Error -- */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
          Error al cargar leads: {error}. Verificá las variables NOTION_API_KEY y NOTION_DATABASE_ID.
        </div>
      )}

      {/* -- Leads list -- */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <RefreshCcw className="h-8 w-8 animate-spin text-cyan-400/40" />
            <span className="text-xs text-white/25">Cargando leads...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-3xl">🤖</p>
          <p className="mt-3 text-sm text-white/25">No hay leads en esta categoría todavía.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((lead, i) => (
            <motion.div key={lead.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.025]
                         p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.035] md:p-5">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">

                {/* Name + Instagram */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    <span className="truncate text-sm font-semibold text-white">{lead.nombre}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IgIcon className="h-3.5 w-3.5 shrink-0 text-white/20" />
                    <a href={`https://instagram.com/${lead.instagram}`}
                       target="_blank" rel="noopener noreferrer"
                       className="truncate text-xs text-cyan-400/60 transition-colors hover:text-cyan-400">
                      @{lead.instagram}
                    </a>
                  </div>
                </div>

                {/* Service -- hidden on mobile */}
                <div className="hidden flex-col gap-1 md:flex md:w-36">
                  <span className="text-[9px] uppercase tracking-widest text-white/20">Servicio</span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3 w-3 shrink-0 text-white/25" />
                    <span className="text-xs text-white/55">{lead.servicio}</span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
                  <span className="hidden text-[9px] uppercase tracking-widest text-white/20 md:block">
                    Presupuesto
                  </span>
                  <Badge className={cn(
                    "border text-[10px] font-medium",
                    BUDGET_STYLE[lead.presupuesto] ?? "border-white/10 bg-white/5 text-white/30"
                  )}>
                    <DollarSign className="mr-0.5 h-2.5 w-2.5" />
                    {lead.presupuesto}
                  </Badge>
                </div>

                {/* Date -- hidden on mobile */}
                <div className="hidden flex-col gap-1 md:flex md:w-28">
                  <span className="text-[9px] uppercase tracking-widest text-white/20">Fecha</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 shrink-0 text-white/25" />
                    <span className="text-xs text-white/40">{fmtDate(lead.fecha)}</span>
                  </div>
                </div>

                {/* Estado selector */}
                <div className="relative">
                  <select
                    value={lead.estado}
                    onChange={(e) => updateEstado(lead.id, e.target.value)}
                    disabled={updating === lead.id}
                    className={cn(
                      "w-full appearance-none rounded-xl border py-2 pl-3 pr-8 text-xs font-medium",
                      "bg-[oklch(0.08_0_0)] outline-none cursor-pointer transition-opacity",
                      ESTADO_STYLE[lead.estado] ?? "border-white/10 text-white/40",
                      updating === lead.id && "opacity-50 pointer-events-none"
                    )}>
                    {ESTADOS.map((e) => (
                      <option key={e} value={e} className="bg-[oklch(0.10_0_0)] text-white">{e}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/30" />
                </div>

              </div>

              {/* Mobile extras row */}
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-white/35 md:hidden">
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{lead.servicio}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{fmtDate(lead.fecha)}</span>
              </div>

            </motion.div>
          ))}
        </div>
      )}

      <Separator className="my-10 bg-white/[0.05]" />
      <p className="text-center font-mono text-[10px] text-white/15">
        // panel interno CICLO · uso exclusivo del equipo
      </p>
    </main>
  );
}
