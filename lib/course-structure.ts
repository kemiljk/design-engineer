import "server-only";

import fs from "fs/promises";
import path from "path";
import { formatTitle } from "./format";

const CONTENT_DIR = path.join(process.cwd(), "content/course");

// Cache the structure to avoid repeated filesystem scans
let cachedStructure: CourseStructure | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache in development, effectively forever in production

export interface ModuleInfo {
  id: string;
  title: string;
  lessons: number;
  free?: boolean;
}

export interface PlatformInfo {
  title: string;
  lessons: number;
  freeLessons?: number;
  modules: ModuleInfo[];
}

export interface TrackInfo {
  web: PlatformInfo;
  ios: PlatformInfo;
  android: PlatformInfo;
}

export interface CourseStructure {
  introduction: {
    title: string;
    lessons: number;
    free: boolean;
  };
  design: TrackInfo;
  engineering: TrackInfo;
  convergence: TrackInfo;
}

// Format module name for display (convert kebab-case to Title Case)
function formatModuleName(moduleName: string): string {
  const cleaned = moduleName.replace(/^\d+-/, "").replace(/-/g, " ");
  return formatTitle(cleaned);
}

// Count lesson files in a directory (excluding index.md)
async function countLessonsInDir(dir: string): Promise<number> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".md") && f !== "index.md").length;
  } catch {
    return 0;
  }
}

// Get all modules in a platform directory
async function getModulesInPlatform(
  platformDir: string,
  isConvergence: boolean = false
): Promise<ModuleInfo[]> {
  const modules: ModuleInfo[] = [];

  try {
    const entries = await fs.readdir(platformDir, { withFileTypes: true });
    const sortedDirs = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();

    for (const moduleDir of sortedDirs) {
      const modulePath = path.join(platformDir, moduleDir);
      const lessonCount = await countLessonsInDir(modulePath);

      if (lessonCount > 0) {
        modules.push({
          id: moduleDir,
          title: formatModuleName(moduleDir),
          lessons: lessonCount,
          ...(isConvergence ? { free: false } : {}),
        });
      }
    }
  } catch {
    // Directory doesn't exist
  }

  return modules;
}

// Scan a track/platform combination
async function scanPlatform(
  track: string,
  platform: string
): Promise<PlatformInfo> {
  const platformDir = path.join(CONTENT_DIR, track, platform);
  const isConvergence = track === "convergence";
  const modules = await getModulesInPlatform(platformDir, isConvergence);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);

  const trackName = track.replace("-track", "");
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const title = `${trackName.charAt(0).toUpperCase() + trackName.slice(1)} (${platformName})`;

  return {
    title,
    lessons: totalLessons,
    ...(isConvergence ? {} : { freeLessons: 1 }),
    modules,
  };
}

// Scan introduction section
async function scanIntroduction(): Promise<{
  title: string;
  lessons: number;
  free: boolean;
}> {
  const introDir = path.join(CONTENT_DIR, "00-introduction");
  const lessonCount = await countLessonsInDir(introDir);

  return {
    title: "Introduction",
    lessons: lessonCount,
    free: true,
  };
}

// Scan all content and build structure dynamically
async function scanCourseContent(): Promise<CourseStructure> {
  const [
    introduction,
    designWeb,
    designIos,
    designAndroid,
    engWeb,
    engIos,
    engAndroid,
    convWeb,
    convIos,
    convAndroid,
  ] = await Promise.all([
    scanIntroduction(),
    scanPlatform("design-track", "web"),
    scanPlatform("design-track", "ios"),
    scanPlatform("design-track", "android"),
    scanPlatform("engineering-track", "web"),
    scanPlatform("engineering-track", "ios"),
    scanPlatform("engineering-track", "android"),
    scanPlatform("convergence", "web"),
    scanPlatform("convergence", "ios"),
    scanPlatform("convergence", "android"),
  ]);

  return {
    introduction,
    design: {
      web: designWeb,
      ios: designIos,
      android: designAndroid,
    },
    engineering: {
      web: engWeb,
      ios: engIos,
      android: engAndroid,
    },
    convergence: {
      web: convWeb,
      ios: convIos,
      android: convAndroid,
    },
  };
}

/**
 * Get the course structure dynamically by scanning content files.
 * Results are cached to avoid repeated filesystem scans.
 * 
 * In production, the cache is effectively permanent (refreshed on server restart).
 * In development, the cache refreshes every minute to pick up content changes.
 */
export async function getDynamicCourseStructure(): Promise<CourseStructure> {
  const now = Date.now();
  const isDev = process.env.NODE_ENV === "development";
  
  // Return cached structure if valid
  if (cachedStructure && (now - cacheTimestamp < CACHE_TTL_MS || !isDev)) {
    return cachedStructure;
  }

  // Scan content and cache result
  cachedStructure = await scanCourseContent();
  cacheTimestamp = now;
  
  return cachedStructure;
}

/**
 * Get total lesson count for a specific access level.
 * Dynamically calculated from actual content.
 */
export async function getDynamicTotalLessonsForAccess(
  accessLevel: string
): Promise<number> {
  const structure = await getDynamicCourseStructure();
  const intro = structure.introduction.lessons;

  switch (accessLevel) {
    case "free":
      // Free users only have access to intro + first lesson of each track
      const freeLessons =
        (structure.design.web.freeLessons || 0) +
        (structure.design.ios.freeLessons || 0) +
        (structure.design.android.freeLessons || 0) +
        (structure.engineering.web.freeLessons || 0) +
        (structure.engineering.ios.freeLessons || 0) +
        (structure.engineering.android.freeLessons || 0);
      return intro + freeLessons;
    case "design_web":
      return intro + structure.design.web.lessons;
    case "design_ios":
      return intro + structure.design.ios.lessons;
    case "design_android":
      return intro + structure.design.android.lessons;
    case "design_full":
      return (
        intro +
        structure.design.web.lessons +
        structure.design.ios.lessons +
        structure.design.android.lessons
      );
    case "engineering_web":
      return intro + structure.engineering.web.lessons;
    case "engineering_ios":
      return intro + structure.engineering.ios.lessons;
    case "engineering_android":
      return intro + structure.engineering.android.lessons;
    case "engineering_full":
      return (
        intro +
        structure.engineering.web.lessons +
        structure.engineering.ios.lessons +
        structure.engineering.android.lessons
      );
    case "full":
      // Full access: all tracks
      return (
        intro +
        structure.design.web.lessons +
        structure.design.ios.lessons +
        structure.design.android.lessons +
        structure.engineering.web.lessons +
        structure.engineering.ios.lessons +
        structure.engineering.android.lessons +
        structure.convergence.web.lessons +
        structure.convergence.ios.lessons +
        structure.convergence.android.lessons
      );
    default:
      // Calculate total as fallback
      return (
        intro +
        structure.design.web.lessons +
        structure.design.ios.lessons +
        structure.design.android.lessons +
        structure.engineering.web.lessons +
        structure.engineering.ios.lessons +
        structure.engineering.android.lessons +
        structure.convergence.web.lessons +
        structure.convergence.ios.lessons +
        structure.convergence.android.lessons
      );
  }
}

/**
 * Invalidate the cached structure.
 * Useful for testing or when content is known to have changed.
 */
export function invalidateCourseStructureCache(): void {
  cachedStructure = null;
  cacheTimestamp = 0;
}
