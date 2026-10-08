import React from "react";
import Image from "next/image";

export function StatueFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Iridescent Glow behind statue */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-purple-500/10 to-teal-400/20 rounded-full blur-2xl transform scale-90" />
      
      {/* Fallback image from the design asset */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/designs/3d elements.jpg"
          alt="Upthrust Classical Bust 3D Sculpture"
          width={420}
          height={420}
          priority
          className="object-contain object-bottom drop-shadow-2xl mix-blend-multiply opacity-95 transition-opacity duration-700"
          style={{ clipPath: "polygon(0 40%, 100% 40%, 100% 100%, 0 100%)" }}
        />
      </div>
    </div>
  );
}
