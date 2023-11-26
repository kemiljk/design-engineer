"use client";

import { motion, useReducedMotion } from "framer-motion";

export const BlurShape = () => {
  const shouldReduceMotion = useReducedMotion();

  const animation = shouldReduceMotion
    ? {}
    : {
        animate: {
          x: ["0px", "10px", "-10px", "-5px", "0px"],
          y: ["0px", "5px", "-5px", "10px", "0px"],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
        },
      };

  return (
    <div className="relative grid h-[300px] w-[300px] place-items-center opacity-20 blur-xl lg:h-[750px] lg:w-[750px] lg:blur-3xl">
      <div className="relative h-full w-full">
        <motion.div
          {...animation}
          className={
            "absolute left-0 top-0 h-48 w-48 rounded-full bg-lime-400 md:h-96 md:w-96"
          }
        />
        <motion.div
          {...animation}
          className={
            "absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400 md:h-96 md:w-96"
          }
        />
        <motion.div
          {...animation}
          className={
            "absolute bottom-0 left-0 right-0 mx-auto h-48 w-48 rounded-full bg-indigo-400 md:h-96 md:w-96"
          }
        />
      </div>
    </div>
  );
};
