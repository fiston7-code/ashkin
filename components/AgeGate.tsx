"use client";
import { useApp } from "@/lib/store";

export default function AgeGate() {
  const setAgeOk = useApp((s) => s.setAgeOk);
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-5">
        <div className="w-16 h-16 bg-brand-600/20 text-brand-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-brand-500/30">18+</div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Bienvenue sur Nuitée</h2>
          <p className="text-xs text-slate-400">Trouvez un espace propre, sûr et discret à Kinshasa en toute sérénité.</p>
        </div>
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-xs text-slate-300 text-left space-y-1">
          <p className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-emerald-400" /> Discrétion garantie</p>
          <p className="flex items-center gap-2"><i className="fa-solid fa-check text-emerald-400" /> Hôtels vérifiés à Kinshasa</p>
          <p className="flex items-center gap-2"><i className="fa-solid fa-lock text-emerald-400" /> Accès réservé aux adultes</p>
        </div>
        <div className="space-y-2">
          <button onClick={() => setAgeOk(true)} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-brand-600/30 transition active:scale-95 text-sm">
            J&apos;ai 18 ans ou plus — Entrer
          </button>
          <button onClick={() => (window.location.href = "https://www.google.com")} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 py-2.5 rounded-xl text-xs transition">
            Quitter
          </button>
        </div>
        <p className="text-[10px] text-slate-500">En entrant, vous confirmez être majeur(e) selon les lois de RDC.</p>
      </div>
    </div>
  );
}