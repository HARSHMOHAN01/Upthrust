import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  withText?: boolean;
}

export function UpthrustLogo({
  className = "h-7 w-auto",
  variant = "dark",
  withText = true,
}: LogoProps) {
  const isLight = variant === "light";
  const textColor = isLight ? "#FFFFFF" : "#0A0A0A";
  const iconColor = "#FF4500"; // Brand flame orange

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Upthrust Geometric Symbol */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M14 2L24.3923 8V20L14 26L3.6077 20V8L14 2Z"
          fill={iconColor}
          fillOpacity="0.12"
          stroke={iconColor}
          strokeWidth="1.5"
        />
        <path
          d="M14 6L20.9282 10V18L14 22L7.0718 18V10L14 6Z"
          fill={iconColor}
        />
        <path
          d="M14 11L17.5 13V17L14 19L10.5 17V13L14 11Z"
          fill={isLight ? "#0A0A0A" : "#FFFFFF"}
        />
      </svg>

      {withText && (
        <span
          className="font-extrabold tracking-tighter text-xl uppercase transition-colors"
          style={{ color: textColor, fontFamily: "var(--font-syne)" }}
        >
          Upthrust
        </span>
      )}
    </div>
  );
}
