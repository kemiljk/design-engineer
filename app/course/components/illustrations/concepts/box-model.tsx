import { Illustration, Rect, Label, ILLUSTRATION_COLORS } from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function BoxModel() {
  const centerX = CONTENT.centerX;
  const centerY = CONTENT.centerY;

  // Concentric box sizes
  const marginW = 280, marginH = 180;
  const borderW = 220, borderH = 140;
  const paddingW = 160, paddingH = 100;
  const contentW = 100, contentH = 60;

  return (
    <Illustration
      title="CSS Box Model"
      description="Visualization of the CSS box model with margin, border, padding, and content"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Margin */}
      <Rect
        x={centerX - marginW / 2}
        y={centerY - marginH / 2}
        width={marginW}
        height={marginH}
        fill={`${ILLUSTRATION_COLORS.light}30`}
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />
      <Label x={centerX - marginW / 2 + 8} y={centerY - marginH / 2 + 14}>
        MARGIN
      </Label>

      {/* Border */}
      <Rect
        x={centerX - borderW / 2}
        y={centerY - borderH / 2}
        width={borderW}
        height={borderH}
        fill={`${ILLUSTRATION_COLORS.muted}30`}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />
      <Label x={centerX - borderW / 2 + 8} y={centerY - borderH / 2 + 14}>
        BORDER
      </Label>

      {/* Padding */}
      <Rect
        x={centerX - paddingW / 2}
        y={centerY - paddingH / 2}
        width={paddingW}
        height={paddingH}
        fill={`${ILLUSTRATION_COLORS.primary}15`}
        stroke={ILLUSTRATION_COLORS.primary}
        strokeWidth={1}
      />
      <Label x={centerX - paddingW / 2 + 8} y={centerY - paddingH / 2 + 14} fill={ILLUSTRATION_COLORS.primary}>
        PADDING
      </Label>

      {/* Content */}
      <Rect
        x={centerX - contentW / 2}
        y={centerY - contentH / 2}
        width={contentW}
        height={contentH}
        fill="currentColor"
        stroke="none"
      />
      <text
        x={centerX}
        y={centerY + 4}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.bg}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        CONTENT
      </text>
    </Illustration>
  );
}
