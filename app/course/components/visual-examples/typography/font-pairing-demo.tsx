"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { Check, Minus } from "lucide-react";

type PairingApproach = "classic" | "same-family" | "superfamily" | "inverse";

interface FontPairing {
  id: PairingApproach;
  name: string;
  description: string;
  heading: { name: string; family: string; weight: number };
  body: { name: string; family: string; weight: number };
  mono?: { name: string; family: string; weight: number };
  why: string;
  pros: string[];
  cons: string[];
}

const pairings: FontPairing[] = [
  {
    id: "classic",
    name: "Classic Contrast",
    description: "Serif heading + Sans body",
    heading: { name: "Playfair Display", family: "'Playfair Display', serif", weight: 700 },
    body: { name: "Source Sans 3", family: "'Source Sans 3', sans-serif", weight: 400 },
    why: "High contrast between decorative serifs and clean sans-serif creates clear hierarchy whilst maintaining readability for longer text.",
    pros: ["Strong visual contrast", "Clear hierarchy", "Elegant feel"],
    cons: ["Requires careful sizing", "Two font loads"],
  },
  {
    id: "same-family",
    name: "Same Family",
    description: "Roboto + Roboto Slab",
    heading: { name: "Roboto Slab", family: "'Roboto Slab', serif", weight: 700 },
    body: { name: "Roboto", family: "'Roboto', sans-serif", weight: 400 },
    why: "Fonts designed together share proportions, x-height, and stroke weights—they're guaranteed to harmonise.",
    pros: ["Perfect harmony", "Consistent proportions", "Safe choice"],
    cons: ["Less visual contrast", "Can feel samey"],
  },
  {
    id: "superfamily",
    name: "Superfamily",
    description: "Source Sans + Serif + Code",
    heading: { name: "Source Serif 4", family: "'Source Serif 4', serif", weight: 700 },
    body: { name: "Source Sans 3", family: "'Source Sans 3', sans-serif", weight: 400 },
    mono: { name: "Source Code Pro", family: "'Source Code Pro', monospace", weight: 400 },
    why: "Three related fonts covering all needs. Adobe's Source family was designed for this exact purpose.",
    pros: ["Complete system", "Includes monospace", "Unified design"],
    cons: ["Three font loads", "Subtle contrast"],
  },
  {
    id: "inverse",
    name: "Inverse Classic",
    description: "Sans heading + Serif body",
    heading: { name: "Montserrat", family: "'Montserrat', sans-serif", weight: 700 },
    body: { name: "Merriweather", family: "'Merriweather', serif", weight: 400 },
    why: "Bold geometric sans for impact, traditional serif for comfortable long-form reading. Common in editorial design.",
    pros: ["Modern feel", "Great for articles", "Serif aids reading"],
    cons: ["Serif body needs more space", "Heavier files"],
  },
];

const googleFontsUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@400;600;700&family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@400;700&family=Source+Serif+4:wght@400;700&family=Source+Code+Pro:wght@400;500&family=Montserrat:wght@400;600;700&family=Merriweather:wght@400;700&display=swap";

export function FontPairingDemo() {
  const [selectedPairing, setSelectedPairing] = useState<PairingApproach>("classic");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const pairing = pairings.find(p => p.id === selectedPairing)!;

  useEffect(() => {
    const existingLink = document.querySelector(`link[href*="fonts.googleapis.com"]`);
    if (!existingLink) {
      const link = document.createElement("link");
      link.href = googleFontsUrl;
      link.rel = "stylesheet";
      link.onload = () => setFontsLoaded(true);
      document.head.appendChild(link);
    } else {
      setFontsLoaded(true);
    }
  }, []);

  return (
    <ExampleWrapper
      title="Font Pairing Examples"
      description="See how different pairing approaches look in practice"
      controls={
        <ControlGroup label="Approach">
          {pairings.map((p) => (
            <ControlButton
              key={p.id}
              active={selectedPairing === p.id}
              onClick={() => setSelectedPairing(p.id)}
            >
              {p.name}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Font Specimens */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            The Fonts
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={pairing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Heading Font */}
              <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                    Heading
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    {pairing.heading.name}
                  </span>
                </div>
                <p
                  className="text-2xl text-neutral-900 dark:text-white"
                  style={{
                    fontFamily: fontsLoaded ? pairing.heading.family : "inherit",
                    fontWeight: pairing.heading.weight,
                    lineHeight: 1.2,
                  }}
                >
                  The Quick Brown Fox
                </p>
                <p
                  className="mt-2 break-all text-xs leading-relaxed text-neutral-500"
                  style={{
                    fontFamily: fontsLoaded ? pairing.heading.family : "inherit",
                    fontWeight: 400,
                  }}
                >
                  AaBbCcDdEeFfGgHhIiJjKkLlMmNnOo
                </p>
              </div>

              {/* Body Font */}
              <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                    Body
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    {pairing.body.name}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
                  style={{
                    fontFamily: fontsLoaded ? pairing.body.family : "inherit",
                    fontWeight: pairing.body.weight,
                  }}
                >
                  Typography is the art and technique of arranging type to make written 
                  language legible, readable, and appealing.
                </p>
              </div>

              {/* Mono Font (if present) */}
              {pairing.mono && (
                <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      Code
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {pairing.mono.name}
                    </span>
                  </div>
                  <p
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                    style={{
                      fontFamily: fontsLoaded ? pairing.mono.family : "inherit",
                      fontWeight: pairing.mono.weight,
                    }}
                  >
                    const greeting = &quot;Hello&quot;;
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* In Context */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            In Context
          </p>
          
          <AnimatePresence mode="wait">
            <motion.article
              key={pairing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#ff4400]"
                style={{
                  fontFamily: fontsLoaded ? pairing.body.family : "inherit",
                }}
              >
                Design Engineering
              </p>
              <h3
                className="mb-3 text-xl text-neutral-900 dark:text-white"
                style={{
                  fontFamily: fontsLoaded ? pairing.heading.family : "inherit",
                  fontWeight: pairing.heading.weight,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Creating Effective Type Hierarchies
              </h3>
              <p
                className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                style={{
                  fontFamily: fontsLoaded ? pairing.body.family : "inherit",
                  fontWeight: pairing.body.weight,
                }}
              >
                Good typography guides the reader through content naturally. The eye 
                should flow from headlines to body text without friction.
              </p>
              {pairing.mono && (
                <pre
                  className="overflow-x-auto bg-neutral-100 p-3 text-xs dark:bg-neutral-800"
                  style={{
                    fontFamily: fontsLoaded ? pairing.mono.family : "monospace",
                  }}
                >
                  <code>font-family: &quot;{pairing.heading.name}&quot;;</code>
                </pre>
              )}
              <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span
                  className="text-xs text-neutral-400"
                  style={{
                    fontFamily: fontsLoaded ? pairing.body.family : "inherit",
                  }}
                >
                  5 min read • Design Track
                </span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Why it works + Pros/Cons - neutral palette */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pairing.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mt-6 grid gap-4 sm:grid-cols-3"
        >
          {/* Why it works */}
          <div className="border-l-2 border-[#ff4400] bg-neutral-50 p-4 dark:bg-neutral-800/50">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#ff4400]">
              Why It Works
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {pairing.why}
            </p>
          </div>

          {/* Pros */}
          <div className="bg-neutral-50 p-4 dark:bg-neutral-800/50">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Strengths
            </p>
            <ul className="space-y-1.5">
              {pairing.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-neutral-50 p-4 dark:bg-neutral-800/50">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Considerations
            </p>
            <ul className="space-y-1.5">
              {pairing.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <Minus className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </ExampleWrapper>
  );
}

