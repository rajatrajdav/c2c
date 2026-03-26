// src/Components/Logo.jsx
// Drop this file in: src/Components/Logo.jsx
// Usage: import Logo from "../Components/Logo";
// Then use: <Logo size={32} /> or <Logo size={40} showText />

export default function Logo({ size = 32, showText = false, textClass = "" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {/* SVG Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Graduation cap top */}
        <rect x="4" y="6" width="40" height="40" rx="12" fill="url(#grad1)" />
        
        {/* Bridge / path arc */}
        <path
          d="M12 34 Q24 16 36 34"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Left pillar */}
        <line x1="12" y1="34" x2="12" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        {/* Right pillar */}
        <line x1="36" y1="34" x2="36" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

        {/* Cap top diamond */}
        <polygon
          points="24,8 32,13 24,18 16,13"
          fill="white"
          opacity="0.95"
        />
        {/* Cap brim line */}
        <line x1="14" y1="13" x2="34" y2="13" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        {/* Tassel */}
        <circle cx="34" cy="13" r="2" fill="white" opacity="0.8" />
        <line x1="34" y1="15" x2="34" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="32" y1="22" x2="36" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          className={textClass}
          style={{
            fontWeight: 900,
            letterSpacing: "-0.04em",
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Campus2Career
        </span>
      )}
    </span>
  );
}
