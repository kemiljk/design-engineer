import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, ROW } from "../base/grid";

export function HierarchyStack() {
  const barHeight = ROW.lg;
  const barGap = 12;
  const startY = CONTENT.top + 8;
  
  // Fixed layout: bars on left (60% width), labels on right (40% width)
  const barAreaWidth = CONTENT.width * 0.55;
  const labelX = CONTENT.left + barAreaWidth + 24;

  const levels = [
    { label: "PRIMARY", widthPercent: 1.0, fill: ILLUSTRATION_COLORS.primary },
    { label: "SECONDARY", widthPercent: 0.75, fill: "currentColor" },
    { label: "TERTIARY", widthPercent: 0.5, fill: ILLUSTRATION_COLORS.muted },
    { label: "DETAILS", widthPercent: 0.3, fill: ILLUSTRATION_COLORS.light },
  ];

  return (
    <Illustration
      title="Visual Hierarchy Stack"
      description="Demonstrates the levels of visual hierarchy from primary to details"
      width={GRID.width}
      height={GRID.height}
    >
      {levels.map((level, index) => {
        const y = startY + index * (barHeight + barGap);
        const width = barAreaWidth * level.widthPercent;

        return (
          <g key={level.label}>
            <Rect
              x={CONTENT.left}
              y={y}
              width={width}
              height={barHeight}
              fill={level.fill}
              stroke="none"
            />
            <Label x={labelX} y={y + barHeight / 2 + 4}>
              {level.label}
            </Label>
          </g>
        );
      })}
    </Illustration>
  );
}
