"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layout, 
  Code2, 
  Sparkles, 
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SkillCategory {
  name: string;
  skills: string[];
  maxScore: number;
}

interface SelfAssessmentExercise {
  id: string;
  type: "self-assessment";
  title: string;
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  categories: SkillCategory[];
}

const RATING_LABELS = [
  { value: 0, label: "Complete beginner" },
  { value: 1, label: "Basic familiarity" },
  { value: 2, label: "Intermediate" },
  { value: 3, label: "Advanced" },
];

interface SelfAssessmentProps {
  exercise: SelfAssessmentExercise;
}

type Scores = Record<string, Record<string, number>>;

export function SelfAssessment({ exercise }: SelfAssessmentProps) {
  const [scores, setScores] = useState<Scores>(() => {
    const initial: Scores = {};
    exercise.categories.forEach((cat) => {
      initial[cat.name] = {};
      cat.skills.forEach((skill) => {
        initial[cat.name][skill] = -1; // -1 means not rated yet
      });
    });
    return initial;
  });
  
  const [showResults, setShowResults] = useState(false);

  const updateScore = (category: string, skill: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [skill]: value,
      },
    }));
  };

  const categoryTotals = useMemo(() => {
    const totals: Record<string, { score: number; max: number; answered: number; total: number }> = {};
    
    exercise.categories.forEach((cat) => {
      const skillScores = Object.values(scores[cat.name] || {});
      const answered = skillScores.filter((s) => s >= 0).length;
      const score = skillScores.filter((s) => s >= 0).reduce((a, b) => a + b, 0);
      
      totals[cat.name] = {
        score,
        max: cat.maxScore,
        answered,
        total: cat.skills.length,
      };
    });
    
    return totals;
  }, [scores, exercise.categories]);

  const allAnswered = useMemo(() => {
    return exercise.categories.every((cat) =>
      cat.skills.every((skill) => scores[cat.name][skill] >= 0)
    );
  }, [scores, exercise.categories]);

  const recommendation = useMemo(() => {
    if (!allAnswered) return null;

    const design = categoryTotals["Design Skills"];
    const engineering = categoryTotals["Engineering Skills"];
    const bridge = categoryTotals["Bridge Skills"];

    const designPercent = design.score / design.max;
    const engineeringPercent = engineering.score / engineering.max;
    const bridgePercent = bridge.score / bridge.max;

    // Determine primary recommendation
    let track: "design" | "engineering" | "convergence" | "balanced";
    let confidence: "high" | "medium" | "low";
    let reasoning: string;

    const diff = Math.abs(designPercent - engineeringPercent);
    
    // Check if ready for Convergence (strong in both design AND engineering)
    const strongInBoth = designPercent >= 0.6 && engineeringPercent >= 0.6;
    const readyForConvergence = designPercent > 0.5 && engineeringPercent > 0.5;

    if (strongInBoth) {
      // Recommend Convergence for people strong in both
      track = "convergence";
      confidence = (designPercent >= 0.7 && engineeringPercent >= 0.7) ? "high" : "medium";
      reasoning = "You have solid foundations in both design and engineering.";
    } else if (diff < 0.15) {
      track = "balanced";
      confidence = "medium";
      reasoning = "Your design and engineering skills are fairly balanced.";
    } else if (engineeringPercent > designPercent) {
      track = "design";
      confidence = diff > 0.3 ? "high" : "medium";
      reasoning = "Your engineering skills are stronger than your design skills.";
    } else {
      track = "engineering";
      confidence = diff > 0.3 ? "high" : "medium";
      reasoning = "Your design skills are stronger than your engineering skills.";
    }

    return {
      track,
      confidence,
      reasoning,
      designPercent,
      engineeringPercent,
      bridgePercent,
      readyForConvergence,
    };
  }, [categoryTotals, allAnswered]);

  const resetAssessment = () => {
    const initial: Scores = {};
    exercise.categories.forEach((cat) => {
      initial[cat.name] = {};
      cat.skills.forEach((skill) => {
        initial[cat.name][skill] = -1;
      });
    });
    setScores(initial);
    setShowResults(false);
    // Clear saved recommendation
    localStorage.removeItem("course-recommendation");
  };

  // Save recommendation to localStorage when results are shown
  useEffect(() => {
    if (showResults && recommendation) {
      localStorage.setItem(
        "course-recommendation",
        JSON.stringify({
          track: recommendation.track,
          timestamp: Date.now(),
        })
      );
    }
  }, [showResults, recommendation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 overflow-hidden border-2 border-neutral-900 bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-900 bg-neutral-900 px-4 py-3 dark:border-neutral-100 dark:bg-neutral-100">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-5 w-5 text-white dark:text-neutral-900" />
          <span className="font-semibold text-white dark:text-neutral-900">{exercise.title}</span>
        </div>
        <span className="rounded-full bg-neutral-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-neutral-400">
          {exercise.difficulty}
        </span>
      </div>

      {/* Description */}
      {exercise.description && (
        <div className="border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{exercise.description}</p>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Rating Scale Legend */}
        <div className="flex flex-wrap gap-4 rounded bg-neutral-50 p-4 text-sm dark:bg-neutral-800/50">
          {RATING_LABELS.map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-neutral-200 font-mono text-xs font-bold dark:bg-neutral-700">
                {value}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        {exercise.categories.map((category) => (
          <div key={category.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{category.name}</h3>
              <div className="text-sm text-neutral-500">
                {categoryTotals[category.name].answered} / {categoryTotals[category.name].total} rated
                {categoryTotals[category.name].answered > 0 && (
                  <span className="ml-2 font-medium text-neutral-900 dark:text-white">
                    ({categoryTotals[category.name].score} / {category.maxScore})
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex flex-col gap-3 rounded border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm">{skill}</span>
                  <div className="flex gap-2">
                    {RATING_LABELS.map(({ value }) => (
                      <button
                        key={value}
                        onClick={() => updateScore(category.name, skill, value)}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded border-2 font-mono text-sm font-bold transition-all",
                          scores[category.name][skill] === value
                            ? "border-swiss-red bg-swiss-red text-white"
                            : "border-neutral-200 bg-neutral-50 hover:border-swiss-red/50 dark:border-neutral-600 dark:bg-neutral-700"
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Category Progress Bar */}
            {categoryTotals[category.name].answered > 0 && (
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <motion.div
                  className="h-full bg-swiss-red"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(categoryTotals[category.name].score / category.maxScore) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Show Results Button */}
        <div className="flex justify-center pt-4">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={cn(
                "flex items-center gap-2 px-6 py-3 font-medium transition-all",
                allAnswered
                  ? "bg-swiss-red text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
                  : "cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
              )}
            >
              {allAnswered ? (
                <>
                  See Your Recommendation
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Rate all skills to see results
                  <span className="text-xs">
                    ({Object.values(categoryTotals).reduce((a, b) => a + b.answered, 0)} /{" "}
                    {Object.values(categoryTotals).reduce((a, b) => a + b.total, 0)})
                  </span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={resetAssessment}
              className="flex items-center gap-2 border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Assessment
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 rounded border-2 border-swiss-red bg-swiss-red/5 p-6"
            >
              <h3 className="text-xl font-bold">Your Results</h3>

              {/* Score Summary */}
              <div className="grid gap-4 sm:grid-cols-3">
                <ScoreCard
                  label="Design Skills"
                  score={categoryTotals["Design Skills"].score}
                  max={categoryTotals["Design Skills"].max}
                  percent={recommendation.designPercent}
                />
                <ScoreCard
                  label="Engineering Skills"
                  score={categoryTotals["Engineering Skills"].score}
                  max={categoryTotals["Engineering Skills"].max}
                  percent={recommendation.engineeringPercent}
                />
                <ScoreCard
                  label="Bridge Skills"
                  score={categoryTotals["Bridge Skills"].score}
                  max={categoryTotals["Bridge Skills"].max}
                  percent={recommendation.bridgePercent}
                />
              </div>

              {/* Recommendation */}
              <div className="rounded bg-white p-6 dark:bg-neutral-800">
                <div className="mb-4 flex items-center gap-3">
                  {recommendation.track === "design" && (
                    <div className="flex h-12 w-12 items-center justify-center bg-swiss-red/10">
                      <Layout className="h-6 w-6 text-swiss-red" />
                    </div>
                  )}
                  {recommendation.track === "engineering" && (
                    <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-700">
                      <Code2 className="h-6 w-6" />
                    </div>
                  )}
                  {recommendation.track === "convergence" && (
                    <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-swiss-red/20 to-neutral-200 dark:to-neutral-700">
                      <Sparkles className="h-6 w-6 text-swiss-red" />
                    </div>
                  )}
                  {recommendation.track === "balanced" && (
                    <div className="flex h-12 w-12 items-center justify-center bg-neutral-100 dark:bg-neutral-700">
                      <Sparkles className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-neutral-500">Recommended Track</p>
                    <h4 className="text-lg font-bold">
                      {recommendation.track === "design" && "Design Track"}
                      {recommendation.track === "engineering" && "Engineering Track"}
                      {recommendation.track === "convergence" && "Convergence Track"}
                      {recommendation.track === "balanced" && "Your Choice!"}
                    </h4>
                  </div>
                  <span
                    className={cn(
                      "ml-auto rounded px-2 py-1 text-xs font-medium",
                      recommendation.confidence === "high"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    )}
                  >
                    {recommendation.confidence === "high" ? "Strong match" : "Moderate match"}
                  </span>
                </div>

                <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                  {recommendation.reasoning}{" "}
                  {recommendation.track === "design" && (
                    <>
                      The <strong>Design Track</strong> will help you develop visual design 
                      principles, typography, color theory, and design systems.
                    </>
                  )}
                  {recommendation.track === "engineering" && (
                    <>
                      The <strong>Engineering Track</strong> will teach you to build 
                      interfaces with HTML, CSS, and JavaScript (or Swift/Kotlin for mobile).
                    </>
                  )}
                  {recommendation.track === "convergence" && (
                    <>
                      The <strong>Convergence Track</strong> is where design meets code—covering 
                      motion, prototyping, accessibility, performance, and the complete Design Engineer workflow. 
                      You can dive right in or do a quick review of fundamentals first.
                    </>
                  )}
                  {recommendation.track === "balanced" && (
                    <>
                      Since your skills are balanced, pick based on what excites you more, 
                      or start with <strong>Engineering</strong> if truly undecided—it&apos;s 
                      easier to validate progress.
                    </>
                  )}
                </p>

                {recommendation.readyForConvergence && recommendation.track !== "convergence" && (
                  <div className="mb-4 flex items-start gap-2 rounded bg-green-50 p-3 text-sm dark:bg-green-900/20">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                    <p className="text-green-800 dark:text-green-200">
                      You could also consider the <strong>Convergence Track</strong> after 
                      a quick review of fundamentals.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {recommendation.track === "convergence" && (
                    <Link
                      href="/course/convergence"
                      className="group relative flex items-center gap-2 overflow-hidden px-4 py-2 text-sm font-medium text-white"
                      style={{
                        background: "linear-gradient(to right, #E53935, #171717, #E53935)",
                        backgroundSize: "200% 100%",
                        backgroundPosition: "0% 0%",
                        transition: "background-position 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundPosition = "100% 0%";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundPosition = "0% 0%";
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Start Convergence Track
                    </Link>
                  )}
                  {(recommendation.track === "design" || recommendation.track === "balanced" || recommendation.track === "convergence") && (
                    <Link
                      href="/course/design-track"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                        recommendation.track === "design"
                          ? "bg-swiss-red text-white hover:bg-neutral-900"
                          : "border border-neutral-200 hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700"
                      )}
                    >
                      <Layout className="h-4 w-4" />
                      {recommendation.track === "design" ? "Start Design Track" : "Design Track"}
                    </Link>
                  )}
                  {(recommendation.track === "engineering" || recommendation.track === "balanced" || recommendation.track === "convergence") && (
                    <Link
                      href="/course/engineering-track"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
                        recommendation.track === "engineering"
                          ? "bg-neutral-900 text-white hover:bg-swiss-red dark:bg-white dark:text-black dark:hover:bg-swiss-red dark:hover:text-white"
                          : "border border-neutral-200 hover:border-swiss-red hover:text-swiss-red dark:border-neutral-700"
                      )}
                    >
                      <Code2 className="h-4 w-4" />
                      {recommendation.track === "engineering" ? "Start Engineering Track" : "Engineering Track"}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ScoreCard({
  label,
  score,
  max,
  percent,
}: {
  label: string;
  score: number;
  max: number;
  percent: number;
}) {
  return (
    <div className="rounded bg-white p-4 text-center dark:bg-neutral-800">
      <p className="mb-1 text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-bold">
        {score} <span className="text-sm font-normal text-neutral-400">/ {max}</span>
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className="h-full bg-swiss-red transition-all"
          style={{ width: `${percent * 100}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-neutral-400">{Math.round(percent * 100)}%</p>
    </div>
  );
}
