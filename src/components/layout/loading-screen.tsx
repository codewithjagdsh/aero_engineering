"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * Branded splash that fades out after initial mount.
 * Uses pure CSS animations so it always disappears, even if JS
 * hydration is delayed or fails (e.g. slow mobile connections).
 */
export function LoadingScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Remove from the DOM after the CSS fade-out completes.
    const t = setTimeout(() => setGone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      className="splash-screen fixed inset-0 z-[100] flex items-center justify-center bg-navy"
      aria-hidden
    >
      <div className="splash-content flex flex-col items-center gap-4">
        <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-soft-lg">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={72}
            height={72}
            className="h-16 w-16 object-contain"
            priority
          />
        </div>
        <p className="font-heading text-lg font-semibold tracking-wide text-white">
          Aero Engineering
        </p>
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="splash-bar h-full bg-electric" />
        </div>
      </div>
    </div>
  );
}
