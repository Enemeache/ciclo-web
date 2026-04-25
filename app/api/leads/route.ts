import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NOTION_API_KEY!;
const DB_ID   = process.env.NOTION_DATABASE_ID!;

const notionHeaders = () => ({
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
});

/* ── POST  ── create lead ─────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { nombre, instagram, acuerdo, servicio, presupuesto } = await req.json();

    const calificado   = presupuesto !== "<1000" && acuerdo !== "no";
    const estado       = calificado ? "Nuevo" : "Descalificado";
    const budgetLabel  = presupuesto === "<1000" ? "< USD 1.000" : "USD 1.500+";
    const servicioLabel =
      servicio === "todo" ? "Todo por mí" : "Capacitación de equipo";

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        parent: { database_id: DB_ID },
        properties: {
          Nombre:      { title:     [{ text: { content: nombre } }] },
          Instagram:   { rich_text: [{ text: { content: instagram } }] },
          Servicio:    { select: { name: servicioLabel } },
          Presupuesto: { select: { name: budgetLabel } },
          Estado:      { select: { name: estado } },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Notion POST error:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ success: true, calificado });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* ── GET  ── list leads ───────────────────────────────────────── */
export async function GET() {
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${DB_ID}/query`,
      {
        method: "POST",
        headers: notionHeaders(),
        body: JSON.stringify({
          sorts: [{ timestamp: "created_time", direction: "descending" }],
          page_size: 100,
        }),
        // always fresh
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leads = data.results.map((page: any) => ({
      id:          page.id,
      nombre:      page.properties.Nombre?.title?.[0]?.text?.content      ?? "—",
      instagram:   page.properties.Instagram?.rich_text?.[0]?.text?.content ?? "—",
      servicio:    page.properties.Servicio?.select?.name                  ?? "—",
      presupuesto: page.properties.Presupuesto?.select?.name               ?? "—",
      estado:      page.properties.Estado?.select?.name                    ?? "Nuevo",
      fecha:       page.created_time,
    }));

    return NextResponse.json({ leads });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/* ── PATCH  ── update estado ──────────────────────────────────── */
export async function PATCH(req: NextRequest) {
  try {
    const { id, estado } = await req.json();

    const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      method: "PATCH",
      headers: notionHeaders(),
      body: JSON.stringify({
        properties: { Estado: { select: { name: estado } } },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
