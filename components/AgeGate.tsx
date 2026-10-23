"use client";
import { useApp } from "@/lib/store";

export default function AgeGate() {
  const setAgeOk = useApp((s) => s.setAgeOk);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md">
      <div className="min-h-dvh flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 w-full max-w-sm sm:max-w-md text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-600/20 text-brand-500 rounded-full flex items-center justify-center mx-auto text-2xl sm:text-3xl font-bold border border-brand-500/30">
            18+
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Bienvenue sur Nuitée</h2>
            <p className="text-sm text-slate-400">
              Trouvez un espace propre, sûr et discret à Kinshasa en toute sérénité.
            </p>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 text-sm text-slate-300 text-left space-y-2">
            <p className="flex items-center gap-2.5"><i className="fa-solid fa-shield-halved text-emerald-400 w-4 text-center" /> Discrétion garantie</p>
            <p className="flex items-center gap-2.5"><i className="fa-solid fa-check text-emerald-400 w-4 text-center" /> Hôtels vérifiés à Kinshasa</p>
            <p className="flex items-center gap-2.5"><i className="fa-solid fa-lock text-emerald-400 w-4 text-center" /> Accès réservé aux adultes</p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setAgeOk(true)}
              className="w-full min-h-12 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand-600/30 transition active:scale-95 text-base"
            >
              J&apos;ai 18 ans ou plus — Entrer
            </button>
            <button
              onClick={() => (window.location.href = "https://www.google.com")}
              className="w-full min-h-12 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-sm transition"
            >
              Quitter
            </button>
          </div>

          <p className="text-xs text-slate-500">
            En entrant, vous confirmez être majeur(e) selon les lois de RDC.
          </p>
        </div>
      </div>
    </div>
  );
}