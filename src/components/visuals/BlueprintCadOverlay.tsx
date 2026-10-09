import React from "react";

// Pre-compute tick marks with 2 decimal places to prevent floating-point precision mismatches between Node.js SSR and client browsers.
const TICK_MARKS = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  return {
    x1: Number((200 + 175 * Math.cos(angle)).toFixed(2)),
    y1: Number((200 + 175 * Math.sin(angle)).toFixed(2)),
    x2: Number((200 + 185 * Math.cos(angle)).toFixed(2)),
    y2: Number((200 + 185 * Math.sin(angle)).toFixed(2)),
  };
});

export function BlueprintCadOverlay({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="180" stroke="#000000" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.25" />
      <circle cx="200" cy="200" r="140" stroke="#000000" strokeWidth="0.75" opacity="0.3" />
      <circle cx="200" cy="200" r="90" stroke="#000000" strokeWidth="1" strokeDasharray="6 4" opacity="0.35" />
      <circle cx="200" cy="200" r="40" stroke="#000000" strokeWidth="0.75" opacity="0.3" />
      
      {/* Crosshairs */}
      <line x1="20" y1="200" x2="380" y2="200" stroke="#000000" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      <line x1="200" y1="20" x2="200" y2="380" stroke="#000000" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Radial Angle Markers */}
      <line x1="73" y1="73" x2="327" y2="327" stroke="#000000" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
      <line x1="73" y1="327" x2="327" y2="73" stroke="#000000" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />

      {/* Technical Tick Marks */}
      {TICK_MARKS.map((tick, i) => (
        <line
          key={i}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="#000000"
          strokeWidth="0.75"
          opacity="0.35"
        />
      ))}

      {/* Technical Labels */}
      <text x="210" y="35" fill="#000000" opacity="0.35" fontSize="8" fontFamily="monospace">
        R180.00 // CAD-SPEC.01
      </text>
      <text x="210" y="85" fill="#000000" opacity="0.35" fontSize="8" fontFamily="monospace">
        SEC-A · 45.0°
      </text>
    </svg>
  );
}
