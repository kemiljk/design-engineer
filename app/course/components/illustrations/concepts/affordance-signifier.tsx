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

function MinusIcon({ x, y, size = 14, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.2} ${size * 0.5} L ${size * 0.8} ${size * 0.5}`}
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

function CursorIcon({ x, y, size = 20 }: { x: number; y: number; size?: number }) {
  const scale = size / 32;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path
        d="M11.3795 30.363L0.179102 1.44238C-0.130998 0.641685 0.657602 -0.146915 1.46838 0.153085L30.7529 10.9896C31.5877 11.2985 31.6333 12.4518 30.8253 12.8246L19.0831 18.2428C18.8658 18.343 18.6918 18.517 18.5926 18.7333L13.2317 30.4182C12.8629 31.2222 11.6988 31.1875 11.3795 30.363Z"
        fill="currentColor"
      />
      <path
        d="M-0.289795 1.6208L10.9106 30.5414C11.3895 31.7781 13.1357 31.8301 13.689 30.6242L19.0498 18.9392C19.0994 18.8311 19.1864 18.7441 19.295 18.694L31.0373 13.2758C32.2492 12.7166 32.1809 10.9867 30.9286 10.5233L1.64412 -0.313185C0.427978 -0.763185 -0.754995 0.419815 -0.289795 1.6208Z"
        stroke="currentColor"
        strokeWidth={0.75}
        fill="none"
      />
    </g>
  );
}

export function AffordanceSignifier() {
  const colWidth = (CONTENT.width - 40) / 3;
  const startY = CONTENT.top + 48;

  return (
    <Illustration
      title="Affordance and Signifier"
      description="Affordances are what you can do; signifiers show you how"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        AFFORDANCES & SIGNIFIERS
      </Label>

      {/* Column 1: No signifier (hidden affordance) */}
      <g>
        <Label x={CONTENT.left + colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          HIDDEN
        </Label>
        
        {/* Plain rectangle - looks non-interactive */}
        <Rect
          x={CONTENT.left + colWidth / 2 - 40}
          y={startY + 20}
          width={80}
          height={36}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 42}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Click me?
        </text>

        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Clickable but no visual cue
        </text>

        {/* X mark */}
        <XIcon
          x={CONTENT.left + colWidth / 2}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.muted}
        />
      </g>

      {/* Column 2: Weak signifier */}
      <g>
        <Label x={CONTENT.centerX} y={startY - 12} anchor="middle" fontSize={11}>
          WEAK SIGNIFIER
        </Label>
        
        {/* Subtle button styling */}
        <Rect
          x={CONTENT.centerX - 40}
          y={startY + 20}
          width={80}
          height={36}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={CONTENT.centerX}
          y={startY + 42}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Click me
        </text>

        <text
          x={CONTENT.centerX}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Border hints at interactivity
        </text>

        {/* Minus / partial indicator */}
        <MinusIcon
          x={CONTENT.centerX}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.muted}
        />
      </g>

      {/* Column 3: Strong signifier */}
      <g>
        <Label x={CONTENT.right - colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          STRONG SIGNIFIER
        </Label>
        
        {/* Clear button styling */}
        <Rect
          x={CONTENT.right - colWidth / 2 - 40}
          y={startY + 20}
          width={80}
          height={36}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 42}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          Click me
        </text>

        {/* CursorPointer indicator */}
        <CursorIcon
          x={CONTENT.right - colWidth / 2 + 30}
          y={startY + 42}
        />

        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Colour, cursor, contrast
        </text>

        {/* Check mark */}
        <CheckIcon
          x={CONTENT.right - colWidth / 2}
          y={startY + 105}
          size={16}
          color={ILLUSTRATION_COLORS.primary}
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
        Signifiers: colour, shape, cursor, shadow, position
      </text>
    </Illustration>
  );
}
