#!/usr/bin/env tsx

/**
 * Automated GIF Capture for Animation Examples
 *
 * Captures high-quality GIFs of animation examples for social media sharing.
 * Uses Playwright for browser automation and ffmpeg for video conversion.
 *
 * Usage:
 *   bun run capture:gifs              # Capture all examples
 *   bun run capture:gifs border-beam  # Capture specific example
 */

import { chromium, type Browser, type Page } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

interface CaptureConfig {
  exampleId: string;
  route: string;
  duration: number; // seconds
  interactions?: Array<{
    selector: string;
    action: 'click' | 'hover' | 'wait';
    delay: number; // ms
  }>;
  viewport: { width: number; height: number };
  fps?: number;
}

// Configuration for each example
const examples: CaptureConfig[] = [
  {
    exampleId: 'border-beam',
    route: '/capture/border-beam',
    duration: 5,
    interactions: [
      { selector: '[data-capture-ready="true"]', action: 'wait', delay: 1000 },
    ],
    viewport: { width: 1200, height: 675 },
    fps: 20,
  },
  {
    exampleId: 'easing-playground',
    route: '/capture/easing-playground',
    duration: 6,
    interactions: [
      { selector: '[data-capture-ready="true"]', action: 'wait', delay: 1000 },
      { selector: '[data-demo-trigger]', action: 'click', delay: 500 },
    ],
    viewport: { width: 1200, height: 675 },
    fps: 20,
  },
  {
    exampleId: 'timing-comparison',
    route: '/capture/timing-comparison',
    duration: 5,
    interactions: [
      { selector: '[data-capture-ready="true"]', action: 'wait', delay: 1000 },
      { selector: '[data-demo-trigger]', action: 'click', delay: 500 },
    ],
    viewport: { width: 1200, height: 675 },
    fps: 20,
  },
  {
    exampleId: 'spring-physics',
    route: '/capture/spring-physics',
    duration: 6,
    interactions: [
      { selector: '[data-capture-ready="true"]', action: 'wait', delay: 1000 },
      { selector: '[data-demo-trigger]', action: 'click', delay: 500 },
    ],
    viewport: { width: 1200, height: 675 },
    fps: 20,
  },
];

async function ensureDirectories() {
  const demosDir = join(process.cwd(), 'public', 'demos');
  const tempDir = join(process.cwd(), '.temp-captures');

  if (!existsSync(demosDir)) {
    mkdirSync(demosDir, { recursive: true });
  }

  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }

  return { demosDir, tempDir };
}

async function checkServerRunning(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function captureExample(
  browser: Browser,
  config: CaptureConfig,
  tempDir: string
): Promise<string> {
  console.log(`\n📸 Capturing ${config.exampleId}...`);

  const context = await browser.newContext({
    viewport: config.viewport,
    recordVideo: {
      dir: tempDir,
      size: config.viewport,
    },
  });

  const page = await context.newPage();

  try {
    // Navigate to the page
    console.log(`   ➜ Navigating to ${config.route}`);
    await page.goto(`http://localhost:3000${config.route}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for page to be fully loaded
    await page.waitForTimeout(1000);

    // Execute interactions
    if (config.interactions) {
      for (const interaction of config.interactions) {
        console.log(`   ➜ ${interaction.action}: ${interaction.selector}`);

        if (interaction.action === 'click') {
          await page.click(interaction.selector);
        } else if (interaction.action === 'hover') {
          await page.hover(interaction.selector);
        }

        await page.waitForTimeout(interaction.delay);
      }
    }

    // Record for specified duration
    console.log(`   ➜ Recording for ${config.duration}s...`);
    await page.waitForTimeout(config.duration * 1000);

    // Close the page and context to finalize video
    await page.close();
    await context.close();

    // Get the video file path
    const videoPath = await new Promise<string>((resolve) => {
      const checkVideo = setInterval(() => {
        const files = require('fs').readdirSync(tempDir);
        const videoFile = files.find((f: string) => f.endsWith('.webm'));
        if (videoFile) {
          clearInterval(checkVideo);
          resolve(join(tempDir, videoFile));
        }
      }, 100);
    });

    console.log(`   ✓ Video recorded: ${videoPath}`);
    return videoPath;

  } catch (error) {
    await page.close();
    await context.close();
    throw error;
  }
}

async function convertToGif(
  videoPath: string,
  outputPath: string,
  fps: number = 20
): Promise<void> {
  console.log(`   ➜ Converting to GIF (${fps} fps)...`);

  // Generate a high-quality color palette
  // stats_mode=full gives better color accuracy for the whole video
  const palettePath = videoPath.replace('.webm', '-palette.png');

  await execAsync(
    `ffmpeg -i "${videoPath}" -vf "fps=${fps},scale=1200:-1:flags=lanczos,palettegen=max_colors=256:stats_mode=full" -y "${palettePath}"`
  );

  // Convert to GIF using the palette
  // Using floyd_steinberg dithering for smoother gradients
  // diff_mode=rectangle optimizes for areas that change
  await execAsync(
    `ffmpeg -i "${videoPath}" -i "${palettePath}" -filter_complex "fps=${fps},scale=1200:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=sierra2_4a:diff_mode=rectangle" -y "${outputPath}"`
  );

  console.log(`   ✓ GIF created: ${outputPath}`);
}

async function getFileSize(path: string): Promise<string> {
  const stats = require('fs').statSync(path);
  const mb = stats.size / (1024 * 1024);
  return `${mb.toFixed(2)}MB`;
}

async function captureAll(specificExample?: string) {
  console.log('🎬 Starting GIF capture process...\n');

  // Check if dev server is running
  const serverRunning = await checkServerRunning('http://localhost:3000');
  if (!serverRunning) {
    console.error('❌ Dev server not running on port 3000');
    console.log('   Please start it with: bun run dev');
    process.exit(1);
  }

  console.log('✓ Dev server is running\n');

  // Ensure directories exist
  const { demosDir, tempDir } = await ensureDirectories();

  // Filter examples if specific one requested
  const examplesToCapture = specificExample
    ? examples.filter(e => e.exampleId === specificExample)
    : examples;

  if (examplesToCapture.length === 0) {
    console.error(`❌ Example "${specificExample}" not found`);
    process.exit(1);
  }

  // Launch browser
  console.log('🚀 Launching browser...\n');
  const browser = await chromium.launch({ headless: true });

  const metadata: Record<string, any> = {};

  try {
    for (const config of examplesToCapture) {
      try {
        // Capture video
        const videoPath = await captureExample(browser, config, tempDir);

        // Convert to GIF
        const gifPath = join(demosDir, `${config.exampleId}.gif`);
        await convertToGif(videoPath, gifPath, config.fps || 10);

        // Get file size
        const size = await getFileSize(gifPath);

        // Store metadata
        metadata[config.exampleId] = {
          url: `/demos/${config.exampleId}.gif`,
          width: config.viewport.width,
          height: config.viewport.height,
          size,
          duration: `${config.duration}s`,
          fps: config.fps || 10,
        };

        console.log(`   ✓ ${config.exampleId}: ${size}\n`);

      } catch (error) {
        console.error(`   ❌ Failed to capture ${config.exampleId}:`, error);
      }
    }

    // Write metadata file
    const metadataPath = join(demosDir, 'metadata.json');
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`\n✓ Metadata saved: ${metadataPath}`);

  } finally {
    await browser.close();

    // Cleanup temp files
    console.log('\n🧹 Cleaning up temp files...');
    const { rmSync } = require('fs');
    rmSync(tempDir, { recursive: true, force: true });
  }

  console.log('\n✅ All GIFs captured successfully!');
  console.log(`\nOutput directory: ${demosDir}`);
}

// Run the script
const specificExample = process.argv[2];
captureAll(specificExample).catch(console.error);
