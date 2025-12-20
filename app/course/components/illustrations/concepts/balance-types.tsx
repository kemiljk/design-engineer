import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function BalanceTypes() {
  const sectionWidth = (CONTENT.width - 32) / 2;
  const leftCenterX = CONTENT.left + sectionWidth / 2;
  const rightCenterX = CONTENT.left + sectionWidth + 32 + sectionWidth / 2;
  const centerY = CONTENT.centerY + 8;

  return (
    <Illustration
      title="Balance Types"
      description="Comparison of symmetrical and asymmetrical balance in design"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Labels */}
      <Label x={leftCenterX} y={CONTENT.top + 12} anchor="middle">
        SYMMETRICAL
      </Label>
      <Label x={rightCenterX} y={CONTENT.top + 12} anchor="middle">
        ASYMMETRICAL
      </Label>

      {/* Symmetrical balance - mirrored elements */}
      <Rect
        x={leftCenterX - 70}
        y={centerY - 40}
        width={40}
        height={80}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Rect
        x={leftCenterX + 30}
        y={centerY - 40}
        width={40}
        height={80}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Circle
        cx={leftCenterX}
        cy={centerY - 50}
        r={16}
        fill="currentColor"
        stroke="none"
      />
      <Circle
        cx={leftCenterX}
        cy={centerY + 50}
        r={16}
        fill="currentColor"
        stroke="none"
      />

      {/* Center axis for symmetrical */}
      <line
        x1={leftCenterX}
        y1={centerY - 70}
        x2={leftCenterX}
        y2={centerY + 70}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={1}
        strokeDasharray="4 2"
      />

      {/* Asymmetrical balance - different elements balancing */}
      <Rect
        x={rightCenterX - 60}
        y={centerY - 50}
        width={50}
        height={100}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Circle
        cx={rightCenterX + 30}
        cy={centerY - 20}
        r={24}
        fill="currentColor"
        stroke="none"
      />
      <Rect
        x={rightCenterX + 15}
        y={centerY + 20}
        width={45}
        height={30}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />

      {/* Balance point for asymmetrical (fulcrum) */}
      <polygon
        points={`${rightCenterX - 5},${centerY + 70} ${rightCenterX + 5},${centerY + 70} ${rightCenterX},${centerY + 60}`}
        fill={ILLUSTRATION_COLORS.light}
      />
    </Illustration>
  );
}
