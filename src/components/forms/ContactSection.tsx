import React from "react";
import { ContactSectionContent, BrandConfig } from "@/types/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Clock, ShieldCheck, Database } from "lucide-react";

interface ContactSectionProps {
  contact: ContactSectionContent;
  brand: BrandConfig;
}

export function ContactSection({ contact, brand }: ContactSectionProps) {
  return (
    <section id="contact" className="relative w-full bg-black text-white py-20 md:py-28 overflow-hidden border-b border-zinc-900">
      {/* Background wireframe */}
      <div className="absolute inset-0 bg-grid-pattern-dark bg-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-3">
                {contact.tagline}
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {contact.heading}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                {contact.description}
              </p>

              {/* Trust Badges */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                  <div className="p-2 bg-zinc-900 rounded-lg text-brand-orange border border-zinc-800">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Strict 24-hour turnaround on new brief reviews</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                  <div className="p-2 bg-zinc-900 rounded-lg text-brand-orange border border-zinc-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Non-Disclosure Agreements (NDA) honored by default</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                  <div className="p-2 bg-zinc-900 rounded-lg text-brand-orange border border-zinc-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Direct founder & design partner consultation</span>
                </div>
              </div>
            </div>

            {/* Live Submissions Backend Inspection Link (For Interview Showcase) */}
            <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-zinc-300 uppercase flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-brand-orange" />
                  Demonstration Backend
                </span>
                <span className="text-[10px] bg-brand-orange/20 text-brand-orange px-2 py-0.5 rounded font-mono font-semibold">
                  LIVE API
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Inspect where submitted briefs are recorded and validated:
              </p>
              <a
                href="/api/submissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-brand-orange hover:underline font-bold inline-flex items-center gap-1"
              >
                GET /api/submissions ↗
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7">
            <ContactForm content={contact} />
          </div>

        </div>
      </div>
    </section>
  );
}
