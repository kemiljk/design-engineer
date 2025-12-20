import {
  Illustration,
  Rect,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function FlexboxAxes() {
  const containerWidth = 280;
  const containerHeight = 100;
  const containerX = CONTENT.centerX - containerWidth / 2;
  const containerY = CONTENT.centerY - containerHeight / 2 + 10;
  
  const itemWidth = 50;
  const itemHeight = 40;
  const itemGap = 16;
  const itemY = containerY + (containerHeight - itemHeight) / 2;

  return (
    <Illustration
      title="Flexbox Axes"
      description="Main axis (horizontal) and cross axis (vertical) in flex layout"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        FLEXBOX AXES (ROW DIRECTION)
      </Label>

      {/* Container */}
      <Rect
        x={containerX}
        y={containerY}
        width={containerWidth}
        height={containerHeight}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />

      {/* Flex items */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Rect
            x={containerX + 20 + i * (itemWidth + itemGap)}
            y={itemY}
            width={itemWidth}
            height={itemHeight}
            fill={i === 0 ? ILLUSTRATION_COLORS.primary : "currentColor"}
            stroke="none"
          />
          <text
            x={containerX + 20 + i * (itemWidth + itemGap) + itemWidth / 2}
            y={itemY + itemHeight / 2 + 4}
            fontSize={12}
            fill={ILLUSTRATION_COLORS.bg}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
          >
            {i + 1}
          </text>
        </g>
      ))}

      {/* Main axis arrow (horizontal) */}
      <Arrow
        x1={containerX - 24}
        y1={containerY + containerHeight + 20}
        x2={containerX + containerWidth + 16}
        y2={containerY + containerHeight + 20}
        stroke={ILLUSTRATION_COLORS.primary}
        strokeWidth={2}
      />
      <text
        x={containerX + containerWidth / 2}
        y={containerY + containerHeight + 38}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.primary}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
      >
        MAIN AXIS (justify-content)
      </text>

      {/* Cross axis arrow (vertical) */}
      <Arrow
        x1={containerX - 20}
        y1={containerY + containerHeight + 8}
        x2={containerX - 20}
        y2={containerY - 8}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />
      <text
        x={containerX - 28}
        y={containerY + containerHeight / 2}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
        transform={`rotate(-90, ${containerX - 28}, ${containerY + containerHeight / 2})`}
      >
        CROSS AXIS (align-items)
      </text>
    </Illustration>
  );
}
