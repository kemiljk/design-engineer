import {
  Illustration,
  Rect,
  Circle,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function AtomicDesign() {
  const boxWidth = 130;
  const boxHeight = 100;
  const gap = 32;
  const totalWidth = 3 * boxWidth + 2 * gap;
  const startX = CONTENT.centerX - totalWidth / 2;
  const centerY = CONTENT.centerY;

  const levels = [
    { 
      label: "ATOMS", 
      desc: "Button, Input, Icon",
      render: (cx: number, cy: number) => (
        <g>
          <Circle cx={cx - 28} cy={cy} r={12} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
          <Circle cx={cx} cy={cy} r={12} fill="currentColor" stroke="none" />
          <Circle cx={cx + 28} cy={cy} r={12} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        </g>
      )
    },
    { 
      label: "MOLECULES", 
      desc: "Search Bar, Form Field",
      render: (cx: number, cy: number) => (
        <g>
          {/* Search bar container */}
          <Rect x={cx - 50} y={cy - 16} width={100} height={32} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          {/* Search button inside */}
          <Circle cx={cx + 36} cy={cy} r={12} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
        </g>
      )
    },
    { 
      label: "ORGANISMS", 
      desc: "Header, Card, Form",
      render: (cx: number, cy: number) => (
        <g>
          <Rect x={cx - 50} y={cy - 28} width={100} height={56} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1} />
          <Rect x={cx - 42} y={cy - 20} width={32} height={12} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
          <Rect x={cx - 4} y={cy - 20} width={48} height={12} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={cx - 42} y={cy} width={84} height={10} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={cx - 42} y={cy + 16} width={60} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
        </g>
      )
    },
  ];

  return (
    <Illustration
      title="Atomic Design"
      description="Component hierarchy from atoms to molecules to organisms"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 16} anchor="middle">
        ATOMIC DESIGN HIERARCHY
      </Label>

      {levels.map((level, index) => {
        const boxX = startX + index * (boxWidth + gap);
        const boxCenterX = boxX + boxWidth / 2;

        return (
          <g key={level.label}>
            {/* Label above */}
            <Label 
              x={boxCenterX} 
              y={centerY - boxHeight / 2 - 16} 
              anchor="middle"
              fontSize={12}
            >
              {level.label}
            </Label>

            {/* Container box */}
            <Rect
              x={boxX}
              y={centerY - boxHeight / 2}
              width={boxWidth}
              height={boxHeight}
              fill="none"
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />

            {/* Render component visualization centered in box */}
            {level.render(boxCenterX, centerY)}

            {/* Description below */}
            <text
              x={boxCenterX}
              y={centerY + boxHeight / 2 + 20}
              fontSize={11}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {level.desc}
            </text>

            {/* Arrow to next level */}
            {index < levels.length - 1 && (
              <Arrow
                x1={boxX + boxWidth + 8}
                y1={centerY}
                x2={boxX + boxWidth + gap - 8}
                y2={centerY}
                stroke={ILLUSTRATION_COLORS.muted}
              />
            )}
          </g>
        );
      })}

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 16}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Simple → Complex | Reusable building blocks
      </text>
    </Illustration>
  );
}
