import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function SkeletonLoading() {
  const cardWidth = 180;
  const cardHeight = 220;
  const cardGap = 40;
  const totalWidth = cardWidth * 2 + cardGap;
  const startX = CONTENT.centerX - totalWidth / 2;
  const cardY = CONTENT.top + 48;

  return (
    <Illustration
      title="Skeleton Loading"
      description="Content placeholders that show structure while data loads"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        SKELETON SCREENS
      </Label>

      {/* Skeleton Card */}
      <g>
        <Label x={startX + cardWidth / 2} y={cardY - 6} anchor="middle" fontSize={11}>
          LOADING
        </Label>
        
        {/* Card container */}
        <Rect
          x={startX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          fill="none"
          stroke={ILLUSTRATION_COLORS.light}
          strokeWidth={1}
        />

        {/* Image placeholder */}
        <Rect
          x={startX + 12}
          y={cardY + 12}
          width={cardWidth - 24}
          height={90}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Title placeholder */}
        <Rect
          x={startX + 12}
          y={cardY + 114}
          width={cardWidth - 40}
          height={14}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Description lines */}
        <Rect
          x={startX + 12}
          y={cardY + 138}
          width={cardWidth - 24}
          height={10}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />
        <Rect
          x={startX + 12}
          y={cardY + 156}
          width={cardWidth - 48}
          height={10}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Button placeholder */}
        <Rect
          x={startX + 12}
          y={cardY + 184}
          width={70}
          height={28}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Shimmer effect indicator */}
        <text
          x={startX + cardWidth / 2}
          y={cardY + cardHeight + 16}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          ← shimmer animation →
        </text>
      </g>

      {/* Loaded Card */}
      <g>
        <Label x={startX + cardWidth + cardGap + cardWidth / 2} y={cardY - 6} anchor="middle" fontSize={11}>
          LOADED
        </Label>
        
        {/* Card container */}
        <Rect
          x={startX + cardWidth + cardGap}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Image */}
        <Rect
          x={startX + cardWidth + cardGap + 12}
          y={cardY + 12}
          width={cardWidth - 24}
          height={90}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Title */}
        <Rect
          x={startX + cardWidth + cardGap + 12}
          y={cardY + 114}
          width={cardWidth - 40}
          height={14}
          fill="currentColor"
          stroke="none"
        />

        {/* Description */}
        <Rect
          x={startX + cardWidth + cardGap + 12}
          y={cardY + 138}
          width={cardWidth - 24}
          height={10}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />
        <Rect
          x={startX + cardWidth + cardGap + 12}
          y={cardY + 156}
          width={cardWidth - 48}
          height={10}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Button */}
        <Rect
          x={startX + cardWidth + cardGap + 12}
          y={cardY + 184}
          width={70}
          height={28}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Actual content label */}
        <text
          x={startX + cardWidth + cardGap + cardWidth / 2}
          y={cardY + cardHeight + 16}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          actual content
        </text>
      </g>
    </Illustration>
  );
}
