import {
  Illustration,
  Rect,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function HierarchyDepth() {
  const leftX = CONTENT.left + CONTENT.width * 0.25;
  const rightX = CONTENT.left + CONTENT.width * 0.75;
  const startY = CONTENT.top + 60;

  const nodeRadius = 6;
  const levelGap = 28;

  return (
    <Illustration
      title="Flat vs Deep Hierarchy"
      description="Comparing flat hierarchies with few levels vs deep hierarchies with many levels"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        HIERARCHY DEPTH
      </Label>

      {/* FLAT HIERARCHY */}
      <g>
        <Label x={leftX} y={startY - 20} anchor="middle" fontSize={11}>
          FLAT
        </Label>

        {/* Root node */}
        <Circle
          cx={leftX}
          cy={startY}
          r={nodeRadius}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Many children at level 1 */}
        {[-60, -36, -12, 12, 36, 60].map((offset, i) => (
          <g key={`flat-l1-${i}`}>
            <Line
              x1={leftX}
              y1={startY + nodeRadius}
              x2={leftX + offset}
              y2={startY + levelGap - nodeRadius}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <Circle
              cx={leftX + offset}
              cy={startY + levelGap}
              r={nodeRadius}
              fill="currentColor"
              stroke="none"
            />
          </g>
        ))}

        {/* Stats */}
        <text
          x={leftX}
          y={startY + levelGap + 35}
          fontSize={10}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          2 levels · 6 items/level
        </text>

        {/* Pros/Cons */}
        <text
          x={leftX}
          y={startY + levelGap + 55}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.primary}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          + Everything visible
        </text>
        <text
          x={leftX}
          y={startY + levelGap + 68}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          − Can overwhelm
        </text>
      </g>

      {/* DEEP HIERARCHY */}
      <g>
        <Label x={rightX} y={startY - 20} anchor="middle" fontSize={11}>
          DEEP
        </Label>

        {/* Root node */}
        <Circle
          cx={rightX}
          cy={startY}
          r={nodeRadius}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Level 1 - 3 children */}
        {[-30, 0, 30].map((offset, i) => (
          <g key={`deep-l1-${i}`}>
            <Line
              x1={rightX}
              y1={startY + nodeRadius}
              x2={rightX + offset}
              y2={startY + levelGap - nodeRadius}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <Circle
              cx={rightX + offset}
              cy={startY + levelGap}
              r={nodeRadius}
              fill="currentColor"
              stroke="none"
            />
          </g>
        ))}

        {/* Level 2 - children of middle node */}
        {[-20, 0, 20].map((offset, i) => (
          <g key={`deep-l2-${i}`}>
            <Line
              x1={rightX}
              y1={startY + levelGap + nodeRadius}
              x2={rightX + offset}
              y2={startY + levelGap * 2 - nodeRadius}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <Circle
              cx={rightX + offset}
              cy={startY + levelGap * 2}
              r={nodeRadius}
              fill={ILLUSTRATION_COLORS.muted}
              stroke="none"
            />
          </g>
        ))}

        {/* Level 3 - children of middle L2 node */}
        {[-10, 10].map((offset, i) => (
          <g key={`deep-l3-${i}`}>
            <Line
              x1={rightX}
              y1={startY + levelGap * 2 + nodeRadius}
              x2={rightX + offset}
              y2={startY + levelGap * 3 - nodeRadius}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <Circle
              cx={rightX + offset}
              cy={startY + levelGap * 3}
              r={nodeRadius}
              fill={ILLUSTRATION_COLORS.light}
              stroke="none"
            />
          </g>
        ))}

        {/* Stats */}
        <text
          x={rightX}
          y={startY + levelGap + 35}
          fontSize={10}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          4 levels · 2-3 items/level
        </text>

        {/* Pros/Cons */}
        <text
          x={rightX}
          y={startY + levelGap + 55}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.primary}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          + Manageable choices
        </text>
        <text
          x={rightX}
          y={startY + levelGap + 68}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          − More navigation
        </text>
      </g>

      {/* Divider */}
      <Line
        x1={CONTENT.centerX}
        y1={startY - 10}
        x2={CONTENT.centerX}
        y2={startY + levelGap * 3 + 20}
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Balance: 2-4 levels, 5-9 items per level
      </text>
    </Illustration>
  );
}

