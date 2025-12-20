import {
  Illustration,
  Rect,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ComponentAnatomy() {
  const buttonW = 140;
  const buttonH = 44;
  const buttonX = CONTENT.centerX - buttonW / 2;
  const buttonY = CONTENT.centerY - buttonH / 2;

  return (
    <Illustration
      title="Component Anatomy"
      description="Breakdown of a button component showing its parts"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        BUTTON ANATOMY
      </Label>

      {/* Button */}
      <Rect
        x={buttonX}
        y={buttonY}
        width={buttonW}
        height={buttonH}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />

      {/* Icon circle */}
      <Circle
        cx={buttonX + 22}
        cy={buttonY + buttonH / 2}
        r={8}
        fill={ILLUSTRATION_COLORS.bg}
        stroke="none"
      />

      {/* Label text */}
      <text
        x={buttonX + 44}
        y={buttonY + buttonH / 2 + 4}
        fontSize={13}
        fill={ILLUSTRATION_COLORS.bg}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
      >
        Button
      </text>

      {/* Leader lines and labels */}
      {/* Icon label */}
      <Line
        x1={buttonX + 22}
        y1={buttonY - 4}
        x2={buttonX + 22}
        y2={buttonY - 28}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeDasharray="2 2"
      />
      <Label x={buttonX + 22} y={buttonY - 36} anchor="middle">
        ICON
      </Label>

      {/* Label label */}
      <Line
        x1={buttonX + 72}
        y1={buttonY - 4}
        x2={buttonX + 72}
        y2={buttonY - 28}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeDasharray="2 2"
      />
      <Label x={buttonX + 72} y={buttonY - 36} anchor="middle">
        LABEL
      </Label>

      {/* Background label */}
      <Line
        x1={buttonX + buttonW + 4}
        y1={buttonY + buttonH / 2}
        x2={buttonX + buttonW + 28}
        y2={buttonY + buttonH / 2}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeDasharray="2 2"
      />
      <Label x={buttonX + buttonW + 36} y={buttonY + buttonH / 2 + 3}>
        FILL
      </Label>

      {/* Padding indicator */}
      <Rect
        x={buttonX - 8}
        y={buttonY + buttonH + 20}
        width={buttonW + 16}
        height={24}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />
      <text
        x={CONTENT.centerX}
        y={buttonY + buttonH + 36}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        padding: 12px 24px
      </text>
    </Illustration>
  );
}
