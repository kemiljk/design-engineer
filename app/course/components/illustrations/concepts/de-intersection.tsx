import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function DeIntersection() {
  const centerY = CONTENT.centerY;
  const boxWidth = 120;
  const boxHeight = 40;
  const spacing = 20;
  
  const totalWidth = boxWidth * 3 + spacing * 2;
  const startX = CONTENT.centerX - totalWidth / 2;

  const boxes = [
    { label: "Design", x: startX },
    { label: "Design Engineer", x: startX + boxWidth + spacing, isPrimary: true },
    { label: "Engineering", x: startX + (boxWidth + spacing) * 2 },
  ];

  const arrowLength = spacing - 8;
  const arrowY = centerY;

  return (
    <Illustration
      title="Design Engineer Intersection"
      description="Design Engineers sit at the intersection of Design and Engineering"
      width={GRID.width}
      height={200}
    >
      {/* Connection lines with arrows */}
      {[0, 1].map((i) => {
        const x1 = boxes[i].x + boxWidth + 4;
        const x2 = boxes[i + 1].x - 4;
        const midX = (x1 + x2) / 2;

        return (
          <g key={`arrows-${i}`}>
            {/* Left arrow */}
            <line
              x1={x1}
              y1={arrowY}
              x2={midX - 4}
              y2={arrowY}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
            />
            <path
              d={`M ${midX - 8} ${arrowY - 3} L ${midX - 4} ${arrowY} L ${midX - 8} ${arrowY + 3}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Right arrow */}
            <line
              x1={x2}
              y1={arrowY}
              x2={midX + 4}
              y2={arrowY}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
            />
            <path
              d={`M ${midX + 8} ${arrowY - 3} L ${midX + 4} ${arrowY} L ${midX + 8} ${arrowY + 3}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* Boxes */}
      {boxes.map((box) => (
        <g key={box.label}>
          <Rect
            x={box.x}
            y={centerY - boxHeight / 2}
            width={boxWidth}
            height={boxHeight}
            fill={box.isPrimary ? ILLUSTRATION_COLORS.primary : "none"}
            stroke={box.isPrimary ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.muted}
            strokeWidth={box.isPrimary ? 0 : 1.5}
          />
          <text
            x={box.x + boxWidth / 2}
            y={centerY + 4}
            fontSize={box.isPrimary ? 11 : 12}
            fill={box.isPrimary ? ILLUSTRATION_COLORS.bg : "currentColor"}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight={box.isPrimary ? "700" : "500"}
          >
            {box.label}
          </text>
        </g>
      ))}

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={centerY + boxHeight / 2 + 32}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Bridging two disciplines
      </text>
    </Illustration>
  );
}

