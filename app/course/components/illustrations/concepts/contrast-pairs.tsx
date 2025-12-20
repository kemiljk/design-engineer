import {
  Illustration,
  Rect,
  Label,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, colSpan, colStart } from "../base/grid";

interface ContrastPairsProps {
  beforeLabel?: string;
  afterLabel?: string;
}

export function ContrastPairs({
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: ContrastPairsProps) {
  const cardWidth = colSpan(5);
  const cardHeight = 120;
  const cardY = CONTENT.centerY - cardHeight / 2 + 10;
  
  const leftCardX = colStart(0);
  const rightCardX = colStart(7);

  return (
    <Illustration
      title="Contrast Comparison"
      description="Side-by-side comparison showing before and after states"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Center divider */}
      <Line
        x1={CONTENT.centerX}
        y1={CONTENT.top + 20}
        x2={CONTENT.centerX}
        y2={CONTENT.bottom - 20}
        stroke={ILLUSTRATION_COLORS.light}
        strokeDasharray="4 4"
      />

      {/* Before card */}
      <g>
        <Label x={leftCardX + cardWidth / 2} y={cardY - 12} anchor="middle">
          {beforeLabel}
        </Label>
        <Rect
          x={leftCardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.light}
        />
        {/* Content placeholders - muted/low contrast */}
        <Rect x={leftCardX + 16} y={cardY + 20} width={cardWidth - 32} height={12} fill={ILLUSTRATION_COLORS.light} stroke="none" />
        <Rect x={leftCardX + 16} y={cardY + 44} width={cardWidth - 48} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
        <Rect x={leftCardX + 16} y={cardY + 60} width={cardWidth - 40} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
        <Rect x={leftCardX + 16} y={cardY + 84} width={60} height={20} fill={ILLUSTRATION_COLORS.light} stroke="none" />
      </g>

      {/* After card */}
      <g>
        <Label x={rightCardX + cardWidth / 2} y={cardY - 12} anchor="middle" fill={ILLUSTRATION_COLORS.primary}>
          {afterLabel}
        </Label>
        <Rect
          x={rightCardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          fill="none"
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
        />
        {/* Content placeholders - good contrast/hierarchy */}
        <Rect x={rightCardX + 16} y={cardY + 20} width={cardWidth - 32} height={12} fill="currentColor" stroke="none" />
        <Rect x={rightCardX + 16} y={cardY + 44} width={cardWidth - 48} height={8} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        <Rect x={rightCardX + 16} y={cardY + 60} width={cardWidth - 40} height={8} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        <Rect x={rightCardX + 16} y={cardY + 84} width={60} height={20} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      </g>
    </Illustration>
  );
}
