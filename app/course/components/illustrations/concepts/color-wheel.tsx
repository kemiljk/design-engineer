import {
  Illustration,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ColorWheel() {
  const outerRadius = 70;
  const innerRadius = 40;
  const segments = 12;

  const wheelX = CONTENT.left + 100;
  const wheelY = CONTENT.top + outerRadius - 16;
  const wheelBottom = wheelY + outerRadius;

  const colors = [
    "hsl(0, 70%, 50%)",
    "hsl(30, 70%, 50%)",
    "hsl(60, 70%, 50%)",
    "hsl(90, 70%, 50%)",
    "hsl(120, 70%, 50%)",
    "hsl(150, 70%, 50%)",
    "hsl(180, 70%, 50%)",
    "hsl(210, 70%, 50%)",
    "hsl(240, 70%, 50%)",
    "hsl(270, 70%, 50%)",
    "hsl(300, 70%, 50%)",
    "hsl(330, 70%, 50%)",
  ];

  const barWidth = 140;
  const barHeight = 14;
  const barY = CONTENT.bottom;

  return (
    <Illustration
      title="Color Wheel"
      description="HSL color model showing hue variations around the wheel"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Color wheel segments */}
      {colors.map((color, i) => {
        const startAngle = (i * 360) / segments - 90;
        const endAngle = ((i + 1) * 360) / segments - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1Outer = wheelX + outerRadius * Math.cos(startRad);
        const y1Outer = wheelY + outerRadius * Math.sin(startRad);
        const x2Outer = wheelX + outerRadius * Math.cos(endRad);
        const y2Outer = wheelY + outerRadius * Math.sin(endRad);
        const x1Inner = wheelX + innerRadius * Math.cos(startRad);
        const y1Inner = wheelY + innerRadius * Math.sin(startRad);
        const x2Inner = wheelX + innerRadius * Math.cos(endRad);
        const y2Inner = wheelY + innerRadius * Math.sin(endRad);

        return (
          <path
            key={i}
            d={`M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner}`}
            fill={color}
          />
        );
      })}

      {/* Center label */}
      <Circle
        cx={wheelX}
        cy={wheelY}
        r={innerRadius - 4}
        fill={ILLUSTRATION_COLORS.bg}
        stroke="none"
      />
      <text
        x={wheelX}
        y={wheelY - 2}
        fontSize={13}
        fill="currentColor"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
      >
        HUE
      </text>
      <text
        x={wheelX}
        y={wheelY + 14}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        0°–360°
      </text>

      {/* HSL explanation - right side, aligned with wheel */}
      <g>
        <text
          x={wheelX + outerRadius + 40}
          y={wheelY - outerRadius + 18}
          fontSize={14}
          fill={ILLUSTRATION_COLORS.primary}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          H: Hue
        </text>
        <text
          x={wheelX + outerRadius + 40}
          y={wheelY - outerRadius + 36}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Color position
        </text>

        <text
          x={wheelX + outerRadius + 40}
          y={wheelY + 4}
          fontSize={14}
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          S: Saturation
        </text>
        <text
          x={wheelX + outerRadius + 40}
          y={wheelY + 22}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Color intensity
        </text>

        <text
          x={wheelX + outerRadius + 40}
          y={wheelY + outerRadius - 14}
          fontSize={14}
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          L: Lightness
        </text>
        <text
          x={wheelX + outerRadius + 40}
          y={wheelY + outerRadius + 4}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Light/dark
        </text>
      </g>

      {/* Saturation bar */}
      <g>
        <defs>
          <linearGradient id="satGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220, 0%, 50%)" />
            <stop offset="100%" stopColor="hsl(220, 100%, 50%)" />
          </linearGradient>
        </defs>
        <rect
          x={CONTENT.left}
          y={barY}
          width={barWidth}
          height={barHeight}
          rx={2}
          fill="url(#satGradient)"
        />
        <text
          x={CONTENT.left}
          y={barY - 6}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          SATURATION
        </text>
        <text
          x={CONTENT.left + barWidth}
          y={barY - 6}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="end"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          0%–100%
        </text>
      </g>

      {/* Lightness bar */}
      <g>
        <defs>
          <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220, 70%, 0%)" />
            <stop offset="50%" stopColor="hsl(220, 70%, 50%)" />
            <stop offset="100%" stopColor="hsl(220, 70%, 100%)" />
          </linearGradient>
        </defs>
        <rect
          x={CONTENT.right - barWidth}
          y={barY}
          width={barWidth}
          height={barHeight}
          rx={2}
          fill="url(#lightGradient)"
        />
        <text
          x={CONTENT.right - barWidth}
          y={barY - 6}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          LIGHTNESS
        </text>
        <text
          x={CONTENT.right}
          y={barY - 6}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="end"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          0%–100%
        </text>
      </g>
    </Illustration>
  );
}
