import {
  Illustration,
  Rect,
  Line,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function PrototypeFidelity() {
  const levels = [
    { 
      label: "SKETCH",
      time: "Minutes",
      render: (x: number, y: number) => (
        <g>
          {/* Rough sketch */}
          <rect x={x} y={y} width={50} height={60} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1} strokeDasharray="4 4" />
          <Line x1={x + 5} y1={y + 8} x2={x + 35} y2={y + 8} stroke={ILLUSTRATION_COLORS.muted} strokeWidth={2} />
          <Line x1={x + 5} y1={y + 20} x2={x + 45} y2={y + 20} stroke={ILLUSTRATION_COLORS.light} strokeWidth={1} />
          <Line x1={x + 5} y1={y + 28} x2={x + 40} y2={y + 28} stroke={ILLUSTRATION_COLORS.light} strokeWidth={1} />
          <rect x={x + 5} y={y + 42} width={20} height={10} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1} />
        </g>
      )
    },
    { 
      label: "WIREFRAME",
      time: "Hours",
      render: (x: number, y: number) => (
        <g>
          <Rect x={x} y={y} width={50} height={60} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1} />
          <Rect x={x + 4} y={y + 4} width={42} height={10} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={x + 4} y={y + 18} width={42} height={4} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={x + 4} y={y + 26} width={36} height={4} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={x + 4} y={y + 34} width={42} height={4} fill={ILLUSTRATION_COLORS.light} stroke="none" />
          <Rect x={x + 4} y={y + 46} width={24} height={10} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        </g>
      )
    },
    { 
      label: "MOCKUP",
      time: "Hours-Days",
      render: (x: number, y: number) => (
        <g>
          <Rect x={x} y={y} width={50} height={60} fill={ILLUSTRATION_COLORS.bg} stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1} />
          <Rect x={x + 4} y={y + 4} width={42} height={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
          <Rect x={x + 4} y={y + 18} width={42} height={4} fill="currentColor" stroke="none" />
          <Rect x={x + 4} y={y + 26} width={36} height={4} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
          <Rect x={x + 4} y={y + 34} width={42} height={4} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
          <Rect x={x + 4} y={y + 46} width={24} height={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
        </g>
      )
    },
    { 
      label: "PROTOTYPE",
      time: "Days",
      render: (x: number, y: number) => (
        <g>
          <Rect x={x} y={y} width={50} height={60} fill={ILLUSTRATION_COLORS.bg} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={2} />
          <Rect x={x + 4} y={y + 4} width={42} height={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
          <Rect x={x + 4} y={y + 18} width={42} height={4} fill="currentColor" stroke="none" />
          <Rect x={x + 4} y={y + 26} width={36} height={4} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
          <Rect x={x + 4} y={y + 34} width={42} height={4} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
          <Rect x={x + 4} y={y + 46} width={24} height={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
          {/* Interactive indicator */}
          <circle cx={x + 50} cy={y + 30} r={6} fill={ILLUSTRATION_COLORS.primary} />
          <text x={x + 50} y={y + 33} fontSize={11} fill={ILLUSTRATION_COLORS.bg} textAnchor="middle">▶</text>
        </g>
      )
    },
  ];

  const cardWidth = 70;
  const totalWidth = levels.length * cardWidth + (levels.length - 1) * 16;
  const startX = CONTENT.centerX - totalWidth / 2;
  const centerY = CONTENT.centerY;

  return (
    <Illustration
      title="Prototype Fidelity"
      description="The spectrum from rough sketches to interactive prototypes"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        PROTOTYPE FIDELITY SPECTRUM
      </Label>

      {/* Fidelity arrow */}
      <Arrow
        x1={startX}
        y1={CONTENT.top + 40}
        x2={startX + totalWidth}
        y2={CONTENT.top + 40}
        stroke={ILLUSTRATION_COLORS.muted}
      />
      <text
        x={startX}
        y={CONTENT.top + 34}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Low
      </text>
      <text
        x={startX + totalWidth - 20}
        y={CONTENT.top + 34}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.primary}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        High
      </text>

      {levels.map((level, index) => {
        const x = startX + index * (cardWidth + 16);

        return (
          <g key={level.label}>
            {/* Render preview */}
            {level.render(x + 10, centerY - 30)}

            {/* Label */}
            <Label 
              x={x + cardWidth / 2} 
              y={centerY + 48} 
              anchor="middle"
              fontSize={11}
            >
              {level.label}
            </Label>

            {/* Time indicator */}
            <text
              x={x + cardWidth / 2}
              y={centerY + 62}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {level.time}
            </text>
          </g>
        );
      })}
    </Illustration>
  );
}
