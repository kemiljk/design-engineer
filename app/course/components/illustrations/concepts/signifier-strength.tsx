import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function SignifierStrength() {
  const colWidth = (CONTENT.width - 60) / 3;
  const startY = CONTENT.top + 48;
  const buttonWidth = 90;
  const buttonHeight = 36;

  return (
    <Illustration
      title="Signifier Strength"
      description="Match signifier strength to action importance"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        SIGNIFIER STRENGTH HIERARCHY
      </Label>

      {/* Column 1: Primary Action */}
      <g>
        <Label x={CONTENT.left + colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          PRIMARY ACTION
        </Label>

        {/* Strong button - filled, prominent */}
        <Rect
          x={CONTENT.left + colWidth / 2 - buttonWidth / 2}
          y={startY + 20}
          width={buttonWidth}
          height={buttonHeight}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
          rx={4}
        />
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 20 + buttonHeight / 2 + 4}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          Submit
        </text>

        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Filled · Bold colour
        </text>
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 94}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          High contrast
        </text>

        {/* Strength indicator */}
        <g transform={`translate(${CONTENT.left + colWidth / 2 - 30}, ${startY + 115})`}>
          <rect width={60} height={4} fill={ILLUSTRATION_COLORS.light} rx={2} />
          <rect width={60} height={4} fill={ILLUSTRATION_COLORS.primary} rx={2} />
        </g>
        <text
          x={CONTENT.left + colWidth / 2}
          y={startY + 135}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          STRONG
        </text>
      </g>

      {/* Column 2: Secondary Action */}
      <g>
        <Label x={CONTENT.centerX} y={startY - 12} anchor="middle" fontSize={11}>
          SECONDARY ACTION
        </Label>

        {/* Outlined button */}
        <Rect
          x={CONTENT.centerX - buttonWidth / 2}
          y={startY + 20}
          width={buttonWidth}
          height={buttonHeight}
          fill={ILLUSTRATION_COLORS.bg}
          stroke="currentColor"
          strokeWidth={1.5}
          rx={4}
        />
        <text
          x={CONTENT.centerX}
          y={startY + 20 + buttonHeight / 2 + 4}
          fontSize={11}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
        >
          FloppyDisk Draft
        </text>

        <text
          x={CONTENT.centerX}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Outlined · Neutral
        </text>
        <text
          x={CONTENT.centerX}
          y={startY + 94}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Medium contrast
        </text>

        {/* Strength indicator */}
        <g transform={`translate(${CONTENT.centerX - 30}, ${startY + 115})`}>
          <rect width={60} height={4} fill={ILLUSTRATION_COLORS.light} rx={2} />
          <rect width={40} height={4} fill={ILLUSTRATION_COLORS.muted} rx={2} />
        </g>
        <text
          x={CONTENT.centerX}
          y={startY + 135}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          MODERATE
        </text>
      </g>

      {/* Column 3: Tertiary Action */}
      <g>
        <Label x={CONTENT.right - colWidth / 2} y={startY - 12} anchor="middle" fontSize={11}>
          TERTIARY ACTION
        </Label>

        {/* Text-only button */}
        <Rect
          x={CONTENT.right - colWidth / 2 - buttonWidth / 2}
          y={startY + 20}
          width={buttonWidth}
          height={buttonHeight}
          fill="transparent"
          stroke="none"
          rx={4}
        />
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 20 + buttonHeight / 2 + 4}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
        >
          Cancel
        </text>

        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 80}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Text only · Subtle
        </text>
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 94}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Low contrast
        </text>

        {/* Strength indicator */}
        <g transform={`translate(${CONTENT.right - colWidth / 2 - 30}, ${startY + 115})`}>
          <rect width={60} height={4} fill={ILLUSTRATION_COLORS.light} rx={2} />
          <rect width={20} height={4} fill={ILLUSTRATION_COLORS.light} rx={2} />
        </g>
        <text
          x={CONTENT.right - colWidth / 2}
          y={startY + 135}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          SUBTLE
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
        Not everything should scream for attention
      </text>
    </Illustration>
  );
}

