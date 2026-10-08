import React from "react";

export function StrategyCheaperCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block font-sans font-bold uppercase tracking-wider text-xs md:text-sm text-zinc-900 ${className}`}>
      <span className="relative z-10 px-2 py-0.5">STRATEGY IS CHEAPER</span>
      {/* Hand-drawn style orange loop SVG */}
      <svg
        className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none"
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M12 20C10 9 35 4 80 4C135 4 154 11 154 20C154 29 125 36 75 36C25 36 6 29 6 18C6 11 25 7 50 6"
          stroke="#FF4500"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function IdentityMotionCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`font-sans font-extrabold tracking-widest text-[11px] md:text-xs text-zinc-900 leading-relaxed uppercase ${className}`}>
      <div>IDENTITY ·</div>
      <div>EXPERIENCE ·</div>
      <div className="relative inline-block">
        <span className="text-zinc-900">MOTION</span>
        <span className="inline-block w-1.5 h-1.5 ml-1 bg-brand-orange rounded-full" />
      </div>
    </div>
  );
}

export function ComfortableExpensiveCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block font-sans font-bold uppercase tracking-wider text-xs md:text-sm text-zinc-900 ${className}`}>
      <span>COMFORTABLE IS EXPENSIVE</span>
      {/* Hand-drawn style orange underline */}
      <svg
        className="absolute left-0 -bottom-1.5 w-full h-3 pointer-events-none"
        viewBox="0 0 180 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M2 7C45 4 120 4 178 8"
          stroke="#FF4500"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
