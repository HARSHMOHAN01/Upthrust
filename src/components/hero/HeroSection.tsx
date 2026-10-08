"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BlueprintCadOverlay } from "@/components/visuals/BlueprintCadOverlay";
import {
  StrategyCheaperCallout,
  IdentityMotionCallout,
  ComfortableExpensiveCallout,
} from "@/components/visuals/HeroCallouts";
import { ClientLogosBar } from "@/components/brand/ClientLogos";
import { StatueFallback } from "@/components/visuals/StatueFallback";
import { HeroSectionContent, TrustBannerContent } from "@/types/content";

// Dynamically import Three.js canvas to prevent SSR hydration mismatch and preserve instant LCP
const StatueCanvas = dynamic(() => import("@/components/three/StatueCanvas"), {
  ssr: false,
  loading: () => <StatueFallback className="w-full h-full" />,
});

interface HeroSectionProps {
  hero: HeroSectionContent;
  trust: TrustBannerContent;
}

export function HeroSection({ hero, trust }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-24 pb-12 md:pt-32 md:pb-16 border-b border-zinc-200">
      {/* 1. Technical Graph Paper Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-70 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        {/* 2. Hero Visual Canvas Container */}
        <div className="relative min-h-[480px] sm:min-h-[580px] md:min-h-[720px] flex flex-col justify-between items-center select-none">
          
          {/* Top Line: "BOLD DESIGN" */}
          <div className="w-full text-center z-10">
            <h1 className="text-[13vw] sm:text-[11.5vw] md:text-[9.5vw] font-black italic tracking-tighter uppercase leading-[0.88] text-brand-orange select-none transform -skew-x-6 drop-shadow-sm" style={{ fontFamily: "var(--font-syne)" }}>
              {hero.headlineTop}
            </h1>
          </div>

          {/* Blueprint CAD Schematic Overlay (Right side behind comfortable callout) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-96 lg:w-[460px] h-64 md:h-96 lg:h-[460px] pointer-events-none z-0 opacity-80">
            <BlueprintCadOverlay className="w-full h-full" />
          </div>

          {/* Center Stage: Interactive 3D Statue Bust */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-[52%] mx-auto w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] h-[340px] sm:h-[420px] md:h-[540px] z-20 flex items-center justify-center">
            <StatueCanvas modelPath={hero.modelPath} className="w-full h-full" />
          </div>

          {/* Middle Floating Annotations / Callouts */}
          <div className="relative w-full z-30 pointer-events-none py-6 sm:py-10 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left Column Annotations */}
            <div className="flex flex-col items-start gap-8 md:gap-14 md:pl-6 pointer-events-auto">
              <StrategyCheaperCallout />
              <IdentityMotionCallout />
            </div>

            {/* Right Column Annotations */}
            <div className="flex flex-col items-end gap-6 md:gap-12 md:pr-8 pointer-events-auto text-right">
              <ComfortableExpensiveCallout />
              <div className="pt-2 md:pt-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-brand-orange" style={{ fontFamily: "var(--font-syne)" }}>
                  {hero.headlineAccent}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Line: "PERFORMS" */}
          <div className="w-full text-center z-10 pt-4">
            <span
              className="block text-[14vw] sm:text-[12.5vw] md:text-[10.5vw] font-black italic tracking-tight uppercase leading-[0.84] text-brand-orange select-none transform -skew-x-6 drop-shadow-sm"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {hero.headlineBottom}
            </span>
          </div>
        </div>

        {/* 3. Trust Banner (100+ Brands Trust Us) */}
        <div className="mt-14 pt-10 border-t border-zinc-200/80 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-center lg:text-left flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
              {trust.metricCount}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-500 uppercase tracking-wider max-w-[180px] leading-snug">
              {trust.metricLabel}
            </span>
          </div>

          {/* Vector Partner Logos */}
          <div className="w-full lg:w-auto">
            <ClientLogosBar />
          </div>
        </div>
      </div>
    </section>
  );
}
