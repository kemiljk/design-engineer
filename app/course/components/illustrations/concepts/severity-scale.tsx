import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

const severityLevels = [
  { level: 0, label: "Not a problem", desc: "No usability issue", color: ILLUSTRATION_COLORS.light },
  { level: 1, label: "Cosmetic", desc: "Fix if time permits", color: "#a3a3a3" },
  { level: 2, label: "Minor", desc: "Low priority fix", color: "#737373" },
  { level: 3, label: "Major", desc: "Important to fix", color: "#525252" },
  { level: 4, label: "Catastrophic", desc: "Must fix before release", color: ILLUSTRATION_COLORS.primary },
];

export function SeverityScale() {
  const barHeight = 32;
  const barWidth = CONTENT.width - 40;
  const startX = CONTENT.left + 20;
  const startY = CONTENT.centerY - 20;

  const segmentWidth = barWidth / severityLevels.length;

  return (
    <Illustration
      title="Severity Scale"
      description="Rating scale for usability issues from 0 (not a problem) to 4 (catastrophic)"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        USABILITY ISSUE SEVERITY SCALE
      </Label>

      {/* Severity bar segments */}
      {severityLevels.map((s, index) => {
        const x = startX + index * segmentWidth;
        const isFirst = index === 0;
        const isLast = index === severityLevels.length - 1;
        const r = 4;

        return (
          <g key={s.level}>
            {/* Bar segment with selective corner rounding */}
            {isFirst ? (
              <path
                d={`M ${x + r} ${startY} 
                   L ${x + segmentWidth} ${startY} 
                   L ${x + segmentWidth} ${startY + barHeight} 
                   L ${x + r} ${startY + barHeight} 
                   Q ${x} ${startY + barHeight} ${x} ${startY + barHeight - r}
                   L ${x} ${startY + r}
                   Q ${x} ${startY} ${x + r} ${startY}`}
                fill={s.color}
              />
            ) : isLast ? (
              <path
                d={`M ${x} ${startY} 
                   L ${x + segmentWidth - r} ${startY} 
                   Q ${x + segmentWidth} ${startY} ${x + segmentWidth} ${startY + r}
                   L ${x + segmentWidth} ${startY + barHeight - r}
                   Q ${x + segmentWidth} ${startY + barHeight} ${x + segmentWidth - r} ${startY + barHeight}
                   L ${x} ${startY + barHeight}
                   Z`}
                fill={s.color}
              />
            ) : (
              <rect
                x={x}
                y={startY}
                width={segmentWidth}
                height={barHeight}
                fill={s.color}
              />
            )}

            {/* Level number */}
            <text
              x={x + segmentWidth / 2}
              y={startY + barHeight / 2 + 5}
              fontSize={14}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
            >
              {s.level}
            </text>

            {/* Label below */}
            <text
              x={x + segmentWidth / 2}
              y={startY + barHeight + 20}
              fontSize={10}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
            >
              {s.label}
            </text>

            {/* Description */}
            <text
              x={x + segmentWidth / 2}
              y={startY + barHeight + 34}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {s.desc}
            </text>
          </g>
        );
      })}

      {/* Arrow indicator */}
      <g>
        <path
          d={`M ${startX} ${startY - 12} L ${startX + barWidth} ${startY - 12}`}
          stroke={ILLUSTRATION_COLORS.light}
          strokeWidth={1}
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={ILLUSTRATION_COLORS.light} />
          </marker>
        </defs>
        <text
          x={startX}
          y={startY - 20}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Low impact
        </text>
        <text
          x={startX + barWidth}
          y={startY - 20}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="end"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          High impact
        </text>
      </g>

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Rate each usability issue to prioritise fixes
      </text>
    </Illustration>
  );
}

