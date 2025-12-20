import {
  Illustration,
  Rect,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, ROW } from "../base/grid";

export function AlignmentGrid() {
  const sectionWidth = (CONTENT.width - 32) / 2;
  const leftX = CONTENT.left;
  const rightX = CONTENT.left + sectionWidth + 32;
  const startY = CONTENT.top + 32;
  const elementHeight = ROW.sm;
  const elementGap = 12;

  return (
    <Illustration
      title="Alignment Comparison"
      description="Side-by-side comparison of aligned vs misaligned elements"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Labels */}
      <Label x={leftX + sectionWidth / 2} y={CONTENT.top + 12} anchor="middle">
        ALIGNED
      </Label>
      <Label x={rightX + sectionWidth / 2} y={CONTENT.top + 12} anchor="middle">
        MISALIGNED
      </Label>

      {/* Alignment guide for left section */}
      <Line
        x1={leftX}
        y1={startY}
        x2={leftX}
        y2={startY + 4 * (elementHeight + elementGap)}
        stroke={ILLUSTRATION_COLORS.primary}
        strokeDasharray="4 2"
        strokeWidth={1}
      />

      {/* Aligned elements - all share left edge */}
      <Rect
        x={leftX}
        y={startY}
        width={sectionWidth * 0.8}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Rect
        x={leftX}
        y={startY + elementHeight + elementGap}
        width={sectionWidth * 0.6}
        height={elementHeight}
        fill="currentColor"
        stroke="none"
      />
      <Rect
        x={leftX}
        y={startY + 2 * (elementHeight + elementGap)}
        width={sectionWidth * 0.9}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={leftX}
        y={startY + 3 * (elementHeight + elementGap)}
        width={sectionWidth * 0.5}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />

      {/* Misaligned elements - no consistent edge */}
      <Rect
        x={rightX + 12}
        y={startY}
        width={sectionWidth * 0.7}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Rect
        x={rightX - 4}
        y={startY + elementHeight + elementGap}
        width={sectionWidth * 0.65}
        height={elementHeight}
        fill="currentColor"
        stroke="none"
      />
      <Rect
        x={rightX + 24}
        y={startY + 2 * (elementHeight + elementGap)}
        width={sectionWidth * 0.8}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={rightX + 8}
        y={startY + 3 * (elementHeight + elementGap)}
        width={sectionWidth * 0.55}
        height={elementHeight}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />
    </Illustration>
  );
}
