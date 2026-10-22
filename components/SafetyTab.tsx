export default function SafetyTab() {
  return (
    <section className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
      <div className="bg-rose-950/40 border border-rose-800/50 p-3 rounded-2xl flex items-center justify-between">
        <div>
          <h4 className="font-bold text-rose-300 text-xs">Sortie Rapide &amp; Discrétion</h4>
          <p className="text-[10px] text-rose-400/80">Ferme immédiatement l&apos;appli et ouvre Google.</p>
        </div>
        <button onClick={() => window.location.replace("https://www.google.com")} className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl font-medium text-xs transition">
          Sortir vite
        </button>
      </div>

      {/* TODO: remplacer par de vrais numéros vérifiés avant publication */}
      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
        <h4 className="font-bold text-slate-200 flex items-center gap-2">
          <i className="fa-solid fa-phone-volume text-brand-400" /> Assistance &amp; Numéros Utiles (Kinshasa)
        </h4>
        <div className="space-y-1.5 text-slate-300">
          <a href="tel:112" className="flex justify-between items-center bg-slate-800 p-2 rounded-xl text-[11px] hover:bg-slate-700">
            <span>Urgence Police RDC</span>
            <span className="font-bold text-brand-400">112 / +243 81 000 0000</span>
          </a>
          <a href="tel:+243820000000" className="flex justify-between items-center bg-slate-800 p-2 rounded-xl text-[11px] hover:bg-slate-700">
            <span>Support Discret Nuitée</span>
            <span className="font-bold text-slate-300">+243 82 000 0000</span>
          </a>
        </div>
      </div>

      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
        <h4 className="font-bold text-slate-200 flex items-center gap-2">
          <i className="fa-solid fa-rocket text-amber-400" /> Nuitée Version 2.0 (Prochainement)
        </h4>
        <ul className="space-y-2 text-slate-400 text-[11px]">
          <li className="flex items-start gap-2"><i className="fa-solid fa-mobile-retro text-emerald-400 mt-0.5" /><span><strong>Paiement Mobile Money :</strong> Réservation instantanée par M-Pesa, Airtel Money et Orange Money.</span></li>
          <li className="flex items-start gap-2"><i className="fa-solid fa-star text-amber-400 mt-0.5" /><span><strong>Avis vérifiés :</strong> Notes anonymes et commentaires de couples kinois.</span></li>
          <li className="flex items-start gap-2"><i className="fa-solid fa-location-arrow text-indigo-400 mt-0.5" /><span><strong>Partage de position GPS direct :</strong> Envoyez votre itinéraire en temps réel à votre partenaire.</span></li>
          <li className="flex items-start gap-2"><i className="fa-solid fa-wifi text-slate-400 mt-0.5" /><span><strong>Mode hors-ligne :</strong> Consultez les adresses et repères enregistrés sans connexion internet.</span></li>
        </ul>
      </div>

      <div className="text-center text-[10px] text-slate-600 pt-2">Nuitée v1.0 • Fait avec soin pour Kinshasa • 18+ Uniquement</div>
    </section>
  );
}