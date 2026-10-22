"use client";
import BackHandler from "@/components/BackHandler";
import dynamic from "next/dynamic";
import { useApp, selectHotels } from "@/lib/store";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import Filters from "@/components/Filters";
import HotelCard from "@/components/HotelCard";
import HotelModal from "@/components/HotelModal";
import ShareModal from "@/components/ShareModal";
import SafetyTab from "@/components/SafetyTab";
import AssistantChat from "@/components/AssistantChat";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <section className="flex-1 p-4 text-xs text-slate-400">Chargement de la carte…</section>,
});

export default function Home() {
  const state = useApp();
  const { ageOk, tab, reset } = state;
  if (!ageOk) return <AgeGate />;

  const list = selectHotels(state);

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full min-h-screen bg-slate-950 shadow-2xl relative">
      <Header />
      <BackHandler />
      <Tabs />
      {tab === "list" && <Filters />}

      {tab === "list" && (
        <main className="flex-1 p-3 space-y-3 overflow-y-auto">
          <div className="space-y-3">
            {list.map((h) => <HotelCard key={h.id} h={h} />)}
          </div>
          {list.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500 text-xl">
                <i className="fa-solid fa-hotel" />
              </div>
              <p className="text-xs text-slate-400">Aucun hôtel trouvé pour ce budget ou cette commune.</p>
              <button onClick={reset} className="text-xs text-brand-400 underline font-medium">Réinitialiser les filtres</button>
            </div>
          )}
        </main>
      )}

      {tab === "map" && <MapView />}
      {tab === "ai" && <AssistantChat />}
      {tab === "info" && <SafetyTab />}

      <HotelModal />
      <ShareModal />
    </div>
  );
}