"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BlueprintCadOverlay } from "@/components/visuals/BlueprintCadOverlay";
import {
  StrategyCheaperCallout,
  IdentityMotionCallout,
  ComfortableExpensiveCallout,
} from "@/components/visuals/HeroCallouts";
import {
  ZomatoLogo,
  BoschLogo,
  LorealLogo,
  VegaLogo,
  DellLogo,
} from "@/components/brand/ClientLogos";
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
    <section className="relative w-full overflow-hidden bg-white min-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-0 border-b border-zinc-200">
      {/* Architectural Graph Paper Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:72px_72px] sm:bg-[size:84px_84px] md:bg-[size:96px_96px] opacity-80 pointer-events-none" />

      {/* Main Hero Visual Canvas Container */}
      <div className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 flex-1 flex flex-col justify-between items-center select-none">
        
        {/* Top Headline: "BOLD DESIGN" */}
        <div className="w-full text-center z-10 pt-2 sm:pt-4">
          <h1
            className="inline-block text-[10.5vw] sm:text-[10vw] md:text-[8.8vw] lg:text-[8.2vw] xl:text-[7.8vw] 2xl:text-[112px] font-black italic tracking-tighter uppercase leading-[0.88] text-brand-orange select-none transform -skew-x-6 -rotate-1 whitespace-nowrap drop-shadow-sm"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {hero.headlineTop}
          </h1>
        </div>

        {/* Center Visual Stage: 3D Statue Bust, CAD Overlay, Callouts, and THAT */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] my-auto">
          {/* Blueprint CAD Schematic Overlay (Right side behind comfortable callout & THAT) */}
          <div className="absolute -right-6 sm:-right-2 md:right-4 lg:right-10 top-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[280px] sm:h-[380px] md:h-[460px] lg:h-[540px] pointer-events-none z-0 opacity-75">
            <BlueprintCadOverlay className="w-full h-full" />
          </div>

          {/* Center Stage: Interactive 3D Statue Bust */}
          <div className="relative w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] z-20 flex items-center justify-center pointer-events-auto">
            <StatueCanvas modelPath={hero.modelPath} className="w-full h-full" />
          </div>

          {/* Left Callout 1 (Upper Left): STRATEGY IS CHEAPER */}
          <div className="absolute left-2 sm:left-6 md:left-12 lg:left-16 top-[32%] -translate-y-1/2 z-30 pointer-events-auto">
            <StrategyCheaperCallout />
          </div>

          {/* Left Callout 2 (Lower Left): IDENTITY · EXPERIENCE · MOTION · */}
          <div className="absolute left-2 sm:left-6 md:left-12 lg:left-16 top-[70%] -translate-y-1/2 z-30 pointer-events-auto">
            <IdentityMotionCallout />
          </div>

          {/* Right Callout (Upper Right): COMFORTABLE IS EXPENSIVE */}
          <div className="absolute right-2 sm:right-6 md:right-12 lg:right-16 top-[28%] -translate-y-1/2 z-30 pointer-events-auto text-right">
            <ComfortableExpensiveCallout />
          </div>

          {/* Right Accent Headline: "THAT" (Directly beside statue bust) */}
          <div className="absolute right-4 sm:right-10 md:right-16 lg:right-24 top-[50%] -translate-y-1/2 z-30 pointer-events-auto select-none">
            <span
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black italic uppercase tracking-tighter text-brand-orange leading-none transform -skew-x-6 -rotate-1 inline-block drop-shadow-sm"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {hero.headlineAccent}
            </span>
          </div>
        </div>

        {/* Bottom Headline: "PERFORMS" (Nestled right beneath the statue bust) */}
        <div className="w-full text-center z-10 -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-18 pb-2 sm:pb-3">
          <span
            className="inline-block text-[11.2vw] sm:text-[10.8vw] md:text-[9.5vw] lg:text-[8.9vw] xl:text-[8.4vw] 2xl:text-[120px] font-black italic tracking-tighter uppercase leading-[0.82] text-brand-orange select-none transform -skew-x-6 -rotate-1 whitespace-nowrap drop-shadow-sm"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {hero.headlineBottom}
          </span>
        </div>
      </div>

      {/* Bottom Modular Grid Trust Bar (7-Cell Grid Strip) */}
      <div className="w-full border-t border-zinc-200 bg-white/70 backdrop-blur-sm z-30 relative">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 items-stretch">
          {/* Cell 1: 100+ Metric Counter */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-center border-b sm:border-b-0 border-r border-zinc-200/90">
            <span
              className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {trust.metricCount}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-zinc-600 leading-tight mt-1.5">
              {trust.metricLabel}
            </span>
          </div>

          {/* Cell 2: Zomato */}
          <div className="p-3 sm:p-4 flex items-center justify-center border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
            <ZomatoLogo className="h-4 sm:h-5 w-auto" />
          </div>

          {/* Cell 3: Bosch */}
          <div className="p-3 sm:p-4 flex items-center justify-center border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
            <BoschLogo className="h-4 sm:h-5 w-auto" />
          </div>

          {/* Cell 4: L'Oréal */}
          <div className="p-3 sm:p-4 flex items-center justify-center border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
            <LorealLogo className="h-3.5 sm:h-4 w-auto" />
          </div>

          {/* Cell 5: Vega */}
          <div className="p-3 sm:p-4 flex items-center justify-center border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
            <VegaLogo className="h-3.5 sm:h-4 w-auto" />
          </div>

          {/* Cell 6: Dell */}
          <div className="p-3 sm:p-4 flex items-center justify-center border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
            <DellLogo className="h-4 sm:h-5 w-auto" />
          </div>

          {/* Cell 7: L'Oréal (2nd) */}
          <div className="p-3 sm:p-4 flex items-center justify-center hover:opacity-100 transition-opacity">
            <LorealLogo className="h-3.5 sm:h-4 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
