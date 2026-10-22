"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/store";
import { hotels, KINSHASA_CENTER } from "@/lib/hotels";
import { distanceKm } from "@/lib/geo";
import { formatPrice, priceOf } from "@/lib/price";

type Msg =
  | { role: "user"; text: string }
  | { role: "ai"; text: string; hotelIds?: number[]; error?: boolean };

const WELCOME: Msg = {
  role: "ai",
  text: "Mbote / Bonjour! Je suis ton assistant discret. Que cherches-tu aujourd'hui ? (Budget, commune, groupe électrogène 24h, calme...)",
};

export default function AssistantChat() {
  const { stay, currency, position, setSelected } = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const r = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Erreur");
      setMsgs((m) => [...m, { role: "ai", text: data.reply, hotelIds: data.hotelIds }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "ai", error: true, text: e instanceof Error ? e.message : "Erreur de connexion. Vérifiez votre réseau." }]);
    } finally {
      setLoading(false);
    }
  }

  function open(id: number) {
    const h = hotels.find((x) => x.id === id);
    if (!h) return;
    setSelected({ ...h, distanceKm: distanceKm(position ?? KINSHASA_CENTER, h) });
  }

  return (
    <section className="flex flex-col p-3 space-y-3 overflow-hidden h-[calc(100dvh-10rem)]">
      <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white text-lg font-bold shadow">
          <i className="fa-solid fa-robot" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white">Assistant Nuitée Bot</h3>
          <p className="text-[10px] text-slate-400">Demandez en Français ou en Lingala (ex: &quot;Chambre calme près de Victoire moins de 20$&quot;)</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-slate-900/40 rounded-2xl border border-slate-800/80 p-3 overflow-y-auto space-y-3 text-xs">
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex gap-2 items-start justify-end">
              <div className="bg-brand-600 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[85%]"><p>{m.text}</p></div>
            </div>
          ) : (
            <div key={i} className="flex gap-2 items-start">
              <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${m.error ? "bg-rose-600/30 text-rose-400" : "bg-brand-600/30 text-brand-400"}`}>
                {m.error ? "!" : "AI"}
              </div>
              <div className="max-w-[85%] space-y-2">
                <div className="bg-slate-800 text-slate-200 p-2.5 rounded-2xl rounded-tl-none"><p className="whitespace-pre-line">{m.text}</p></div>
                {m.hotelIds?.map((id) => {
                  const h = hotels.find((x) => x.id === id);
                  if (!h) return null;
                  return (
                    <button key={id} onClick={() => open(id)} className="w-full text-left bg-slate-900 border border-slate-700 hover:border-brand-500 rounded-xl p-2.5 transition">
                      <div className="flex justify-between gap-2">
                        <span className="font-bold text-white">{h.name}</span>
                        <span className="font-bold text-brand-400 whitespace-nowrap">{formatPrice(priceOf(h, stay), currency)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{h.commune} — {h.landmark}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center text-[10px] font-bold">AI</div>
            <div className="bg-slate-800 text-slate-400 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-2">
              <i className="fa-solid fa-spinner animate-spin" /> Recherche des meilleures options kinoises...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          maxLength={300}
          placeholder="Ex: Passage discret na Bandal 15$ max..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
        />
        <button onClick={send} disabled={loading} aria-label="Envoyer" className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95">
          <i className="fa-solid fa-paper-plane text-xs" />
        </button>
      </div>
    </section>
  );
}