#!/usr/bin/env tsx

/**
 * Automated Video Capture for Animation Examples
 *
 * Uses screenshot-based capture for maximum quality (pixel-perfect).
 * Takes PNG screenshots at target framerate, then compiles to MP4.
 *
 * Usage:
 *   bun run capture:gifs              # Capture all examples
 *   bun run capture:gifs border-beam  # Capture specific example
 */

import { chromium, type Browser, type Page } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, writeFileSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

interface CaptureConfig {
  exampleId: string;
  route: string;
  duration: number; // seconds
  interactions?: Array<{
    selector: string;
    action: 'click' | 'hover' | 'wait' | 'type';
    delay: number; // ms
    text?: string; // for type action
  }>;
  viewport: { width: number; height: number };
  fps?: number;
  trimStart?: number; // seconds to skip before recording
}

// Configuration for each example - all autoplay
const examples: CaptureConfig[] = [
  {
    exampleId: 'border-beam',
    route: '/capture/border-beam',
    duration: 10,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 560, height: 320 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'feedback',
    route: '/capture/feedback',
    duration: 12,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 320, height: 180 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'relationships',
    route: '/capture/relationships',
    duration: 8,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 400, height: 360 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'choreography',
    route: '/capture/choreography',
    duration: 8,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 480, height: 380 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'button-states',
    route: '/capture/button-states',
    duration: 10,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 360, height: 200 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'toggle-switch',
    route: '/capture/toggle-switch',
    duration: 8,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 520, height: 380 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'like-button',
    route: '/capture/like-button',
    duration: 10,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 480, height: 480 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'micro-validation',
    route: '/capture/micro-validation',
    duration: 12,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 400, height: 200 },
    fps: 30,
    trimStart: 0.2,
  },
  {
    exampleId: 'notification-bell',
    route: '/capture/notification-bell',
    duration: 12,
    interactions: [{ selector: '[data-capture-ready="true"]', action: 'wait', delay: 300 }],
    viewport: { width: 400, height: 340 },
    fps: 30,
    trimStart: 0.2,
  },
];

async function ensureDirectories() {
  const demosDir = join(process.cwd(), 'public', 'demos');
  const tempDir = join(process.cwd(), '.temp-captures');
  const framesDir = join(tempDir, 'frames');

  for (const dir of [demosDir, tempDir, framesDir]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  return { demosDir, tempDir, framesDir };
}

async function checkServerRunning(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function captureFrames(
  page: Page,
  framesDir: string,
  duration: number,
  fps: number
): Promise<number> {
  const totalFrames = Math.ceil(duration * fps);
  const frameInterval = 1000 / fps;
  
  console.log(`   ➜ Capturing ${totalFrames} frames at ${fps}fps...`);
  
  for (let i = 0; i < totalFrames; i++) {
    const frameNumber = String(i).padStart(6, '0');
    const framePath = join(framesDir, `frame_${frameNumber}.png`);
    
    await page.screenshot({ 
      path: framePath,
      type: 'png',
    });
    
    // Wait for next frame
    if (i < totalFrames - 1) {
      await page.waitForTimeout(frameInterval);
    }
    
    // Progress indicator
    if (i % (fps) === 0) {
      process.stdout.write(`\r   ➜ Frame ${i + 1}/${totalFrames}`);
    }
  }
  
  console.log(`\r   ✓ Captured ${totalFrames} frames              `);
  return totalFrames;
}

async function captureExample(
  browser: Browser,
  config: CaptureConfig,
  framesDir: string
): Promise<void> {
  console.log(`\n📸 Capturing ${config.exampleId}...`);
  
  // Clear frames directory
  const existingFrames = readdirSync(framesDir).filter(f => f.endsWith('.png'));
  for (const frame of existingFrames) {
    rmSync(join(framesDir, frame));
  }

  const context = await browser.newContext({
    viewport: config.viewport,
    deviceScaleFactor: 2, // 2x for retina quality
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
    await page.waitForTimeout(500);

    // Execute interactions
    if (config.interactions) {
      for (const interaction of config.interactions) {
        console.log(`   ➜ ${interaction.action}: ${interaction.selector}${interaction.text ? ` "${interaction.text}"` : ''}`);

        if (interaction.action === 'click') {
          await page.click(interaction.selector);
        } else if (interaction.action === 'hover') {
          await page.hover(interaction.selector);
        } else if (interaction.action === 'type' && interaction.text) {
          await page.fill(interaction.selector, '');
          await page.type(interaction.selector, interaction.text, { delay: 80 });
        }

        await page.waitForTimeout(interaction.delay);
      }
    }

    // Skip initial frames if trimStart specified
    if (config.trimStart) {
      await page.waitForTimeout(config.trimStart * 1000);
    }

    // Capture frames
    await captureFrames(page, framesDir, config.duration, config.fps || 30);

  } finally {
    await page.close();
    await context.close();
  }
}

async function framesToMp4(
  framesDir: string,
  outputPath: string,
  fps: number,
  viewport: { width: number; height: number }
): Promise<void> {
  console.log(`   ➜ Compiling to MP4...`);

  // Output at 2x viewport (retina capture) - keep full resolution
  // CRF 12 for high quality, veryslow for best compression
  const outputWidth = viewport.width * 2;
  await execAsync(
    `ffmpeg -framerate ${fps} -i "${framesDir}/frame_%06d.png" ` +
    `-vf "scale=${outputWidth}:-1:flags=lanczos" ` +
    `-c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -y "${outputPath}"`
  );

  console.log(`   ✓ MP4 created: ${outputPath}`);
}

async function getFileSize(path: string): Promise<string> {
  const stats = require('fs').statSync(path);
  const mb = stats.size / (1024 * 1024);
  if (mb < 1) {
    return `${(stats.size / 1024).toFixed(0)}KB`;
  }
  return `${mb.toFixed(2)}MB`;
}

async function captureAll(specificExample?: string) {
  console.log('🎬 Starting high-quality capture process...\n');
  console.log('Using screenshot-based capture for pixel-perfect quality.\n');

  // Check if dev server is running
  const serverRunning = await checkServerRunning('http://localhost:3000');
  if (!serverRunning) {
    console.error('❌ Dev server not running on port 3000');
    console.log('   Please start it with: bun run dev');
    process.exit(1);
  }

  console.log('✓ Dev server is running\n');

  // Ensure directories exist
  const { demosDir, tempDir, framesDir } = await ensureDirectories();

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
        // Capture frames
        await captureExample(browser, config, framesDir);

        // Convert to MP4
        const mp4Path = join(demosDir, `${config.exampleId}.mp4`);
        await framesToMp4(framesDir, mp4Path, config.fps || 30, config.viewport);

        // Get file size
        const size = await getFileSize(mp4Path);

        // Store metadata
        metadata[config.exampleId] = {
          url: `/demos/${config.exampleId}.mp4`,
          width: config.viewport.width,
          height: config.viewport.height,
          size,
          duration: `${config.duration}s`,
          fps: config.fps || 30,
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
    rmSync(tempDir, { recursive: true, force: true });
  }

  console.log('\n✅ All videos captured successfully!');
  console.log(`\nOutput directory: ${demosDir}`);
}

// Run the script
const specificExample = process.argv[2];
captureAll(specificExample).catch(console.error);
