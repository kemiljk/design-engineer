"use client";

import { motion, useReducedMotion } from "motion/react";

export const BlurShape = () => {
  const prefersReducedMotion = useReducedMotion();

  const createAnimation = (
    xValues: string[],
    yValues: string[],
    duration: number
  ) => {
    if (prefersReducedMotion) return {};
    return {
      animate: { x: xValues, y: yValues },
      transition: { duration, ease: "easeInOut" as const, repeat: Infinity },
    };
  };

  const animation1 = createAnimation(
    ["0px", "25px", "-25px", "-50px", "0px"],
    ["0px", "50px", "-50px", "25px", "0px"],
    10
  );

  const animation2 = createAnimation(
    ["0px", "-25px", "25px", "50px", "0px"],
    ["0px", "-50px", "50px", "-25px", "0px"],
    11
  );

  const animation3 = createAnimation(
    ["0px", "50px", "-50px", "-25px", "0px"],
    ["0px", "25px", "-25px", "50px", "0px"],
    12
  );

  return (
    <div className="relative grid h-[300px] w-[300px] scale-150 place-items-center opacity-20 blur-xl md:h-[500px] md:w-[500px] lg:h-[750px] lg:w-[750px] lg:blur-3xl">
      <div className="relative h-full w-full">
        <motion.div
          {...animation1}
          className="absolute left-0 top-0 h-48 w-48 rounded-full bg-lime-400 md:h-72 md:w-72 lg:h-[32rem] lg:w-[32rem]"
        />
        <motion.div
          {...animation2}
          className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400 md:h-72 md:w-72 lg:h-[32rem] lg:w-[32rem]"
        />
        <motion.div
          {...animation3}
          className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-400 md:h-72 md:w-72 lg:h-[32rem] lg:w-[32rem]"
        />
      </div>
      <motion.div
        {...animation2}
        className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-400 md:h-72 md:w-72 lg:h-96 lg:w-96"
      />
    </div>
  );
};
