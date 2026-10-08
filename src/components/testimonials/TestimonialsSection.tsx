import React from "react";
import { TestimonialItem } from "@/types/content";
import { Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="relative w-full bg-zinc-950 text-white py-20 md:py-24 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange block mb-3">
            PROVEN IMPACT
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What Founders & Leaders Say
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            We partner with category leaders to design systems that drive verifiable business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 mb-6 text-brand-orange">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-zinc-700 mb-4" />
                <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                  “{item.content}”
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.author}</h4>
                  <p className="text-xs text-zinc-400">
                    {item.role}, <span className="text-brand-orange">{item.company}</span>
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  VERIFIED CLIENT
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
