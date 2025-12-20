import {
  Illustration,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT, colStart, colSpan } from "../base/grid";

export function GestaltProximity() {
  const dotRadius = 10;
  const tightSpacing = 28;
  const looseSpacing = 48;
  
  const rowY = CONTENT.centerY;
  
  // Group A - tightly packed triangle
  const groupAX = colStart(1);
  const groupA = [
    { cx: groupAX, cy: rowY - 16 },
    { cx: groupAX + tightSpacing, cy: rowY - 16 },
    { cx: groupAX + tightSpacing / 2, cy: rowY + 12 },
  ];

  // Group B - tightly packed square
  const groupBX = colStart(4) + 16;
  const groupB = [
    { cx: groupBX, cy: rowY - 14 },
    { cx: groupBX + tightSpacing, cy: rowY - 14 },
    { cx: groupBX, cy: rowY + 14 },
    { cx: groupBX + tightSpacing, cy: rowY + 14 },
  ];

  // Scattered dots - spread apart
  const scatteredStartX = colStart(8);
  const scattered = [
    { cx: scatteredStartX, cy: rowY - 24 },
    { cx: scatteredStartX + looseSpacing, cy: rowY + 8 },
    { cx: scatteredStartX + looseSpacing * 1.6, cy: rowY - 16 },
    { cx: scatteredStartX + looseSpacing * 0.5, cy: rowY + 28 },
    { cx: scatteredStartX + looseSpacing * 1.3, cy: rowY + 24 },
  ];

  return (
    <Illustration
      title="Gestalt Proximity"
      description="Demonstrates how proximity creates visual groupings"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Group A */}
      <g>
        {groupA.map((dot, i) => (
          <Circle
            key={`a-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dotRadius}
            fill={ILLUSTRATION_COLORS.primary}
            stroke="none"
          />
        ))}
        <Label x={groupAX + tightSpacing / 2} y={CONTENT.bottom - 24} anchor="middle">
          GROUPED
        </Label>
      </g>

      {/* Group B */}
      <g>
        {groupB.map((dot, i) => (
          <Circle
            key={`b-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dotRadius}
            fill="currentColor"
            stroke="none"
          />
        ))}
        <Label x={groupBX + tightSpacing / 2} y={CONTENT.bottom - 24} anchor="middle">
          GROUPED
        </Label>
      </g>

      {/* Scattered */}
      <g>
        {scattered.map((dot, i) => (
          <Circle
            key={`s-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dotRadius}
            fill={ILLUSTRATION_COLORS.muted}
            stroke="none"
          />
        ))}
        <Label x={scatteredStartX + looseSpacing * 0.8} y={CONTENT.bottom - 24} anchor="middle">
          SCATTERED
        </Label>
      </g>
    </Illustration>
  );
}
