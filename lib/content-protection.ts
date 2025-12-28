import "server-only";

/**
 * Content Protection Utilities
 * 
 * These utilities help protect course content from easy extraction and scraping.
 * They work together with server-side access controls to add defence-in-depth.
 */

/**
 * Generate invisible watermarks that can be embedded in content.
 * These watermarks are invisible to users but can be extracted from scraped content
 * to identify the source of leaks.
 * 
 * Watermarks are embedded as:
 * - Zero-width characters (invisible Unicode)
 * - HTML comments (stripped by most scrapers but useful for tracing)
 * - CSS class names with encoded user data
 */

// Zero-width characters for encoding
const ZERO_WIDTH_CHARS = {
  ZERO_WIDTH_SPACE: '\u200B',           // Binary 0
  ZERO_WIDTH_NON_JOINER: '\u200C',      // Binary 1
  ZERO_WIDTH_JOINER: '\u200D',          // Separator
};

/**
 * Encode a string into zero-width characters
 */
function encodeToZeroWidth(text: string): string {
  const binary = text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
  
  return binary
    .split('')
    .map(bit => bit === '0' 
      ? ZERO_WIDTH_CHARS.ZERO_WIDTH_SPACE 
      : ZERO_WIDTH_CHARS.ZERO_WIDTH_NON_JOINER
    )
    .join('');
}

/**
 * Decode zero-width characters back to original string
 */
export function decodeFromZeroWidth(encoded: string): string {
  const binary = encoded
    .split('')
    .filter(char => 
      char === ZERO_WIDTH_CHARS.ZERO_WIDTH_SPACE || 
      char === ZERO_WIDTH_CHARS.ZERO_WIDTH_NON_JOINER
    )
    .map(char => char === ZERO_WIDTH_CHARS.ZERO_WIDTH_SPACE ? '0' : '1')
    .join('');
  
  const chars: string[] = [];
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    if (byte.length === 8) {
      chars.push(String.fromCharCode(parseInt(byte, 2)));
    }
  }
  
  return chars.join('');
}

/**
 * Create a short, unique watermark identifier from user ID and timestamp
 */
function createWatermarkId(userId: string, timestamp: number): string {
  // Create a short identifier: first 8 chars of userId + timestamp in base36
  const shortUserId = userId.slice(0, 8);
  const timeStr = timestamp.toString(36);
  return `${shortUserId}:${timeStr}`;
}

/**
 * Generate a watermarked version of content
 * Embeds invisible user identification throughout the content
 */
export function watermarkContent(
  content: string, 
  userId: string,
  lessonPath: string
): string {
  const timestamp = Date.now();
  const watermarkId = createWatermarkId(userId, timestamp);
  
  // Create the invisible watermark payload
  const payload = `[wm:${watermarkId}:${lessonPath.slice(0, 20)}]`;
  const encodedWatermark = encodeToZeroWidth(payload);
  
  // Insert watermarks at strategic points in the content
  // 1. After the first paragraph
  // 2. Every ~500 characters
  // 3. Before the last paragraph
  
  const paragraphs = content.split('\n\n');
  
  if (paragraphs.length <= 2) {
    // Short content: just add one watermark at the end
    return content + encodedWatermark;
  }
  
  // Insert watermarks throughout
  const watermarkedParagraphs = paragraphs.map((para, index) => {
    // Add watermark after first paragraph
    if (index === 0) {
      return para + encodedWatermark;
    }
    // Add watermark every ~5 paragraphs
    if (index > 0 && index % 5 === 0) {
      return para + encodedWatermark;
    }
    // Add watermark before last paragraph
    if (index === paragraphs.length - 2) {
      return para + encodedWatermark;
    }
    return para;
  });
  
  return watermarkedParagraphs.join('\n\n');
}

/**
 * Extract watermark from potentially scraped content
 * Returns the decoded watermark payload if found
 */
export function extractWatermark(content: string): string | null {
  // Find zero-width character sequences
  const zeroWidthPattern = /[\u200B\u200C\u200D]+/g;
  const matches = content.match(zeroWidthPattern);
  
  if (!matches) return null;
  
  // Try to decode each match
  for (const match of matches) {
    try {
      const decoded = decodeFromZeroWidth(match);
      if (decoded.startsWith('[wm:') && decoded.endsWith(']')) {
        return decoded;
      }
    } catch {
      // Continue to next match if decoding fails
    }
  }
  
  return null;
}

/**
 * Parse a watermark payload to extract user and lesson info
 */
export function parseWatermark(payload: string): {
  userId: string;
  timestamp: number;
  lessonPath: string;
} | null {
  // Format: [wm:userId:timestamp:lessonPath]
  const match = payload.match(/^\[wm:([^:]+):([^:]+):([^\]]+)\]$/);
  if (!match) return null;
  
  const [, userIdShort, timeStr, lessonPath] = match;
  
  return {
    userId: userIdShort,
    timestamp: parseInt(timeStr, 36),
    lessonPath,
  };
}

// ============================================
// Rate Limiting
// ============================================

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
  lessonPaths: Set<string>;
}

// In-memory rate limit store (consider Redis for production multi-instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configuration
export const RATE_LIMIT_CONFIG = {
  // Maximum lessons per window
  maxLessonsPerWindow: 30,
  // Time window in milliseconds (10 minutes)
  windowMs: 10 * 60 * 1000,
  // Suspicious threshold: this many unique lessons in the window triggers a flag
  suspiciousThreshold: 20,
  // Cleanup interval (5 minutes)
  cleanupIntervalMs: 5 * 60 * 1000,
};

// Cleanup old entries periodically
let cleanupInterval: NodeJS.Timeout | null = null;

function ensureCleanupRunning() {
  if (cleanupInterval) return;
  
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    const expiry = now - RATE_LIMIT_CONFIG.windowMs;
    
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.lastRequest < expiry) {
        rateLimitStore.delete(key);
      }
    }
  }, RATE_LIMIT_CONFIG.cleanupIntervalMs);
  
  // Don't prevent Node from exiting
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  suspicious: boolean;
  reason?: string;
}

/**
 * Check rate limit for a user accessing lesson content
 */
export function checkRateLimit(
  userId: string, 
  lessonPath: string
): RateLimitResult {
  ensureCleanupRunning();
  
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_CONFIG.windowMs;
  
  let entry = rateLimitStore.get(userId);
  
  // Create new entry or reset if window expired
  if (!entry || entry.firstRequest < windowStart) {
    entry = {
      count: 0,
      firstRequest: now,
      lastRequest: now,
      lessonPaths: new Set(),
    };
    rateLimitStore.set(userId, entry);
  }
  
  // Update entry
  entry.count++;
  entry.lastRequest = now;
  entry.lessonPaths.add(lessonPath);
  
  const uniqueLessons = entry.lessonPaths.size;
  const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxLessonsPerWindow - entry.count);
  const resetAt = entry.firstRequest + RATE_LIMIT_CONFIG.windowMs;
  
  // Check if suspicious (many unique lessons quickly)
  const suspicious = uniqueLessons >= RATE_LIMIT_CONFIG.suspiciousThreshold;
  
  // Check if rate limited
  if (entry.count > RATE_LIMIT_CONFIG.maxLessonsPerWindow) {
    return {
      allowed: false,
      remaining: 0,
      resetAt,
      suspicious,
      reason: `Rate limit exceeded. You've accessed ${entry.count} lessons in the last 10 minutes. Please wait before continuing.`,
    };
  }
  
  return {
    allowed: true,
    remaining,
    resetAt,
    suspicious,
  };
}

/**
 * Get rate limit stats for a user (for admin/debugging)
 */
export function getRateLimitStats(userId: string): RateLimitEntry | null {
  const entry = rateLimitStore.get(userId);
  if (!entry) return null;
  
  return {
    ...entry,
    lessonPaths: new Set(entry.lessonPaths),
  };
}

/**
 * Log suspicious activity for review
 */
export function logSuspiciousActivity(
  userId: string,
  lessonPath: string,
  reason: string,
  metadata?: Record<string, unknown>
): void {
  // Log to console for immediate visibility
  console.warn('[CONTENT_PROTECTION] Suspicious activity detected:', {
    timestamp: new Date().toISOString(),
    userId,
    lessonPath,
    reason,
    ...metadata,
  });
}

/**
 * Send email alert for suspicious activity
 * This should be called from a server context (API route or server component)
 */
export async function sendSuspiciousActivityAlert(
  userId: string,
  lessonPath: string,
  reason: string,
  metadata?: Record<string, unknown>
): Promise<boolean> {
  const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || "internal-protection-key";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  try {
    const response = await fetch(`${baseUrl}/api/course/suspicious-activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-key": INTERNAL_API_KEY,
      },
      body: JSON.stringify({
        userId,
        lessonPath,
        reason,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error("[CONTENT_PROTECTION] Failed to send alert email:", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[CONTENT_PROTECTION] Error sending alert email:", error);
    return false;
  }
}
