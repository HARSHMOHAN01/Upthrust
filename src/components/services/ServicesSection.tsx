"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ServicesSectionContent } from "@/types/content";
import { ArrowRight, Sparkles } from "lucide-react";

// Dynamically load the 3D Curve Canvas for high performance
const CurveCanvas = dynamic(() => import("@/components/three/CurveCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

interface ServicesSectionProps {
  services: ServicesSectionContent;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentService = services.items[activeIndex] || services.items[0];

  return (
    <section
      id="services"
      className="relative w-full bg-brand-dark text-white py-20 md:py-28 overflow-hidden border-b border-zinc-900"
    >
      {/* Dark Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-60 pointer-events-none" />

      {/* 3D Curve Ribbon Background Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <CurveCanvas
          modelPath={services.modelPath}
          activeIndex={activeIndex}
          className="w-full h-full"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest text-brand-orange uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{services.badgeText}</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">
              {services.eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Capabilities & Craft
            </h2>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800">
            {services.items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeIndex === idx
                    ? "bg-brand-orange text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.categoryNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Service Showcase Card */}
        <div className="relative bg-zinc-950/40 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left: Design Mockup Preview Board */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group">
              <Image
                src={currentService.mockupImage}
                alt={`${currentService.title} presentation preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                  REF // SPEC-{currentService.categoryNumber}
                </span>
                <span className="font-semibold text-white">UPTHRUST ARCHIVE</span>
              </div>
            </div>

            {/* Right: Detailed Content and Bullet Deliverables */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-orange block mb-2 font-bold">
                  WHAT WE CAN DO FOR YOU · {currentService.categoryNumber}
                </span>
                
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {currentService.title}
                </h3>
                
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {currentService.description}
                </p>

                {/* Deliverables Bullet List */}
                <ul className="space-y-3 mb-8">
                  {currentService.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                      <span className="text-brand-orange font-bold text-base leading-none select-none">+</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footnote if available */}
                {currentService.footnote && (
                  <p className="text-xs text-zinc-400 italic mb-8 border-l-2 border-brand-orange/40 pl-3 leading-relaxed">
                    {currentService.footnote}
                  </p>
                )}
              </div>

              {/* Action Button & Navigation */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{currentService.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Next service quick switcher */}
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % services.items.length)}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  Next Service →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
