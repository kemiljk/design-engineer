
import fs from "fs/promises";
import path from "path";

// Current implementation
async function getOrderedLessonsSequential(
  track: string,
  platform: string,
): Promise<{ path: string; title: string }[]> {
  const basePath = path.join(process.cwd(), "content/course", track, platform);

  try {
    const entries = await fs.readdir(basePath, { withFileTypes: true });
    const sortedModules = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();

    const lessons: { path: string; title: string }[] = [];

    for (const moduleDir of sortedModules) {
      const modulePath = path.join(basePath, moduleDir);
      const files = await fs.readdir(modulePath);
      const mdFiles = files
        .filter((f) => f.endsWith(".md") && f !== "index.md")
        .sort();

      for (const file of mdFiles) {
        const lessonPath = `${track}/${platform}/${moduleDir}/${file.replace(".md", "")}`;
        const title = file
          .replace(".md", "")
          .replace(/^\d+-/, "")
          .replace(/-/g, " ");
        lessons.push({ path: lessonPath, title });
      }
    }

    return lessons;
  } catch {
    return [];
  }
}

// Optimized implementation
async function getOrderedLessonsParallel(
  track: string,
  platform: string,
): Promise<{ path: string; title: string }[]> {
  const basePath = path.join(process.cwd(), "content/course", track, platform);

  try {
    const entries = await fs.readdir(basePath, { withFileTypes: true });
    const sortedModules = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();

    // Use Promise.all to read all modules in parallel
    const modulesData = await Promise.all(
      sortedModules.map(async (moduleDir) => {
        const modulePath = path.join(basePath, moduleDir);
        const files = await fs.readdir(modulePath);
        const mdFiles = files
          .filter((f) => f.endsWith(".md") && f !== "index.md")
          .sort();

        return mdFiles.map(file => {
          const lessonPath = `${track}/${platform}/${moduleDir}/${file.replace(".md", "")}`;
          const title = file
            .replace(".md", "")
            .replace(/^\d+-/, "")
            .replace(/-/g, " ");
          return { path: lessonPath, title };
        });
      })
    );

    // Flatten the array of arrays
    return modulesData.flat();

  } catch (e) {
    console.error(e);
    return [];
  }
}

async function benchmark() {
  const track = "design-track";
  const platform = "web";
  const iterations = 50;

  console.log(`Benchmarking getOrderedLessons for ${track}/${platform}...`);
  console.log(`Running ${iterations} iterations for each implementation.`);

  // Warmup
  await getOrderedLessonsSequential(track, platform);
  await getOrderedLessonsParallel(track, platform);

  // Measure Sequential
  const startSeq = performance.now();
  for (let i = 0; i < iterations; i++) {
    await getOrderedLessonsSequential(track, platform);
  }
  const endSeq = performance.now();
  const avgSeq = (endSeq - startSeq) / iterations;

  console.log(`Sequential Average: ${avgSeq.toFixed(2)} ms`);

  // Measure Parallel
  const startPar = performance.now();
  for (let i = 0; i < iterations; i++) {
    await getOrderedLessonsParallel(track, platform);
  }
  const endPar = performance.now();
  const avgPar = (endPar - startPar) / iterations;

  console.log(`Parallel Average: ${avgPar.toFixed(2)} ms`);

  const improvement = ((avgSeq - avgPar) / avgSeq) * 100;
  console.log(`Improvement: ${improvement.toFixed(2)}%`);

  // Verification
  const seqResult = await getOrderedLessonsSequential(track, platform);
  const parResult = await getOrderedLessonsParallel(track, platform);

  if (JSON.stringify(seqResult) !== JSON.stringify(parResult)) {
    console.error("MISMATCH! The results of sequential and parallel implementations differ.");
    console.log("Sequential length:", seqResult.length);
    console.log("Parallel length:", parResult.length);
  } else {
    console.log("Verification: Results match.");
  }
}

benchmark();
