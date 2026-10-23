"use client";

// Ajoute ici UNIQUEMENT des numéros que tu as vérifiés toi-même.
// Exemple : { label: "Police", number: "+243XXXXXXXXX" }
const CONTACTS: { label: string; number: string }[] = [];

const ROADMAP = [
  { icon: "fa-mobile-retro text-emerald-400", title: "Paiement Mobile Money", text: "Réservation instantanée par M-Pesa, Airtel Money et Orange Money." },
  { icon: "fa-star text-amber-400", title: "Avis vérifiés", text: "Notes anonymes et commentaires de couples kinois." },
  { icon: "fa-location-arrow text-indigo-400", title: "Partage de position en direct", text: "Envoyez votre trajet en temps réel à votre partenaire." },
  { icon: "fa-wifi text-slate-400", title: "Mode hors-ligne", text: "Consultez les adresses et repères sans connexion internet." },
];

export default function SafetyTab() {
  return (
    <section className="flex-1 p-3 sm:p-4 space-y-4 overflow-y-auto text-sm pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="bg-rose-950/40 border border-rose-800/50 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div className="min-w-0">
          <h4 className="font-bold text-rose-300 text-base">Sortie rapide &amp; discrétion</h4>
          <p className="text-sm text-rose-400/80">Ferme immédiatement l&apos;appli et ouvre Google.</p>
        </div>
        <button
          onClick={() => window.location.replace("https://www.google.com")}
          className="min-h-12 w-full sm:w-auto bg-rose-600 hover:bg-rose-700 active:scale-95 text-white px-5 py-3 rounded-xl font-semibold text-base transition"
        >
          Sortir vite
        </button>
      </div>

      {CONTACTS.length > 0 && (
        <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-slate-200 text-base flex items-center gap-2">
            <i className="fa-solid fa-phone-volume text-brand-400" /> Numéros utiles
          </h4>
          <div className="space-y-2 text-slate-300">
            {CONTACTS.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="min-h-12 flex justify-between items-center gap-3 bg-slate-800 px-3.5 py-3 rounded-xl hover:bg-slate-700 active:scale-[0.98] transition"
              >
                <span className="min-w-0">{c.label}</span>
                <span className="font-bold text-brand-400 whitespace-nowrap">{c.number}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="font-bold text-slate-200 text-base flex items-center gap-2">
          <i className="fa-solid fa-rocket text-amber-400" /> Version 2.0 (prochainement)
        </h4>
        <ul className="space-y-3 text-slate-400">
          {ROADMAP.map((r) => (
            <li key={r.title} className="flex items-start gap-3">
              <i className={`fa-solid ${r.icon} mt-1 w-4 text-center`} />
              <span className="min-w-0">
                <strong className="text-slate-200">{r.title} :</strong> {r.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-xs text-slate-500 pt-1">
        ASH Kin v1.0 • Version de démonstration • 18+ uniquement
      </div>
    </section>
  );
}