"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/content";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative w-full bg-zinc-950 text-white py-20 md:py-24 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-3">
              QUESTIONS & ANSWERS
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              Everything you need to know about our sprints, deliverables, and engagement process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-zinc-100 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
