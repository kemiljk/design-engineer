// Standard grid configuration for all illustrations
export const GRID = {
  width: 560,
  height: 360,
  padding: 48,
  columns: 12,
  gutter: 10,
} as const;

// Calculate the width of a single column
export const COLUMN_WIDTH = 
  (GRID.width - GRID.padding * 2 - GRID.gutter * (GRID.columns - 1)) / GRID.columns;

// Calculate width spanning multiple columns
export function colSpan(cols: number): number {
  return cols * COLUMN_WIDTH + (cols - 1) * GRID.gutter;
}

// Get x position for a column (0-indexed)
export function colStart(col: number): number {
  return GRID.padding + col * (COLUMN_WIDTH + GRID.gutter);
}

// Standard row heights
export const ROW = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
} as const;

// Standard vertical positions (for consistent row placement)
export function rowY(row: number, rowHeight: number = ROW.md, gap: number = 16): number {
  return GRID.padding + row * (rowHeight + gap);
}

// Content area dimensions
export const CONTENT = {
  width: GRID.width - GRID.padding * 2,
  height: GRID.height - GRID.padding * 2,
  left: GRID.padding,
  top: GRID.padding,
  right: GRID.width - GRID.padding,
  bottom: GRID.height - GRID.padding,
  centerX: GRID.width / 2,
  centerY: GRID.height / 2,
} as const;
