import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function LoadingDuration() {
  const stages = [
    { time: "<100ms", label: "INSTANT", pattern: "none", desc: "No indicator" },
    { time: "100ms-1s", label: "SPINNER", pattern: "spinner", desc: "Simple feedback" },
    { time: "1-10s", label: "SKELETON", pattern: "skeleton", desc: "Show structure" },
    { time: ">10s", label: "PROGRESS", pattern: "progress", desc: "Show % complete" },
  ];

  const boxWidth = 70;
  const boxHeight = 70;
  const totalWidth = stages.length * boxWidth + (stages.length - 1) * 16;
  const startX = CONTENT.centerX - totalWidth / 2;
  const boxY = CONTENT.top + 56;

  return (
    <Illustration
      title="Loading Duration"
      description="Choose loading patterns based on expected duration"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        LOADING PATTERNS BY DURATION
      </Label>

      {/* Time scale arrow */}
      <line
        x1={startX}
        y1={CONTENT.top + 36}
        x2={startX + totalWidth}
        y2={CONTENT.top + 36}
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
        markerEnd="url(#arrow)"
      />
      <text
        x={startX + totalWidth + 8}
        y={CONTENT.top + 40}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        time
      </text>

      {stages.map((stage, index) => {
        const x = startX + index * (boxWidth + 16);

        return (
          <g key={stage.label}>
            {/* Time label */}
            <text
              x={x + boxWidth / 2}
              y={CONTENT.top + 40}
              fontSize={11}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {stage.time}
            </text>

            {/* Box */}
            <Rect
              x={x}
              y={boxY}
              width={boxWidth}
              height={boxHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />

            {/* Pattern visualization */}
            {stage.pattern === "none" && (
              <text
                x={x + boxWidth / 2}
                y={boxY + boxHeight / 2 + 4}
                fontSize={12}
                fill={ILLUSTRATION_COLORS.muted}
                textAnchor="middle"
                fontFamily="system-ui"
              >
                ✓
              </text>
            )}
            {stage.pattern === "spinner" && (
              <circle
                cx={x + boxWidth / 2}
                cy={boxY + boxHeight / 2}
                r={12}
                fill="none"
                stroke={ILLUSTRATION_COLORS.primary}
                strokeWidth={3}
                strokeDasharray="50 20"
              />
            )}
            {stage.pattern === "skeleton" && (
              <g>
                <Rect x={x + 8} y={boxY + 12} width={boxWidth - 16} height={10} fill={ILLUSTRATION_COLORS.light} stroke="none" />
                <Rect x={x + 8} y={boxY + 28} width={boxWidth - 24} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
                <Rect x={x + 8} y={boxY + 42} width={boxWidth - 16} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
              </g>
            )}
            {stage.pattern === "progress" && (
              <g>
                <Rect x={x + 10} y={boxY + boxHeight / 2 - 4} width={boxWidth - 20} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
                <Rect x={x + 10} y={boxY + boxHeight / 2 - 4} width={(boxWidth - 20) * 0.65} height={8} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
                <text
                  x={x + boxWidth / 2}
                  y={boxY + boxHeight / 2 + 20}
                  fontSize={11}
                  fill={ILLUSTRATION_COLORS.muted}
                  textAnchor="middle"
                  fontFamily="system-ui"
                >
                  65%
                </text>
              </g>
            )}

            {/* Label */}
            <Label
              x={x + boxWidth / 2}
              y={boxY + boxHeight + 16}
              anchor="middle"
              fontSize={11}
            >
              {stage.label}
            </Label>

            {/* Description */}
            <text
              x={x + boxWidth / 2}
              y={boxY + boxHeight + 30}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {stage.desc}
            </text>
          </g>
        );
      })}
    </Illustration>
  );
}
