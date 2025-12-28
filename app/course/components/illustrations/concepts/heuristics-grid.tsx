import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

function EyeIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={size / 2}
        ry={size / 3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      />
      <circle cx={size / 2} cy={size / 2} r={size / 6} fill="currentColor" />
    </g>
  );
}

function GlobeIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill="none" stroke="currentColor" strokeWidth={1} />
      <ellipse cx={size / 2} cy={size / 2} rx={size / 4} ry={size / 2 - 1} fill="none" stroke="currentColor" strokeWidth={0.75} />
      <line x1={1} y1={size / 2} x2={size - 1} y2={size / 2} stroke="currentColor" strokeWidth={0.75} />
    </g>
  );
}

function ExitIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size * 0.3} ${size * 0.2} L ${size * 0.3} ${size * 0.8} L ${size * 0.7} ${size * 0.8} L ${size * 0.7} ${size * 0.2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${size * 0.5} ${size * 0.35} L ${size * 0.5} ${size * 0.6} M ${size * 0.35} ${size * 0.45} L ${size * 0.5} ${size * 0.35} L ${size * 0.65} ${size * 0.45}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function GridIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <rect x={1} y={1} width={size * 0.4} height={size * 0.4} fill="currentColor" rx={1} />
      <rect x={size * 0.55} y={1} width={size * 0.4} height={size * 0.4} fill="currentColor" rx={1} />
      <rect x={1} y={size * 0.55} width={size * 0.4} height={size * 0.4} fill="currentColor" rx={1} />
      <rect x={size * 0.55} y={size * 0.55} width={size * 0.4} height={size * 0.4} fill="currentColor" rx={1} />
    </g>
  );
}

function ShieldIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size / 2} ${size * 0.1} L ${size * 0.85} ${size * 0.25} L ${size * 0.85} ${size * 0.55} Q ${size * 0.85} ${size * 0.85} ${size / 2} ${size * 0.95} Q ${size * 0.15} ${size * 0.85} ${size * 0.15} ${size * 0.55} L ${size * 0.15} ${size * 0.25} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </g>
  );
}

function LightbulbIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size * 0.35} ${size * 0.75} L ${size * 0.35} ${size * 0.55} Q ${size * 0.2} ${size * 0.4} ${size * 0.2} ${size * 0.35} Q ${size * 0.2} ${size * 0.1} ${size / 2} ${size * 0.1} Q ${size * 0.8} ${size * 0.1} ${size * 0.8} ${size * 0.35} Q ${size * 0.8} ${size * 0.4} ${size * 0.65} ${size * 0.55} L ${size * 0.65} ${size * 0.75} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <line x1={size * 0.35} y1={size * 0.85} x2={size * 0.65} y2={size * 0.85} stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
    </g>
  );
}

function ZapIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size * 0.55} ${size * 0.1} L ${size * 0.25} ${size * 0.5} L ${size * 0.45} ${size * 0.5} L ${size * 0.4} ${size * 0.9} L ${size * 0.75} ${size * 0.45} L ${size * 0.55} ${size * 0.45} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </g>
  );
}

function MinimizeIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <rect x={size * 0.15} y={size * 0.15} width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth={1} rx={1} />
      <line x1={size * 0.3} y1={size / 2} x2={size * 0.7} y2={size / 2} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

function AlertIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={`M ${size / 2} ${size * 0.15} L ${size * 0.9} ${size * 0.85} L ${size * 0.1} ${size * 0.85} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <line x1={size / 2} y1={size * 0.4} x2={size / 2} y2={size * 0.55} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={size / 2} cy={size * 0.7} r={1} fill="currentColor" />
    </g>
  );
}

function HelpIcon({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} fill="none" stroke="currentColor" strokeWidth={1} />
      <text
        x={size / 2}
        y={size * 0.65}
        fontSize={size * 0.55}
        fill="currentColor"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
      >
        ?
      </text>
    </g>
  );
}

const heuristics = [
  { num: 1, short: "Visibility", icon: EyeIcon },
  { num: 2, short: "Real World", icon: GlobeIcon },
  { num: 3, short: "Control", icon: ExitIcon },
  { num: 4, short: "Consistency", icon: GridIcon },
  { num: 5, short: "Prevention", icon: ShieldIcon },
  { num: 6, short: "Recognition", icon: LightbulbIcon },
  { num: 7, short: "Flexibility", icon: ZapIcon },
  { num: 8, short: "Minimalism", icon: MinimizeIcon },
  { num: 9, short: "Recovery", icon: AlertIcon },
  { num: 10, short: "Help", icon: HelpIcon },
];

export function HeuristicsGrid() {
  const cols = 5;
  const rows = 2;
  const cellWidth = 90;
  const cellHeight = 56;
  const gap = 8;

  const gridWidth = cols * cellWidth + (cols - 1) * gap;
  const gridHeight = rows * cellHeight + (rows - 1) * gap;
  const startX = CONTENT.centerX - gridWidth / 2;
  const startY = CONTENT.centerY - gridHeight / 2 + 10;

  return (
    <Illustration
      title="Nielsen's 10 Usability Heuristics"
      description="Quick reference grid of all 10 usability heuristics"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        NIELSEN'S 10 USABILITY HEURISTICS
      </Label>

      {heuristics.map((h, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * (cellWidth + gap);
        const y = startY + row * (cellHeight + gap);
        const IconComponent = h.icon;

        return (
          <g key={h.num}>
            <Rect
              x={x}
              y={y}
              width={cellWidth}
              height={cellHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
              rx={4}
            />

            {/* Number badge */}
            <circle
              cx={x + 14}
              cy={y + 14}
              r={9}
              fill={h.num === 1 ? ILLUSTRATION_COLORS.primary : "currentColor"}
            />
            <text
              x={x + 14}
              y={y + 18}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
            >
              {h.num}
            </text>

            {/* Icon */}
            <g style={{ color: ILLUSTRATION_COLORS.muted }}>
              <IconComponent x={x + cellWidth - 18} y={y + 14} size={14} />
            </g>

            {/* Label */}
            <text
              x={x + cellWidth / 2}
              y={y + cellHeight - 12}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {h.short}
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
        Jakob Nielsen, 1994 · Guidelines for evaluating interface usability
      </text>
    </Illustration>
  );
}

