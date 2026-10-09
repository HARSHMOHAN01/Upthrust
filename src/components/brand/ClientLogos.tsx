import React from "react";

export function ZomatoLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Zomato">
      <text x="0" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" fontStyle="italic" letterSpacing="-0.5">
        zomato
      </text>
    </svg>
  );
}

export function BoschLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Bosch">
      <circle cx="12" cy="13" r="10" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path d="M7 13h10M12 8v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <text x="28" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="900" letterSpacing="1.8">
        BOSCH
      </text>
    </svg>
  );
}

export function LorealLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 115 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="L'Oréal">
      <text x="0" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" letterSpacing="3">
        L’ORÉAL
      </text>
    </svg>
  );
}

export function VegaLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Vega">
      <text x="0" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="19" fontWeight="900" letterSpacing="3.5">
        VEGA
      </text>
    </svg>
  );
}

export function DellLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 85 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Dell">
      {/* DELL with iconic tilted E */}
      <text x="0" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="21" fontWeight="900" letterSpacing="1.5">
        D
      </text>
      <g transform="translate(18, 5) rotate(-22 8 8)">
        <text x="0" y="14" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="900">
          E
        </text>
      </g>
      <text x="36" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="21" fontWeight="900" letterSpacing="1.5">
        LL
      </text>
    </svg>
  );
}

export function ClientLogosBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center text-zinc-950 opacity-90 ${className}`}>
      <div className="flex-1 flex items-center justify-center py-5 px-3 border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
        <ZomatoLogo className="h-4 sm:h-5 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center py-5 px-3 border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
        <BoschLogo className="h-4 sm:h-5 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center py-5 px-3 border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
        <LorealLogo className="h-3.5 sm:h-4 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center py-5 px-3 border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
        <VegaLogo className="h-3.5 sm:h-4 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center py-5 px-3 border-r border-zinc-200/90 hover:opacity-100 transition-opacity">
        <DellLogo className="h-4 sm:h-5 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center py-5 px-3 hover:opacity-100 transition-opacity">
        <LorealLogo className="h-3.5 sm:h-4 w-auto" />
      </div>
    </div>
  );
}
