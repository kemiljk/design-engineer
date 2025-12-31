"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "iconoir-react";

export function TypographicShowcaseDemo() {
  return (
    <figure className="not-prose my-8 overflow-hidden border border-neutral-200 dark:border-neutral-800">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Typographic Hierarchy in Action
        </h4>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          A live demonstration of scale, weight, and contrast working together
        </p>
      </div>

      {/* Showcase Canvas */}
      <div className="relative bg-neutral-950 p-6 md:p-8">
        {/* Background letterforms - cropped display type */}
        <div className="pointer-events-none absolute right-0 top-0 select-none overflow-hidden opacity-[0.08]">
          <span 
            className="block font-sans font-bold leading-none text-white"
            style={{ fontSize: "clamp(200px, 35vw, 400px)" }}
          >
            Ty
          </span>
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-8 select-none overflow-hidden opacity-[0.06]">
          <span 
            className="block font-sans font-bold leading-none text-white"
            style={{ fontSize: "clamp(250px, 40vw, 500px)" }}
          >
            pe
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="relative grid gap-6 md:grid-cols-12 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:col-span-7">
            {/* Hero headline with accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold leading-[0.95] tracking-tight text-white sm:text-4xl md:text-5xl">
                Balance And
                <br />
                Harmonies
                <br />
                Through{" "}
                <span className="text-[#ff4400]">Difference</span>
              </h2>
            </motion.div>

            {/* Bordered subheading */}
            <motion.div
              className="inline-block border border-neutral-600 px-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium leading-tight tracking-wide text-neutral-300 sm:text-base">
                The Relationship Of Colours
                <br />
                On And Off the Canvas
              </p>
            </motion.div>

            {/* Numbers with arrow */}
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ArrowUpRight className="mt-2 h-10 w-10 shrink-0 text-neutral-400 sm:h-12 sm:w-12" strokeWidth={2.5} />
              <div className="font-sans text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                01234
                <br />
                56789
              </div>
            </motion.div>

            {/* Body text */}
            <motion.div
              className="max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-sm leading-relaxed text-neutral-400">
                I am an invisible man. No, I am not a spook like those who haunted 
                Edgar Allan Poe; nor am I one of your Hollywood-movie ectoplasms. I am a 
                man of substance, of flesh and bone, fiber and liquids—and I might even 
                be said to possess a mind.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-[#ff4400] px-6 py-3 text-sm font-semibold tracking-wide text-white">
                Sign Up
              </span>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:col-span-5">
            {/* Weight showcase */}
            <motion.div
              className="border border-neutral-700 bg-[#ff4400] p-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="space-y-1 text-lg font-bold leading-tight text-neutral-950 sm:text-xl">
                <p className="tracking-widest uppercase">Equalising</p>
                <p className="font-normal italic">Experiment</p>
                <p className="tracking-widest uppercase">Difference</p>
                <p className="font-normal">Documenter</p>
              </div>
            </motion.div>

            {/* Large A letterform */}
            <motion.div
              className="flex items-center justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <span className="font-sans text-8xl font-bold leading-none text-neutral-800 sm:text-9xl">
                A
              </span>
            </motion.div>

            {/* Serif sample in box */}
            <motion.div
              className="border border-neutral-700 p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-sm leading-relaxed text-neutral-400 italic">
                The wizard quickly jinxed the gnomes before they vaporised.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex-1 border-t border-neutral-700 pt-3">
                <p className="font-mono text-2xl font-bold text-white sm:text-3xl">40–60</p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Headline px</p>
              </div>
              <div className="flex-1 border-t border-neutral-700 pt-3">
                <p className="font-mono text-2xl font-bold text-white sm:text-3xl">16–20</p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">Body px</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row - Type classifications */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 border-t border-neutral-800 pt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="rounded-none bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
            Sans-Serif
          </span>
          <span className="rounded-none border border-neutral-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Serif
          </span>
          <span className="rounded-none border border-neutral-700 px-3 py-1 font-mono text-xs tracking-wider text-neutral-400">
            Monospace
          </span>
          <span className="rounded-none border border-[#ff4400] bg-[#ff4400]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#ff4400]">
            Accent
          </span>
        </motion.div>
      </div>

      {/* Footer insight */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          <strong className="text-neutral-700 dark:text-neutral-300">Notice the hierarchy:</strong>{" "}
          Size creates levels, weight adds emphasis, colour draws attention to key elements, 
          and spacing groups related content. All working together.
        </p>
      </div>
    </figure>
  );
}

