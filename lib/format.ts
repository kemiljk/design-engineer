// Common acronyms that should stay uppercase
const ACRONYMS = new Set([
  'css', 'html', 'js', 'jsx', 'tsx', 'ts', 'api', 'ui', 'ux', 
  'svg', 'png', 'jpg', 'gif', 'url', 'http', 'https', 'json',
  'xml', 'sql', 'dom', 'ios', 'sdk', 'ide', 'cli', 'npm', 'cdn',
  'seo', 'cms', 'crm', 'saas', 'ai', 'ml', 'llm', 'gpu', 'cpu',
  'rgb', 'hsl', 'hex', 'rem', 'em', 'px', 'vh', 'vw', 'a11y',
  'wcag', 'aria', 'hig', 'de', 'dx', 'ux', 'figma', 'xcode',
]);

// Words that should stay lowercase (unless at start)
const LOWERCASE_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at',
  'to', 'from', 'by', 'with', 'in', 'of', 'vs', 'is', 'are', 'was',
  'be', 'been', 'being', 'as', 'if', 'so', 'yet',
]);

/**
 * Formats a title with proper capitalization, preserving acronyms
 */
export function formatTitle(text: string): string {
  return text
    .split(' ')
    .map((word, index) => {
      const lower = word.toLowerCase();
      
      // Preserve acronyms as uppercase
      if (ACRONYMS.has(lower)) {
        return lower.toUpperCase();
      }
      
      // Keep lowercase words lowercase (except at start)
      if (index > 0 && LOWERCASE_WORDS.has(lower)) {
        return lower;
      }
      
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Formats a breadcrumb path segment
 */
export function formatBreadcrumb(segment: string): string {
  return formatTitle(
    segment
      .replace(/-/g, ' ')
      .replace(/^\d+\s*/, '')
  );
}
