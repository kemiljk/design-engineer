import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

function XIcon({ x, y, size = 14, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.2} ${size * 0.2} L ${size * 0.8} ${size * 0.8} M ${size * 0.8} ${size * 0.2} L ${size * 0.2} ${size * 0.8}`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function CheckIcon({ x, y, size = 14, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.15} ${size * 0.5} L ${size * 0.4} ${size * 0.75} L ${size * 0.85} ${size * 0.25}`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

function WarningIcon({ x, y, size = 14, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.5} ${size * 0.15} L ${size * 0.15} ${size * 0.85} L ${size * 0.85} ${size * 0.85} Z`}
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1={size * 0.5}
        y1={size * 0.4}
        x2={size * 0.5}
        y2={size * 0.6}
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <circle cx={size * 0.5} cy={size * 0.72} r={1} fill={color} />
    </g>
  );
}

export function FalseHiddenAffordances() {
  const colWidth = (CONTENT.width - 40) / 3;
  const startY = CONTENT.top + 48;

  return (
    <Illustration
      title="False and Hidden Affordances"
      description="Comparing false affordances, correct affordances, and hidden affordances"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        AFFORDANCE PROBLEMS
      </Label>

      {/* Column 1: False Affordance */}
      <g>
        <Label x={CONTENT.left + colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          FALSE AFFORDANCE
        </Label>

        {/* Text that looks like a link but isn't */}
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 38}
          fontSize={12}
          fill="#2563eb"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          textDecoration="underline"
        >
          Learn more
        </text>
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 54}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontStyle="italic"
        >
          (not actually a link)
        </text>

        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Looks clickable but isn&apos;t
        </text>

        <XIcon
          x={CONTENT.left + colWidth / 2}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.muted}
        />
      </g>

      {/* Column 2: Correct Affordance */}
      <g>
        <Label x={CONTENT.centerX} y={startY - 12} anchor="middle" fontSize={11}>
          CORRECT AFFORDANCE
        </Label>

        {/* Actual link */}
        <text
          x={CONTENT.centerX}
          y={startY + 38}
          fontSize={12}
          fill="#2563eb"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          textDecoration="underline"
          style={{ cursor: "pointer" }}
        >
          Learn more →
        </text>
        <text
          x={CONTENT.centerX}
          y={startY + 54}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontStyle="italic"
        >
          (navigates to page)
        </text>

        <text
          x={CONTENT.centerX}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Appearance matches behaviour
        </text>

        <CheckIcon
          x={CONTENT.centerX}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.primary}
        />
      </g>

      {/* Column 3: Hidden Affordance */}
      <g>
        <Label x={CONTENT.right - colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          HIDDEN AFFORDANCE
        </Label>

        {/* Plain text that is actually clickable */}
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 38}
          fontSize={12}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Learn more
        </text>
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 54}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontStyle="italic"
        >
          (secretly clickable)
        </text>

        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Interactive but no visual cue
        </text>

        <WarningIcon
          x={CONTENT.right - colWidth / 2}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.muted}
        />
      </g>

      {/* Bottom explanation */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 12}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        False affordances frustrate · Hidden affordances confuse
      </text>
    </Illustration>
  );
}

