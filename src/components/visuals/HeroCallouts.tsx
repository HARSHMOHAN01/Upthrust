import React from "react";

export function StrategyCheaperCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`font-sans font-black uppercase tracking-wider text-[11px] sm:text-xs md:text-sm text-zinc-950 leading-tight select-none ${className}`}>
      <div>STRATEGY IS</div>
      <div className="relative inline-block mt-0.5">
        <span className="relative z-10 px-1">CHEAPER</span>
        {/* Hand-drawn style orange loop around CHEAPER */}
        <svg
          className="absolute -inset-x-2.5 -inset-y-1 w-[calc(100%+20px)] h-[calc(100%+8px)] pointer-events-none"
          viewBox="0 0 100 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 17 C 6 8, 26 3, 52 3 C 80 3, 94 8, 94 17 C 94 25, 74 29, 48 29 C 20 29, 5 24, 5 15 C 5 9, 18 5, 34 5"
            stroke="#FF4500"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function IdentityMotionCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`font-sans font-black tracking-widest text-[11px] sm:text-xs md:text-sm text-zinc-950 leading-relaxed uppercase select-none ${className}`}>
      <div>IDENTITY ·</div>
      <div>EXPERIENCE ·</div>
      <div className="relative inline-block">
        <span>MOTION ·</span>
        {/* Hand-drawn style orange wavy underline */}
        <svg
          className="absolute left-0 -bottom-1.5 w-full h-2.5 pointer-events-none"
          viewBox="0 0 76 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4 C 14 1, 26 7, 38 3 C 50 0, 62 6, 74 4"
            stroke="#FF4500"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function ComfortableExpensiveCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`font-sans font-black uppercase tracking-wider text-[11px] sm:text-xs md:text-sm text-zinc-950 leading-tight select-none ${className}`}>
      <div>COMFORTABLE</div>
      <div className="relative inline-block mt-0.5">
        <span>IS EXPENSIVE</span>
        {/* Hand-drawn style orange wavy underline */}
        <svg
          className="absolute left-0 -bottom-1.5 w-full h-2.5 pointer-events-none"
          viewBox="0 0 120 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4 C 18 1, 36 7, 56 3 C 76 0, 96 6, 118 4"
            stroke="#FF4500"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
