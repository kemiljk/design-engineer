"use client";

import { motion, useReducedMotion } from "motion/react";

const COLORS = {
  primary: "var(--illustration-primary, #ff4400)",
  fg: "var(--color-fg, #000000)",
  muted: "var(--color-muted, #a8a8a8)",
  light: "var(--color-light, #d4d4d4)",
  bg: "var(--color-bg, #ffffff)",
};

const drawEase: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

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
          <motion.g
            animate={prefersReducedMotion ? {} : { scale: [1, 0.96, 0.96, 1, 1] }}
            transition={{
              duration: 4,
              times: [0, 0.1, 0.35, 0.45, 1],
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ originX: "100px", originY: "192px" }}
          >
            <motion.rect
              x="60"
              y="180"
              width="80"
              height="24"
              fill={COLORS.primary}
              animate={prefersReducedMotion ? {} : { filter: ["brightness(1)", "brightness(0.9)", "brightness(0.9)", "brightness(1)", "brightness(1)"] }}
              transition={{
                duration: 4,
                times: [0, 0.1, 0.35, 0.45, 1],
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
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
          </motion.g>
        </g>

        {/* Bridge/intersection - center */}
        <g>
          {/* Animated connection lines - draw on load and repeat */}
          <motion.path
            d="M 160 140 C 200 140, 200 140, 240 100"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 4, times: [0, 0.3, 0.9, 1], repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
          <motion.path
            d="M 160 160 C 200 160, 200 160, 240 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
            transition={{ duration: 4, times: [0, 0.3, 0.9, 1], repeat: Infinity, ease: "easeInOut", repeatDelay: 1, delay: 0.2 }}
          />
          <motion.path
            d="M 160 180 C 200 180, 200 180, 240 220"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="2"
            initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 4, times: [0, 0.3, 0.9, 1], repeat: Infinity, ease: "easeInOut", repeatDelay: 1, delay: 0.4 }}
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

          {/* Center pulses - replacing rotating dots with ripples */}
          <motion.circle
            cx="200"
            cy="160"
            r="24"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={prefersReducedMotion ? {} : { scale: 1.4, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="200"
            cy="160"
            r="24"
            fill="none"
            stroke={COLORS.primary}
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={prefersReducedMotion ? {} : { scale: 1.4, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />

          {/* Center dot - strong pulse */}
          <motion.circle
            cx="200"
            cy="160"
            r="8"
            fill={COLORS.primary}
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
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

          {/* Code lines - pulsing */}
          <motion.rect
            x="252"
            y="92"
            width="48"
            height="6"
            fill={COLORS.primary}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 0.4, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.rect
            x="260"
            y="106"
            width="72"
            height="6"
            fill="currentColor"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.rect
            x="260"
            y="120"
            width="56"
            height="6"
            fill="currentColor"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          />
          <motion.rect
            x="260"
            y="134"
            width="64"
            height="6"
            fill={COLORS.muted}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.rect
            x="252"
            y="148"
            width="40"
            height="6"
            fill={COLORS.primary}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 0.4, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <motion.rect
            x="260"
            y="162"
            width="80"
            height="6"
            fill="currentColor"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.rect
            x="260"
            y="176"
            width="48"
            height="6"
            fill="currentColor"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          />
          <motion.rect
            x="252"
            y="190"
            width="32"
            height="6"
            fill={COLORS.primary}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 0.4, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </g>

        {/* Floating elements - decorative */}
        <g opacity="0.6">
          {/* Top floating shapes - gentle drift */}
          <motion.g
            animate={prefersReducedMotion ? {} : { y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
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
          </motion.g>

          <motion.g
            animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <circle
              cx="320"
              cy="50"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </motion.g>

          {/* Bottom floating shapes - gentle drift */}
          <motion.g
            animate={prefersReducedMotion ? {} : { y: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <rect
              x="80"
              y="250"
              width="12"
              height="12"
              fill={COLORS.primary}
              opacity="0.5"
              transform="rotate(-10, 86, 256)"
            />
          </motion.g>

          <motion.g
            animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <circle cx="300" cy="270" r="6" fill="currentColor" opacity="0.3" />
          </motion.g>
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
