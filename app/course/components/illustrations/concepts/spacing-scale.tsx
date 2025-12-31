import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, colStart, colSpan } from "../base/grid";

export function SpacingScale() {
  const spacings = [
    { value: 4, label: "4" },
    { value: 8, label: "8" },
    { value: 16, label: "16" },
    { value: 24, label: "24" },
    { value: 32, label: "32" },
    { value: 48, label: "48" },
  ];

  const barWidth = colSpan(1) + 8;
  const maxHeight = CONTENT.height - 60;
  const baselineY = CONTENT.bottom - 40;
  const startX = colStart(1);
  const gap = (CONTENT.width - barWidth * spacings.length - GRID.padding) / (spacings.length - 1);

  return (
    <Illustration
      title="Spacing MenuScale"
      description="Visual representation of a spacing scale from 4px to 48px"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        SPACING SCALE
      </Label>

      {spacings.map((space, i) => {
        const x = startX + i * (barWidth + gap);
        const height = (space.value / 48) * maxHeight;
        const y = baselineY - height;
        const isHighlight = space.value === 16;

        return (
          <g key={space.label}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={height}
              fill={isHighlight ? ILLUSTRATION_COLORS.primary : "currentColor"}
              stroke="none"
            />
            <Label x={x + barWidth / 2} y={baselineY + 20} anchor="middle">
              {space.label}
            </Label>
          </g>
        );
      })}
    </Illustration>
  );
}
