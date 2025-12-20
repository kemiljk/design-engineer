import {
  Illustration,
  Rect,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function TokenHierarchy() {
  const boxWidth = 120;
  const boxHeight = 70;
  const gap = 48;
  const totalWidth = 3 * boxWidth + 2 * gap;
  const startX = CONTENT.centerX - totalWidth / 2;
  const startY = CONTENT.top + 50;
  
  const columns = [
    { label: "PRIMITIVE", x: startX, example: "#3B82F6", exampleLabel: "blue-500" },
    { label: "SEMANTIC", x: startX + boxWidth + gap, example: "primary", exampleLabel: "var(--blue-500)" },
    { label: "COMPONENT", x: startX + 2 * (boxWidth + gap), example: "button-bg", exampleLabel: "var(--primary)" },
  ];

  return (
    <Illustration
      title="Token Hierarchy"
      description="How design tokens layer from primitive to semantic to component"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        TOKEN HIERARCHY
      </Label>

      {columns.map((col, index) => (
        <g key={col.label}>
          {/* Box */}
          <Rect
            x={col.x}
            y={startY}
            width={boxWidth}
            height={boxHeight}
            fill={index === 0 ? ILLUSTRATION_COLORS.primary : "none"}
            stroke={index === 0 ? "none" : "currentColor"}
            strokeWidth={1.5}
          />
          
          {/* Example text inside */}
          <text
            x={col.x + boxWidth / 2}
            y={startY + boxHeight / 2 + 4}
            fontSize={10}
            fill={index === 0 ? ILLUSTRATION_COLORS.bg : "currentColor"}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
          >
            {col.example}
          </text>

          {/* Label above */}
          <Label x={col.x + boxWidth / 2} y={startY - 10} anchor="middle">
            {col.label}
          </Label>

          {/* Reference below */}
          <text
            x={col.x + boxWidth / 2}
            y={startY + boxHeight + 20}
            fontSize={11}
            fill={ILLUSTRATION_COLORS.muted}
            textAnchor="middle"
            fontFamily="monospace"
          >
            {col.exampleLabel}
          </text>

          {/* Arrow to next */}
          {index < columns.length - 1 && (
            <Arrow
              x1={col.x + boxWidth + 8}
              y1={startY + boxHeight / 2}
              x2={columns[index + 1].x - 8}
              y2={startY + boxHeight / 2}
              stroke={ILLUSTRATION_COLORS.muted}
            />
          )}
        </g>
      ))}

      {/* Bottom explanation */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 16}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Each layer references the previous → enables theming
      </text>
    </Illustration>
  );
}
