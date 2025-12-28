import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

function WarningIcon({
  x,
  y,
  size = 14,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size * 0.5} ${size * 0.12} L ${size * 0.1} ${size * 0.88} L ${size * 0.9} ${size * 0.88} Z`}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <line
        x1={size * 0.5}
        y1={size * 0.38}
        x2={size * 0.5}
        y2={size * 0.58}
        stroke={ILLUSTRATION_COLORS.bg}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle
        cx={size * 0.5}
        cy={size * 0.72}
        r={1.2}
        fill={ILLUSTRATION_COLORS.bg}
      />
    </g>
  );
}

const traps = [
  {
    name: "False Consensus",
    desc: "Others think like you",
    fix: "Diverse input",
  },
  {
    name: "Curse of Knowledge",
    desc: "Can't unknow things",
    fix: "Watch new users",
  },
  {
    name: "Edge Case Focus",
    desc: "Rare cases get priority",
    fix: "Prioritise frequency",
  },
];

export function UxTraps() {
  const gap = 16;
  const cardWidth = (CONTENT.width - 60 - gap * 2) / 3;
  const cardHeight = 110;
  const startY = CONTENT.top + 50;

  return (
    <Illustration
      title="Common UX Traps"
      description="Common cognitive biases that lead to poor UX decisions"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        COMMON UX TRAPS
      </Label>

      {traps.map((trap, index) => {
        const x = CONTENT.left + 30 + index * (cardWidth + gap) + cardWidth / 2;

        return (
          <g key={trap.name}>
            {/* Card background */}
            <Rect
              x={x - cardWidth / 2}
              y={startY}
              width={cardWidth}
              height={cardHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
              rx={6}
            />

            {/* Warning icon */}
            <WarningIcon x={x} y={startY + 22} size={18} />

            {/* Trap name */}
            <text
              x={x}
              y={startY + 48}
              fontSize={11}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              {trap.name}
            </text>

            {/* Description */}
            <text
              x={x}
              y={startY + 64}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {trap.desc}
            </text>

            {/* Fix badge */}
            <rect
              x={x - cardWidth / 2 + 10}
              y={startY + 80}
              width={cardWidth - 20}
              height={20}
              fill={ILLUSTRATION_COLORS.primary}
              fillOpacity={0.1}
              rx={10}
            />
            <text
              x={x}
              y={startY + 93}
              fontSize={8}
              fill={ILLUSTRATION_COLORS.primary}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
            >
              Fix: {trap.fix}
            </text>
          </g>
        );
      })}

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Your familiarity with the product biases your judgement
      </text>
    </Illustration>
  );
}
