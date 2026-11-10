"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/assets";
import { concepts } from "@/lib/content";

type Mode = "static" | "loading" | "3d";

/**
 * Bepaalt of dit apparaat de 3D-scène aankan. Anders blijft de lichte,
 * statische compositie staan (die ook direct server-side wordt gerenderd).
 */
function canRun3D(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (params.has("force3d")) return true; // handig bij testen in headless browsers
  if (params.has("no3d")) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  const small = window.matchMedia("(max-width: 767px)").matches;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (small && (cores < 6 || memory < 4)) return false;
  if (memory < 2) return false;

  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const order = [concepts[0], concepts[1], concepts[2]];

/** Statische compositie: dezelfde drie panelen, met CSS-perspectief. */
function StaticStage({ hidden }: { hidden: boolean }) {
  const place = [
    "left-[8%] top-[24%] w-[76%] z-[3] [transform:rotateY(-14deg)_rotateX(3deg)]",
    "left-[-2%] top-[6%] w-[56%] z-[1] opacity-75 [transform:rotateY(18deg)_translateZ(-60px)]",
    "right-[-4%] top-[56%] w-[54%] z-[2] opacity-90 [transform:rotateY(-24deg)_translateZ(-40px)]",
  ];
  const float = ["animate-float-a", "animate-float-b", "animate-float-b [animation-delay:-4s]"];
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 [perspective:1400px] ${hidden ? "opacity-0" : "opacity-100"}`}
      aria-hidden
    >
      {order.map((c, i) => (
        <div key={c.slug} className={`absolute [transform-style:preserve-3d] ${place[i]}`}>
        <div className={`overflow-hidden rounded-[10px] bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] ${float[i]}`}>
          <div className="flex h-[1.4rem] items-center gap-1.5 border-b border-white/5 bg-[#151b27] px-2.5">
            <span className="h-[6px] w-[6px] rounded-full bg-[#ff6b62]/80" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#f5bf4f]/80" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#3fc66b]/80" />
            <span className="mx-auto rounded-full bg-white/5 px-3 text-[9px] leading-[14px] text-mist">{c.url}</span>
          </div>
          <Image
            src={asset(`/concepts/${c.slug}-desktop.webp`)}
            alt=""
            width={1440}
            height={900}
            priority={i === 0}
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="block h-auto w-full"
          />
        </div>
        </div>
      ))}
    </div>
  );
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("static");

  useEffect(() => {
    if (!canRun3D()) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      setMode("loading");
      try {
        const { createHeroScene } = await import("./Hero3DScene");
        if (disposed || !containerRef.current || !canvasRef.current) return;
        const scene = createHeroScene(containerRef.current, canvasRef.current, {
          panels: order.map((c) => ({ image: asset(`/concepts/${c.slug}-desktop.webp`), url: c.url })) as Parameters<
            typeof createHeroScene
          >[2]["panels"],
          onReady: () => !disposed && setMode("3d"),
          onError: () => !disposed && setMode("static"),
        });
        cleanup = () => scene.dispose();
      } catch {
        if (!disposed) setMode("static");
      }
    };

    // Laad 3D pas als de browser even rust heeft: de tekst en knoppen gaan voor.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(start, { timeout: 1200 });
    else timeoutId = window.setTimeout(start, 300);

    return () => {
      disposed = true;
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full" role="img" aria-label="Drie zwevende websiteontwerpen: een schildersbedrijf, een hovenier en een autogarage (conceptontwerpen)">
      <StaticStage hidden={mode === "3d"} />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ${mode === "3d" ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
    </div>
  );
}
