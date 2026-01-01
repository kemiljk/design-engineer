#!/usr/bin/env tsx
/**
 * Sync Course Structure Script
 * 
 * Scans the content/course directory and compares actual lesson counts
 * with the COURSE_STRUCTURE constants in lib/course-shared.ts
 * 
 * Run with: pnpm sync:course-structure
 * 
 * Options:
 *   --fix    Outputs updated COURSE_STRUCTURE constant to copy into course-shared.ts
 *   --json   Output results as JSON
 */

import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content/course");
const COURSE_SHARED_PATH = path.join(process.cwd(), "lib/course-shared.ts");

interface ModuleInfo {
  id: string;
  title: string;
  lessons: number;
  free?: boolean;
}

interface PlatformInfo {
  title: string;
  lessons: number;
  freeLessons?: number;
  modules: ModuleInfo[];
}

interface TrackInfo {
  web: PlatformInfo;
  ios: PlatformInfo;
  android: PlatformInfo;
}

interface CourseStructure {
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
  return moduleName
    .replace(/^\d+-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Count lesson files in a directory (excluding index.md)
async function countLessonsInDir(dir: string): Promise<number> {
  try {
    const files = await fs.readdir(dir);
    return files.filter(
      (f) => f.endsWith(".md") && f !== "index.md"
    ).length;
  } catch {
    return 0;
  }
}

// Get all modules in a platform directory
async function getModulesInPlatform(
  platformDir: string
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
  const modules = await getModulesInPlatform(platformDir);
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);

  const trackName = track.replace("-track", "");
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const title = `${trackName.charAt(0).toUpperCase() + trackName.slice(1)} (${platformName})`;

  return {
    title,
    lessons: totalLessons,
    freeLessons: track !== "convergence" ? 1 : undefined,
    modules,
  };
}

// Scan introduction section
async function scanIntroduction(): Promise<{ title: string; lessons: number; free: boolean }> {
  const introDir = path.join(CONTENT_DIR, "00-introduction");
  const lessonCount = await countLessonsInDir(introDir);

  return {
    title: "Introduction",
    lessons: lessonCount,
    free: true,
  };
}

// Scan all content and build structure
async function scanCourseContent(): Promise<CourseStructure> {
  const [introduction, designWeb, designIos, designAndroid, engWeb, engIos, engAndroid, convWeb, convIos, convAndroid] =
    await Promise.all([
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

// Import current COURSE_STRUCTURE from course-shared.ts
async function getCurrentStructure(): Promise<Record<string, unknown> | null> {
  try {
    const content = await fs.readFile(COURSE_SHARED_PATH, "utf-8");
    
    // Extract the COURSE_STRUCTURE object using regex
    const match = content.match(/export const COURSE_STRUCTURE = ({[\s\S]*?}) as const;/);
    if (!match) return null;
    
    // This is a simplified parser - we'll compare the key values
    // For now, just return null and rely on manual comparison
    return null;
  } catch {
    return null;
  }
}

// Generate TypeScript code for updated COURSE_STRUCTURE
function generateStructureCode(structure: CourseStructure): string {
  const formatModules = (modules: ModuleInfo[], indent: string): string => {
    return modules
      .map(
        (m) =>
          `${indent}  { id: "${m.id}", title: "${m.title}", lessons: ${m.lessons}${m.free !== undefined ? `, free: ${m.free}` : ""} },`
      )
      .join("\n");
  };

  const formatPlatform = (platform: PlatformInfo, indent: string): string => {
    const freeLessonsLine = platform.freeLessons !== undefined 
      ? `\n${indent}  freeLessons: ${platform.freeLessons},` 
      : "";
    return `{
${indent}  title: "${platform.title}",
${indent}  lessons: ${platform.lessons},${freeLessonsLine}
${indent}  modules: [
${formatModules(platform.modules, indent + "  ")}
${indent}  ],
${indent}}`;
  };

  return `export const COURSE_STRUCTURE = {
  introduction: {
    title: "${structure.introduction.title}",
    lessons: ${structure.introduction.lessons},
    free: ${structure.introduction.free},
  },
  design: {
    web: ${formatPlatform(structure.design.web, "    ")},
    ios: ${formatPlatform(structure.design.ios, "    ")},
    android: ${formatPlatform(structure.design.android, "    ")},
  },
  engineering: {
    web: ${formatPlatform(structure.engineering.web, "    ")},
    ios: ${formatPlatform(structure.engineering.ios, "    ")},
    android: ${formatPlatform(structure.engineering.android, "    ")},
  },
  convergence: {
    web: ${formatPlatform(structure.convergence.web, "    ")},
    ios: ${formatPlatform(structure.convergence.ios, "    ")},
    android: ${formatPlatform(structure.convergence.android, "    ")},
  },
} as const;`;
}

// Extract lesson counts from course-shared.ts
async function getCurrentStructureFromFile(): Promise<Record<string, Record<string, { lessons: number }>> | null> {
  try {
    const content = await fs.readFile(COURSE_SHARED_PATH, "utf-8");
    
    // Helper to extract lessons count immediately after a specific title
    // Pattern: title: "X",\n      lessons: Y
    const extractLessons = (titlePattern: string): number => {
      const regex = new RegExp(`title:\\s*"${titlePattern}",\\s*\\n\\s*lessons:\\s*(\\d+)`);
      const match = content.match(regex);
      return match ? parseInt(match[1]) : 0;
    };
    
    // Extract introduction lessons
    const introMatch = content.match(/introduction:\s*\{\s*\n\s*title:\s*"Introduction",\s*\n\s*lessons:\s*(\d+)/);
    const introLessons = introMatch ? parseInt(introMatch[1]) : 0;

    return {
      introduction: { lessons: introLessons },
      design: {
        web: { lessons: extractLessons("Design \\(Web\\)") },
        ios: { lessons: extractLessons("Design \\(iOS\\)") },
        android: { lessons: extractLessons("Design \\(Android\\)") },
      },
      engineering: {
        web: { lessons: extractLessons("Engineering \\(Web\\)") },
        ios: { lessons: extractLessons("Engineering \\(iOS\\)") },
        android: { lessons: extractLessons("Engineering \\(Android\\)") },
      },
      convergence: {
        web: { lessons: extractLessons("Convergence \\(Web\\)") },
        ios: { lessons: extractLessons("Convergence \\(iOS\\)") },
        android: { lessons: extractLessons("Convergence \\(Android\\)") },
      },
    };
  } catch {
    return null;
  }
}

// Compare scanned structure with current and report differences
async function compareStructures(
  scanned: CourseStructure,
): Promise<{ hasDiscrepancies: boolean; report: string }> {
  const current = await getCurrentStructureFromFile();
  
  if (!current) {
    return {
      hasDiscrepancies: false,
      report: "⚠️  Could not read current COURSE_STRUCTURE from course-shared.ts",
    };
  }

  const discrepancies: string[] = [];

  // Check introduction
  if (scanned.introduction.lessons !== current.introduction.lessons) {
    discrepancies.push(
      `  Introduction: ${current.introduction.lessons} → ${scanned.introduction.lessons}`
    );
  }

  // Check each track/platform
  const tracks = ["design", "engineering", "convergence"] as const;
  const platforms = ["web", "ios", "android"] as const;

  for (const track of tracks) {
    for (const platform of platforms) {
      const scannedCount = scanned[track][platform].lessons;
      const currentCount = (current[track] as Record<string, { lessons: number }>)[platform]?.lessons || 0;
      if (scannedCount !== currentCount) {
        discrepancies.push(
          `  ${track}/${platform}: ${currentCount} → ${scannedCount}`
        );
      }
    }
  }

  if (discrepancies.length === 0) {
    return {
      hasDiscrepancies: false,
      report: "✅ COURSE_STRUCTURE is in sync with content files!",
    };
  }

  return {
    hasDiscrepancies: true,
    report: `⚠️  Found ${discrepancies.length} discrepancies:\n${discrepancies.join("\n")}`,
  };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const shouldFix = args.includes("--fix");
  const outputJson = args.includes("--json");

  console.log("🔍 Scanning course content...\n");

  const scanned = await scanCourseContent();

  if (outputJson) {
    console.log(JSON.stringify(scanned, null, 2));
    return;
  }

  // Print summary
  console.log("📊 Content Summary:");
  console.log(`   Introduction: ${scanned.introduction.lessons} lessons`);
  console.log("");
  
  console.log("   Design Track:");
  console.log(`     Web: ${scanned.design.web.lessons} lessons (${scanned.design.web.modules.length} modules)`);
  console.log(`     iOS: ${scanned.design.ios.lessons} lessons (${scanned.design.ios.modules.length} modules)`);
  console.log(`     Android: ${scanned.design.android.lessons} lessons (${scanned.design.android.modules.length} modules)`);
  console.log("");

  console.log("   Engineering Track:");
  console.log(`     Web: ${scanned.engineering.web.lessons} lessons (${scanned.engineering.web.modules.length} modules)`);
  console.log(`     iOS: ${scanned.engineering.ios.lessons} lessons (${scanned.engineering.ios.modules.length} modules)`);
  console.log(`     Android: ${scanned.engineering.android.lessons} lessons (${scanned.engineering.android.modules.length} modules)`);
  console.log("");

  console.log("   Convergence Track:");
  console.log(`     Web: ${scanned.convergence.web.lessons} lessons (${scanned.convergence.web.modules.length} modules)`);
  console.log(`     iOS: ${scanned.convergence.ios.lessons} lessons (${scanned.convergence.ios.modules.length} modules)`);
  console.log(`     Android: ${scanned.convergence.android.lessons} lessons (${scanned.convergence.android.modules.length} modules)`);
  console.log("");

  const totalLessons =
    scanned.introduction.lessons +
    scanned.design.web.lessons + scanned.design.ios.lessons + scanned.design.android.lessons +
    scanned.engineering.web.lessons + scanned.engineering.ios.lessons + scanned.engineering.android.lessons +
    scanned.convergence.web.lessons + scanned.convergence.ios.lessons + scanned.convergence.android.lessons;

  console.log(`   Total: ${totalLessons} lessons\n`);

  // Compare with current structure
  const { hasDiscrepancies, report } = await compareStructures(scanned);
  console.log(report);
  console.log("");

  if (shouldFix) {
    console.log("📝 Generated COURSE_STRUCTURE (copy to lib/course-shared.ts):\n");
    console.log("─".repeat(60));
    console.log(generateStructureCode(scanned));
    console.log("─".repeat(60));
  } else if (hasDiscrepancies) {
    console.log("💡 Run with --fix to generate updated COURSE_STRUCTURE");
  }
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
