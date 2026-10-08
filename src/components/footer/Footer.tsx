import React from "react";
import { FooterContent, BrandConfig } from "@/types/content";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  footer: FooterContent;
  brand: BrandConfig;
}

export function Footer({ footer, brand }: FooterProps) {
  return (
    <footer className="relative w-full bg-black text-white pt-20 pb-12 overflow-hidden border-t border-zinc-900 select-none">
      {/* Background wireframe grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 z-10">
        
        {/* Giant Hero Banner: UPTHRUST DESIGN */}
        <div className="w-full text-center pb-14 border-b border-zinc-900">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span
              className="text-[9.5vw] sm:text-[9vw] md:text-[8.5vw] font-black tracking-tighter uppercase leading-none text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              UPTHRUST
            </span>
            
            {/* Geometric Flame Triangle Mark */}
            <div className="inline-flex items-center justify-center w-[5vw] h-[5vw] max-w-[54px] max-h-[54px] min-w-[28px] min-h-[28px]">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <polygon points="20,38 4,8 36,8" fill="#FF4500" />
                <polygon points="20,24 12,9 28,9" fill="#000000" />
              </svg>
            </div>

            <span
              className="text-[9.5vw] sm:text-[9vw] md:text-[8.5vw] font-black tracking-tighter uppercase leading-none text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              DESIGN
            </span>
          </div>
        </div>

        {/* Footer Columns: Locations, Contact, Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-12 pb-14 text-xs">
          
          {/* Column 1: Locations */}
          <div className="space-y-6">
            <span className="font-mono text-zinc-500 uppercase tracking-widest block">
              LOCATIONS
            </span>
            {footer.locations.map((loc) => (
              <div key={loc.city} className="space-y-1">
                <div className="flex items-center gap-1 font-bold text-sm tracking-wider text-white">
                  <span>{loc.city}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-orange" />
                </div>
                <p className="text-zinc-400 font-mono text-[11px]">{loc.address}</p>
                <p className="text-zinc-500 font-mono text-[11px]">{loc.country}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Inquiries & Contact */}
          <div className="space-y-6">
            <span className="font-mono text-zinc-500 uppercase tracking-widest block">
              NEW BUSINESS
            </span>
            <div>
              <p className="text-zinc-400 mb-2">Say hello or share your brief:</p>
              <a
                href={`mailto:${footer.contactEmail}`}
                className="text-sm font-mono font-bold text-white hover:text-brand-orange transition-colors inline-block"
              >
                {footer.contactEmail}
              </a>
            </div>
            {brand.phone && (
              <div>
                <span className="text-zinc-500 block text-[11px]">Direct Line:</span>
                <span className="font-mono text-zinc-300">{brand.phone}</span>
              </div>
            )}
          </div>

          {/* Column 3: Social Channels & Legal */}
          <div className="space-y-6">
            <span className="font-mono text-zinc-500 uppercase tracking-widest block">
              NETWORK
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-300 hover:text-brand-orange transition-colors"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3 text-brand-orange" />
              </a>
              <a
                href={brand.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-300 hover:text-brand-orange transition-colors"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3 text-brand-orange" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>{footer.copyrightText}</p>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#services" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Back to top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
