import React from "react";

export function ZomatoLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Zomato">
      <text x="0" y="23" fontFamily="sans-serif" fontSize="24" fontWeight="900" fontStyle="italic" letterSpacing="-1">
        zomato
      </text>
    </svg>
  );
}

export function BoschLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Bosch">
      <circle cx="15" cy="15" r="11" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M9 15h12M15 9v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <text x="35" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="900" letterSpacing="1.5">
        BOSCH
      </text>
    </svg>
  );
}

export function LorealLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="L'Oréal">
      <text x="0" y="21" fontFamily="sans-serif" fontSize="19" fontWeight="800" letterSpacing="3">
        L’ORÉAL
      </text>
    </svg>
  );
}

export function VegaLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Vega">
      <text x="0" y="22" fontFamily="sans-serif" fontSize="22" fontWeight="900" letterSpacing="4">
        VEGA
      </text>
    </svg>
  );
}

export function DellLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Dell">
      <text x="0" y="22" fontFamily="sans-serif" fontSize="22" fontWeight="900" letterSpacing="2">
        DELL
      </text>
    </svg>
  );
}

export function ClientLogosBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-8 md:gap-14 text-zinc-900 opacity-80 ${className}`}>
      <div className="hover:opacity-100 transition-opacity">
        <ZomatoLogo className="h-5 md:h-6 w-auto" />
      </div>
      <div className="hover:opacity-100 transition-opacity">
        <BoschLogo className="h-5 md:h-6 w-auto" />
      </div>
      <div className="hover:opacity-100 transition-opacity">
        <LorealLogo className="h-4 md:h-5 w-auto" />
      </div>
      <div className="hover:opacity-100 transition-opacity">
        <VegaLogo className="h-5 md:h-6 w-auto" />
      </div>
      <div className="hover:opacity-100 transition-opacity">
        <DellLogo className="h-5 md:h-6 w-auto" />
      </div>
    </div>
  );
}
