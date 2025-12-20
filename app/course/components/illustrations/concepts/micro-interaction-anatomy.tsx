import {
  Illustration,
  Rect,
  Circle,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function MicroInteractionAnatomy() {
  const parts = [
    { label: "TRIGGER", icon: "click", color: ILLUSTRATION_COLORS.primary },
    { label: "RULES", icon: "logic", color: "currentColor" },
    { label: "FEEDBACK", icon: "visual", color: ILLUSTRATION_COLORS.muted },
    { label: "LOOPS", icon: "repeat", color: ILLUSTRATION_COLORS.light },
  ];

  const boxSize = 50;
  const totalWidth = parts.length * boxSize + (parts.length - 1) * 32;
  const startX = CONTENT.centerX - totalWidth / 2;
  const centerY = CONTENT.centerY;

  return (
    <Illustration
      title="Micro-interaction Anatomy"
      description="The four parts of every micro-interaction: trigger, rules, feedback, loops"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        ANATOMY OF A MICRO-INTERACTION
      </Label>

      {parts.map((part, index) => {
        const x = startX + index * (boxSize + 32);

        return (
          <g key={part.label}>
            {/* Circle container */}
            <Circle
              cx={x + boxSize / 2}
              cy={centerY}
              r={boxSize / 2}
              fill={part.color}
              stroke="none"
            />

            {/* Number inside */}
            <text
              x={x + boxSize / 2}
              y={centerY + 5}
              fontSize={16}
              fill={index === 0 ? ILLUSTRATION_COLORS.bg : ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
            >
              {index + 1}
            </text>

            {/* Label below */}
            <Label 
              x={x + boxSize / 2} 
              y={centerY + boxSize / 2 + 20} 
              anchor="middle"
              fontSize={11}
            >
              {part.label}
            </Label>

            {/* Arrow to next */}
            {index < parts.length - 1 && (
              <Arrow
                x1={x + boxSize + 4}
                y1={centerY}
                x2={x + boxSize + 28}
                y2={centerY}
                stroke={ILLUSTRATION_COLORS.muted}
              />
            )}
          </g>
        );
      })}

      {/* Examples row */}
      <g>
        <text
          x={startX + boxSize / 2}
          y={centerY + boxSize / 2 + 40}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          click, hover
        </text>
        <text
          x={startX + boxSize + 32 + boxSize / 2}
          y={centerY + boxSize / 2 + 40}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          if/then
        </text>
        <text
          x={startX + (boxSize + 32) * 2 + boxSize / 2}
          y={centerY + boxSize / 2 + 40}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          animation
        </text>
        <text
          x={startX + (boxSize + 32) * 3 + boxSize / 2}
          y={centerY + boxSize / 2 + 40}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          repeat
        </text>
      </g>
    </Illustration>
  );
}
