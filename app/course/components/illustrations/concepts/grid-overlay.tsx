import {
  Illustration,
  Rect,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, COLUMN_WIDTH } from "../base/grid";

export function GridOverlay() {
  const columns = 12;
  const gridHeight = CONTENT.height - 48;
  const startY = CONTENT.top + 32;

  return (
    <Illustration
      title="12-Column ViewGrid System"
      description="Visualization of a responsive 12-column grid layout"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        12-COLUMN GRID
      </Label>

      {/* Column backgrounds */}
      {Array.from({ length: columns }).map((_, i) => {
        const x = CONTENT.left + i * (COLUMN_WIDTH + GRID.gutter);
        return (
          <g key={i}>
            <Rect
              x={x}
              y={startY}
              width={COLUMN_WIDTH}
              height={gridHeight}
              fill={i % 2 === 0 ? `${ILLUSTRATION_COLORS.primary}15` : `${ILLUSTRATION_COLORS.light}40`}
              stroke="none"
            />
          </g>
        );
      })}

      {/* Example content blocks */}
      <Rect
        x={CONTENT.left}
        y={startY + 16}
        width={COLUMN_WIDTH * 6 + GRID.gutter * 5}
        height={32}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Rect
        x={CONTENT.left + COLUMN_WIDTH * 6 + GRID.gutter * 6}
        y={startY + 16}
        width={COLUMN_WIDTH * 6 + GRID.gutter * 5}
        height={32}
        fill="currentColor"
        stroke="none"
      />

      <Rect
        x={CONTENT.left}
        y={startY + 64}
        width={COLUMN_WIDTH * 4 + GRID.gutter * 3}
        height={24}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={CONTENT.left + COLUMN_WIDTH * 4 + GRID.gutter * 4}
        y={startY + 64}
        width={COLUMN_WIDTH * 4 + GRID.gutter * 3}
        height={24}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={CONTENT.left + COLUMN_WIDTH * 8 + GRID.gutter * 8}
        y={startY + 64}
        width={COLUMN_WIDTH * 4 + GRID.gutter * 3}
        height={24}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />

      <Label x={CONTENT.centerX} y={CONTENT.bottom - 8} anchor="middle">
        RESPONSIVE LAYOUT
      </Label>
    </Illustration>
  );
}
