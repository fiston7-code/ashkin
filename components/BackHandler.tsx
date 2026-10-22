"use client";
import { useEffect, useRef } from "react";
import { useApp } from "@/lib/store";

export default function BackHandler() {
  const tab = useApp((s) => s.tab);
  const selected = useApp((s) => s.selected);
  const shareOpen = useApp((s) => s.shareOpen);
  const pushed = useRef(0);
  const depth = (tab !== "list" ? 1 : 0) + (selected ? 1 : 0) + (shareOpen ? 1 : 0);

  useEffect(() => {
    while (pushed.current < depth) {
      pushed.current += 1;
      history.pushState({ n: pushed.current }, "");
    }
  }, [depth]);

  useEffect(() => {
    const onPop = () => {
      pushed.current = Math.max(0, pushed.current - 1);
      const s = useApp.getState();
      if (s.shareOpen) s.setShareOpen(false);
      else if (s.selected) s.setSelected(null);
      else if (s.tab !== "list") s.setTab("list");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return null;
}
