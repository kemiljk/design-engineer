import {
  Illustration,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function EasingCurves() {
  const curves = [
    { 
      label: "LINEAR", 
      path: "M 0,1 L 1,0",
      description: "Constant speed"
    },
    { 
      label: "EASE-OUT", 
      path: "M 0,1 C 0,0.5 0.2,0 1,0",
      description: "Fast start, slow end"
    },
    { 
      label: "EASE-IN", 
      path: "M 0,1 C 0.8,1 1,0.5 1,0",
      description: "Slow start, fast end"
    },
    { 
      label: "EASE-IN-OUT", 
      path: "M 0,1 C 0.4,1 0.6,0 1,0",
      description: "Slow start and end"
    },
  ];

  const graphSize = 60;
  const totalWidth = curves.length * graphSize + (curves.length - 1) * 16;
  const startX = CONTENT.centerX - totalWidth / 2;
  const graphY = CONTENT.top + 48;

  return (
    <Illustration
      title="Easing Curves"
      description="Common easing functions used in UI animation"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        EASING FUNCTIONS
      </Label>

      {curves.map((curve, index) => {
        const x = startX + index * (graphSize + 16);

        return (
          <g key={curve.label}>
            {/* Graph background */}
            <rect
              x={x}
              y={graphY}
              width={graphSize}
              height={graphSize}
              fill="none"
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />

            {/* ViewGrid lines */}
            <Line
              x1={x}
              y1={graphY + graphSize / 2}
              x2={x + graphSize}
              y2={graphY + graphSize / 2}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={0.5}
            />
            <Line
              x1={x + graphSize / 2}
              y1={graphY}
              x2={x + graphSize / 2}
              y2={graphY + graphSize}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={0.5}
            />

            {/* Curve */}
            <path
              d={curve.path}
              fill="none"
              stroke={ILLUSTRATION_COLORS.primary}
              strokeWidth={2}
              transform={`translate(${x}, ${graphY}) scale(${graphSize}, ${graphSize})`}
            />

            {/* Start and end points */}
            <circle
              cx={x}
              cy={graphY + graphSize}
              r={3}
              fill={ILLUSTRATION_COLORS.primary}
            />
            <circle
              cx={x + graphSize}
              cy={graphY}
              r={3}
              fill={ILLUSTRATION_COLORS.primary}
            />

            {/* Axis labels */}
            <text
              x={x}
              y={graphY + graphSize + 12}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              0
            </text>
            <text
              x={x + graphSize - 4}
              y={graphY + graphSize + 12}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              1
            </text>

            {/* Curve label */}
            <Label 
              x={x + graphSize / 2} 
              y={graphY + graphSize + 28} 
              anchor="middle"
              fontSize={11}
            >
              {curve.label}
            </Label>
          </g>
        );
      })}

      {/* Time/Progress axis labels */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ letterSpacing: "0.03em" }}
      >
        TIME →
      </text>
      <text
        x={startX - 12}
        y={graphY + graphSize / 2}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        transform={`rotate(-90, ${startX - 12}, ${graphY + graphSize / 2})`}
        style={{ letterSpacing: "0.03em" }}
      >
        PROGRESS →
      </text>
    </Illustration>
  );
}
