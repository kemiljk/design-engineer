import {
  Illustration,
  Rect,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function CssCascade() {
  const levels = [
    { label: "!IMPORTANT", desc: "Highest priority", fill: ILLUSTRATION_COLORS.primary },
    { label: "SPECIFICITY", desc: "ID > Class > Element", fill: "currentColor" },
    { label: "SOURCE ORDER", desc: "Later rules win", fill: ILLUSTRATION_COLORS.muted },
  ];

  const barWidth = CONTENT.width - 40;
  const barHeight = 44;
  const startX = CONTENT.left + 20;
  const startY = CONTENT.top + 48;
  const gap = 16;

  return (
    <Illustration
      title="CSS Cascade"
      description="How CSS determines which styles apply when rules conflict"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        THE CASCADE (CONFLICT RESOLUTION)
      </Label>

      {levels.map((level, index) => {
        const y = startY + index * (barHeight + gap);
        const width = barWidth - index * 40;

        return (
          <g key={level.label}>
            {/* Priority number */}
            <text
              x={startX - 8}
              y={y + barHeight / 2 + 4}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="end"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              {index + 1}
            </text>

            {/* Bar */}
            <Rect
              x={startX}
              y={y}
              width={width}
              height={barHeight}
              fill={level.fill}
              stroke="none"
            />

            {/* Label */}
            <text
              x={startX + 12}
              y={y + barHeight / 2 - 4}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="start"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
              style={{ letterSpacing: "0.05em" }}
            >
              {level.label}
            </text>

            {/* Description */}
            <text
              x={startX + 12}
              y={y + barHeight / 2 + 10}
              fontSize={11}
              fill={index === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.6)"}
              textAnchor="start"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {level.desc}
            </text>

            {/* Arrow indicating priority */}
            {index < levels.length - 1 && (
              <Arrow
                x1={startX + width + 12}
                y1={y + barHeight / 2}
                x2={startX + width + 12}
                y2={y + barHeight + gap - 4}
                stroke={ILLUSTRATION_COLORS.muted}
              />
            )}
          </g>
        );
      })}

      {/* Priority indicator */}
      <text
        x={CONTENT.right - 20}
        y={startY - 8}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="end"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        ↑ Higher priority
      </text>
    </Illustration>
  );
}
