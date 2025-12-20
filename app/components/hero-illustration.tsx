"use client";

const COLORS = {
  primary: "var(--swiss-red, #ff0000)",
  fg: "var(--color-fg, #000000)",
  muted: "var(--color-muted, #a8a8a8)",
  light: "var(--color-light, #d4d4d4)",
  bg: "var(--color-bg, #ffffff)",
};

export function HeroIllustration() {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Background grid - subtle */}
        <defs>
          <pattern
            id="heroGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={COLORS.muted}
              strokeWidth="0.5"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#heroGrid)" />

        {/* Design side - left */}
        <g>
          {/* Figma-like frame */}
          <rect
            x="40"
            y="60"
            width="120"
            height="160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.3"
          />

          {/* Typography specimen */}
          <text
            x="60"
            y="100"
            fontSize="28"
            fontWeight="700"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Aa
          </text>

          {/* Color swatches */}
          <rect x="60" y="120" width="20" height="20" fill={COLORS.primary} />
          <rect x="84" y="120" width="20" height="20" fill="currentColor" />
          <rect x="108" y="120" width="20" height="20" fill={COLORS.muted} />

          {/* Spacing guide lines */}
          <line
            x1="60"
            y1="156"
            x2="128"
            y2="156"
            stroke={COLORS.primary}
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="156"
            x2="60"
            y2="152"
            stroke={COLORS.primary}
            strokeWidth="1"
          />
          <line
            x1="128"
            y1="156"
            x2="128"
            y2="152"
            stroke={COLORS.primary}
            strokeWidth="1"
          />
          <text
            x="94"
            y="168"
            fontSize="8"
            fill={COLORS.muted}
            textAnchor="middle"
            fontFamily="monospace"
          >
            8px
          </text>

          {/* Component box */}
          <rect
            x="60"
            y="180"
            width="80"
            height="24"
            rx="4"
            fill={COLORS.primary}
          />
          <text
            x="100"
            y="196"
            fontSize="10"
            fill="white"
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="600"
          >
            Button
          </text>
        </g>

        {/* Bridge/intersection - center */}
        <g>
          {/* Flowing connection lines */}
          <path
            d="M 160 140 C 200 140, 200 140, 240 100"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="M 160 160 C 200 160, 200 160, 240 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
          <path
            d="M 160 180 C 200 180, 200 180, 240 220"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Center intersection point */}
          <circle
            cx="200"
            cy="160"
            r="24"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="2"
          />
          <circle cx="200" cy="160" r="8" fill={COLORS.primary} />

          {/* Orbit dots */}
          <circle cx="200" cy="136" r="3" fill="currentColor" />
          <circle cx="224" cy="160" r="3" fill="currentColor" />
          <circle cx="200" cy="184" r="3" fill="currentColor" />
          <circle cx="176" cy="160" r="3" fill="currentColor" />
        </g>

        {/* Engineering side - right */}
        <g>
          {/* Code editor frame */}
          <rect
            x="240"
            y="60"
            width="120"
            height="160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Editor title bar dots */}
          <circle cx="252" cy="72" r="4" fill={COLORS.primary} opacity="0.8" />
          <circle cx="264" cy="72" r="4" fill={COLORS.muted} opacity="0.5" />
          <circle cx="276" cy="72" r="4" fill={COLORS.muted} opacity="0.5" />

          {/* Code lines */}
          <rect
            x="252"
            y="92"
            width="48"
            height="6"
            rx="1"
            fill={COLORS.primary}
            opacity="0.7"
          />
          <rect
            x="260"
            y="106"
            width="72"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="260"
            y="120"
            width="56"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="260"
            y="134"
            width="64"
            height="6"
            rx="1"
            fill={COLORS.muted}
            opacity="0.3"
          />
          <rect
            x="252"
            y="148"
            width="40"
            height="6"
            rx="1"
            fill={COLORS.primary}
            opacity="0.7"
          />
          <rect
            x="260"
            y="162"
            width="80"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="260"
            y="176"
            width="48"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="252"
            y="190"
            width="32"
            height="6"
            rx="1"
            fill={COLORS.primary}
            opacity="0.7"
          />
        </g>

        {/* Floating elements - decorative */}
        <g opacity="0.6">
          {/* Top floating shapes */}
          <rect
            x="180"
            y="30"
            width="16"
            height="16"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="1.5"
            transform="rotate(15, 188, 38)"
          />

          <circle
            cx="320"
            cy="50"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Bottom floating shapes */}
          <rect
            x="80"
            y="250"
            width="12"
            height="12"
            fill={COLORS.primary}
            opacity="0.5"
            transform="rotate(-10, 86, 256)"
          />

          <circle cx="300" cy="270" r="6" fill="currentColor" opacity="0.3" />
        </g>

        {/* Labels */}
        <text
          x="100"
          y="245"
          fontSize="10"
          fill={COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="500"
          letterSpacing="0.1em"
        >
          DESIGN
        </text>
        <text
          x="300"
          y="245"
          fontSize="10"
          fill={COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="500"
          letterSpacing="0.1em"
        >
          ENGINEERING
        </text>

        {/* Connecting underlines */}
        <line
          x1="70"
          y1="252"
          x2="130"
          y2="252"
          stroke={COLORS.light}
          strokeWidth="1"
        />
        <line
          x1="255"
          y1="252"
          x2="345"
          y2="252"
          stroke={COLORS.light}
          strokeWidth="1"
        />

        {/* Center label */}
        <text
          x="200"
          y="290"
          fontSize="9"
          fill={COLORS.primary}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          THE INTERSECTION
        </text>
      </svg>
    </div>
  );
}
