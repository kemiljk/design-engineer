import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

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
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 110}
          fontSize={16}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
        >
          ✗
        </text>
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

        {/* Partial check */}
        <text
          x={CONTENT.centerX}
          y={startY + 110}
          fontSize={16}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
        >
          ~
        </text>
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

        {/* Cursor indicator */}
        <path
          d={`M ${CONTENT.right - colWidth / 2 + 30} ${startY + 50} l 0 14 l 4 -4 l 6 8 l 3 -2 l -6 -8 l 5 -1 z`}
          fill="currentColor"
        />

        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Color, cursor, contrast
        </text>

        {/* Check mark */}
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 110}
          fontSize={16}
          fill={ILLUSTRATION_COLORS.primary}
          textAnchor="middle"
        >
          ✓
        </text>
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
        Signifiers: color, shape, cursor, shadow, position
      </text>
    </Illustration>
  );
}
