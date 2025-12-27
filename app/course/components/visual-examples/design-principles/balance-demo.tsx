"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";

type BalanceType = "symmetrical" | "asymmetrical" | "unbalanced";

export function BalanceDemo() {
  const [balanceType, setBalanceType] = useState<BalanceType>("symmetrical");

  const getLayoutStyles = () => {
    switch (balanceType) {
      case "symmetrical":
        return {
          leftBox: { width: 120, height: 80 },
          rightBox: { width: 120, height: 80 },
          leftColor: "bg-neutral-800 dark:bg-neutral-200",
          rightColor: "bg-neutral-800 dark:bg-neutral-200",
          justify: "justify-around",
        };
      case "asymmetrical":
        return {
          leftBox: { width: 160, height: 120 },
          rightBox: { width: 80, height: 60 },
          leftColor: "bg-neutral-800 dark:bg-neutral-200",
          rightColor: "bg-neutral-500 dark:bg-neutral-400",
          justify: "justify-between",
        };
      case "unbalanced":
        return {
          leftBox: { width: 180, height: 120 },
          rightBox: { width: 40, height: 30 },
          leftColor: "bg-neutral-800 dark:bg-neutral-200",
          rightColor: "bg-neutral-300 dark:bg-neutral-600",
          justify: "justify-start gap-12",
        };
    }
  };

  const styles = getLayoutStyles();

  return (
    <ExampleWrapper
      title="Visual Balance"
      description="See how different balance types create different feelings"
      controls={
        <ControlGroup label="Balance">
          <ControlButton
            active={balanceType === "symmetrical"}
            onClick={() => setBalanceType("symmetrical")}
          >
            Symmetrical
          </ControlButton>
          <ControlButton
            active={balanceType === "asymmetrical"}
            onClick={() => setBalanceType("asymmetrical")}
          >
            Asymmetrical
          </ControlButton>
          <ControlButton
            active={balanceType === "unbalanced"}
            onClick={() => setBalanceType("unbalanced")}
          >
            Unbalanced
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="relative">
        {/* Balance beam visual */}
        <div className="relative mx-auto h-48 w-full max-w-md">
          {/* Fulcrum */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="h-0 w-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-neutral-400 dark:border-b-neutral-600" />
          </div>
          
          {/* Beam */}
          <motion.div
            className="absolute bottom-[28px] left-0 right-0 mx-auto h-2 w-[90%] origin-center rounded-full bg-neutral-300 dark:bg-neutral-600"
            animate={{
              rotate: balanceType === "unbalanced" ? -8 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Elements on the beam */}
            <motion.div
              className={`absolute -top-[4px] rounded ${styles.leftColor}`}
              style={{ left: "10%" }}
              animate={{
                width: styles.leftBox.width,
                height: styles.leftBox.height,
                y: -styles.leftBox.height,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            <motion.div
              className={`absolute -top-[4px] rounded ${styles.rightColor}`}
              style={{ right: "10%" }}
              animate={{
                width: styles.rightBox.width,
                height: styles.rightBox.height,
                y: -styles.rightBox.height,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </motion.div>
        </div>

        {/* Description */}
        <div className="mt-4 text-center">
          {balanceType === "symmetrical" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <strong>Symmetrical:</strong> Mirror-image elements feel formal, stable, and traditional
            </p>
          )}
          {balanceType === "asymmetrical" && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <strong>Asymmetrical:</strong> Different elements balance through visual weight—feels dynamic and modern
            </p>
          )}
          {balanceType === "unbalanced" && (
            <p className="text-sm text-[#ff4400]">
              <strong>Unbalanced:</strong> Visual weight concentrated on one side creates tension (sometimes intentional)
            </p>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}
