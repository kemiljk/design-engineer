"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  NavArrowLeft as ArrowLeft,
  NavArrowRight as ArrowRight,
  Refresh as RotateCw,
  FilterList,
  Check,
  Play,
} from "iconoir-react";
import type { FlashcardExercise } from "@/lib/flashcards";
import { MultipleChoice } from "@/app/course/components/exercises/multiple-choice";
import { SpotTheIssue } from "@/app/course/components/exercises/spot-the-issue";
import { FixTheCode } from "@/app/course/components/exercises/fix-the-code";
import { Button } from "@/app/components/ui";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/app/components/ui/modal";
import { cn } from "@/lib/utils";

interface FlashcardsClientProps {
  initialExercises: FlashcardExercise[];
}

type GameStatus = "playing" | "finished";

// Helper to extract metadata from lesson path
function getMetadataFromPath(lessonPath: string) {
  const parts = lessonPath.split("/");
  let track = "Other";
  let platform = "General";

  if (parts[0] === "design-track") track = "Design";
  else if (parts[0] === "engineering-track") track = "Engineering";
  else if (parts[0] === "convergence") track = "Convergence";
  else if (parts[0] === "00-introduction") track = "Introduction";

  if (parts.includes("web")) platform = "Web";
  else if (parts.includes("ios")) platform = "iOS";
  else if (parts.includes("android")) platform = "Android";

  return { track, platform };
}

export function FlashcardsClient({ initialExercises }: FlashcardsClientProps) {
  const [exercises, setExercises] = useState<FlashcardExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState<GameStatus>("playing");

  // Active Filters (applied to the game)
  const [activeTracks, setActiveTracks] = useState<string[]>([]);
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const [activeDifficulties, setActiveDifficulties] = useState<string[]>([]);

  // Pending Filters (modal state)
  const [pendingTracks, setPendingTracks] = useState<string[]>([]);
  const [pendingPlatforms, setPendingPlatforms] = useState<string[]>([]);
  const [pendingDifficulties, setPendingDifficulties] = useState<string[]>([]);

  // Initialize game on mount
  useEffect(() => {
    // Initial start with no filters
    startNewSession([], [], []);
  }, []);

  // Sync pending state with active state when modal opens
  useEffect(() => {
    if (isFilterOpen) {
      setPendingTracks(activeTracks);
      setPendingPlatforms(activePlatforms);
      setPendingDifficulties(activeDifficulties);
    }
  }, [isFilterOpen, activeTracks, activePlatforms, activeDifficulties]);

  // Computed available options from all exercises
  const options = useMemo(() => {
    const tracks = new Set<string>();
    const platforms = new Set<string>();
    const difficulties = new Set<string>();

    initialExercises.forEach((e) => {
      if (e.exercise.type === "self-assessment") return;
      const { track, platform } = getMetadataFromPath(e.lessonPath);
      tracks.add(track);
      platforms.add(platform);
      difficulties.add(e.exercise.difficulty);
    });

    return {
      tracks: Array.from(tracks).sort(),
      platforms: Array.from(platforms).sort(),
      difficulties: Array.from(difficulties).sort(),
    };
  }, [initialExercises]);

  // Filter pending count for modal button
  const pendingFilteredCount = useMemo(() => {
    return initialExercises.filter((e) => {
      if (e.exercise.type === "self-assessment") return false;
      const { track, platform } = getMetadataFromPath(e.lessonPath);

      const trackMatch =
        pendingTracks.length === 0 || pendingTracks.includes(track);
      const platformMatch =
        pendingPlatforms.length === 0 || pendingPlatforms.includes(platform);
      const difficultyMatch =
        pendingDifficulties.length === 0 ||
        pendingDifficulties.includes(e.exercise.difficulty);

      return trackMatch && platformMatch && difficultyMatch;
    }).length;
  }, [initialExercises, pendingTracks, pendingPlatforms, pendingDifficulties]);

  const startNewSession = (
    tracks = activeTracks,
    platforms = activePlatforms,
    difficulties = activeDifficulties,
  ) => {
    const filtered = initialExercises.filter((e) => {
      if (e.exercise.type === "self-assessment") return false;
      const { track, platform } = getMetadataFromPath(e.lessonPath);

      const trackMatch = tracks.length === 0 || tracks.includes(track);
      const platformMatch =
        platforms.length === 0 || platforms.includes(platform);
      const difficultyMatch =
        difficulties.length === 0 ||
        difficulties.includes(e.exercise.difficulty);

      return trackMatch && platformMatch && difficultyMatch;
    });

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setExercises(shuffled);
    setCurrentIndex(0);
    setCompletedCount(0);
    setShowNext(false);
    setStatus("playing");
  };

  const handleApplyFilters = () => {
    setActiveTracks(pendingTracks);
    setActivePlatforms(pendingPlatforms);
    setActiveDifficulties(pendingDifficulties);

    startNewSession(pendingTracks, pendingPlatforms, pendingDifficulties);
    setIsFilterOpen(false);
  };

  const toggleFilter = (
    item: string,
    current: string[],
    setter: (val: string[]) => void,
  ) => {
    if (current.includes(item)) {
      setter(current.filter((i) => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const handleNext = () => {
    setShowNext(false);
    setCompletedCount((c) => c + 1);
    if (currentIndex + 1 >= exercises.length) {
      setStatus("finished");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    startNewSession();
  };

  // If no exercises at all (empty course state)
  if (initialExercises.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-3xl">
          📚
        </div>
        <h2 className="text-xl font-bold">No flashcards available yet</h2>
        <p className="mt-2 text-neutral-500">
          Complete some lessons to unlock flashcards. Only completed lessons
          with exercises appear here.
        </p>
        <Button href="/course" className="mt-6">
          Go to Course
        </Button>
      </div>
    );
  }

  // Reuse modal content across states
  const modalContent = (
    <Modal isOpen={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <ModalContent className="max-w-xl">
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="bg-swiss-red/10 text-swiss-red flex h-8 w-8 items-center justify-center">
              <FilterList className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold">Filter Flashcards</h2>
          </div>
        </ModalHeader>
        <ModalBody className="space-y-6">
          {/* Tracks */}
          {options.tracks.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                Track
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.tracks.map((track) => (
                  <button
                    key={track}
                    onClick={() =>
                      toggleFilter(track, pendingTracks, setPendingTracks)
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-none border px-3 py-1.5 text-sm font-medium transition-all",
                      pendingTracks.includes(track)
                        ? "border-swiss-red bg-swiss-red text-white"
                        : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800",
                    )}
                  >
                    {pendingTracks.includes(track) && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {track}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Platforms */}
          {options.platforms.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                Platform
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() =>
                      toggleFilter(
                        platform,
                        pendingPlatforms,
                        setPendingPlatforms,
                      )
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-none border px-3 py-1.5 text-sm font-medium transition-all",
                      pendingPlatforms.includes(platform)
                        ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                        : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800",
                    )}
                  >
                    {pendingPlatforms.includes(platform) && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Difficulties */}
          {options.difficulties.length > 0 && (
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                Difficulty
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      toggleFilter(
                        diff,
                        pendingDifficulties,
                        setPendingDifficulties,
                      )
                    }
                    className={cn(
                      "flex items-center gap-2 rounded-none border px-3 py-1.5 text-sm font-medium capitalize transition-all",
                      pendingDifficulties.includes(diff)
                        ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                        : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800",
                    )}
                  >
                    {pendingDifficulties.includes(diff) && (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
          <div className="text-sm text-neutral-500">
            <span className="font-bold text-neutral-900 dark:text-white">
              {pendingFilteredCount}
            </span>{" "}
            cards selected
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen(false)}
              className="text-neutral-500"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              disabled={pendingFilteredCount === 0}
              startContent={<Play className="h-4 w-4" />}
            >
              Apply & Restart
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const currentItem = exercises[currentIndex];

  if (status === "finished") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-swiss-red/10 text-swiss-red mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        >
          <span className="text-4xl">🎉</span>
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold">Session Complete!</h2>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          You've reviewed {exercises.length} flashcards in this session.
        </p>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleRestart}
            startContent={<RotateCw className="h-4 w-4" />}
          >
            Practice Again
          </Button>
          <Button
            onClick={() => setIsFilterOpen(true)}
            startContent={<FilterList className="h-4 w-4" />}
          >
            Change Filters
          </Button>
          <Button
            href="/course/dashboard"
            startContent={<ArrowLeft className="h-4 w-4" />}
            variant="ghost"
          >
            Dashboard
          </Button>
        </div>

        {modalContent}
      </div>
    );
  }

  // Loading state if exercises haven't populated yet (should be fast)
  if (exercises.length === 0 && initialExercises.length > 0) {
    return null;
  }

  // Empty state if filters result in 0
  if (exercises.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-lg font-bold">No cards match your filters</h3>
        <p className="mb-6 text-neutral-500">
          Try adjusting your selection to see more cards.
        </p>
        <Button
          onClick={() => setIsFilterOpen(true)}
          startContent={<FilterList className="h-4 w-4" />}
        >
          Adjust Filters
        </Button>
        {modalContent}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400">
          {currentIndex + 1} / {exercises.length}
        </span>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <FilterList className="h-3.5 w-3.5" />
          Filters
          {(activeTracks.length > 0 ||
            activePlatforms.length > 0 ||
            activeDifficulties.length > 0) && (
            <div className="bg-swiss-red h-1.5 w-1.5 rounded-full" />
          )}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-8 h-1 w-full bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          className="bg-swiss-red h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / exercises.length) * 100}%` }}
        />
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
          From: {currentItem.lessonTitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.exercise.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentItem.exercise.type === "multiple-choice" && (
            <MultipleChoice
              key={currentItem.exercise.id}
              exercise={currentItem.exercise}
              onComplete={() => setShowNext(true)}
            />
          )}
          {currentItem.exercise.type === "spot-the-issue" && (
            <SpotTheIssue
              key={currentItem.exercise.id}
              exercise={currentItem.exercise}
              onComplete={() => setShowNext(true)}
            />
          )}
          {currentItem.exercise.type === "fix-the-code" && (
            <FixTheCode
              key={currentItem.exercise.id}
              exercise={currentItem.exercise}
              onComplete={() => setShowNext(true)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex min-h-[40px] justify-end">
        <AnimatePresence>
          {showNext && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <Button
                onClick={handleNext}
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                {currentIndex + 1 >= exercises.length ? "Finish" : "Next Card"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {modalContent}
    </div>
  );
}
