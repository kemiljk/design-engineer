import {
  Illustration,
  Rect,
  Label,
  Circle,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function IosSpringAnimation() {
  const graphWidth = 200;
  const graphHeight = 120;
  const graphLeft = CONTENT.left + 20;
  const graphTop = CONTENT.top + 40;

  return (
    <Illustration
      title="iOS Spring Animation"
      description="Spring animations create natural, physics-based motion in iOS"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        SPRING ANIMATION PARAMETERS
      </Label>

      {/* Graph Background */}
      <Rect
        x={graphLeft}
        y={graphTop}
        width={graphWidth}
        height={graphHeight}
        fill={ILLUSTRATION_COLORS.light}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={1}
      />

      {/* Grid Lines */}
      {[0.25, 0.5, 0.75].map((pos) => (
        <Line
          key={`h-${pos}`}
          x1={graphLeft}
          y1={graphTop + graphHeight * pos}
          x2={graphLeft + graphWidth}
          y2={graphTop + graphHeight * pos}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={0.5}
          strokeDasharray="4,4"
        />
      ))}

      {/* Axis Labels */}
      <text
        x={graphLeft - 8}
        y={graphTop + 4}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="end"
        fontFamily="system-ui"
      >
        1.0
      </text>
      <text
        x={graphLeft - 8}
        y={graphTop + graphHeight}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="end"
        fontFamily="system-ui"
      >
        0
      </text>
      <text
        x={graphLeft}
        y={graphTop + graphHeight + 14}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui"
      >
        0s
      </text>
      <text
        x={graphLeft + graphWidth}
        y={graphTop + graphHeight + 14}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="end"
        fontFamily="system-ui"
      >
        0.5s
      </text>

      {/* High Damping Curve (0.9) - Smooth */}
      <path
        d={`M ${graphLeft} ${graphTop + graphHeight}
            Q ${graphLeft + graphWidth * 0.3} ${graphTop + graphHeight * 0.2}
              ${graphLeft + graphWidth * 0.5} ${graphTop + graphHeight * 0.1}
            Q ${graphLeft + graphWidth * 0.7} ${graphTop}
              ${graphLeft + graphWidth} ${graphTop + graphHeight * 0.02}`}
        fill="none"
        stroke={ILLUSTRATION_COLORS.primary}
        strokeWidth={2}
      />

      {/* Medium Damping Curve (0.7) - Slight Bounce */}
      <path
        d={`M ${graphLeft} ${graphTop + graphHeight}
            Q ${graphLeft + graphWidth * 0.2} ${graphTop - graphHeight * 0.1}
              ${graphLeft + graphWidth * 0.4} ${graphTop + graphHeight * 0.05}
            Q ${graphLeft + graphWidth * 0.55} ${graphTop + graphHeight * 0.12}
              ${graphLeft + graphWidth * 0.7} ${graphTop + graphHeight * 0.02}
            Q ${graphLeft + graphWidth * 0.85} ${graphTop - graphHeight * 0.02}
              ${graphLeft + graphWidth} ${graphTop + graphHeight * 0.02}`}
        fill="none"
        stroke={ILLUSTRATION_COLORS.dark}
        strokeWidth={2}
        strokeDasharray="6,3"
      />

      {/* Low Damping Curve (0.5) - Bouncy */}
      <path
        d={`M ${graphLeft} ${graphTop + graphHeight}
            Q ${graphLeft + graphWidth * 0.15} ${graphTop - graphHeight * 0.2}
              ${graphLeft + graphWidth * 0.3} ${graphTop + graphHeight * 0.15}
            Q ${graphLeft + graphWidth * 0.42} ${graphTop + graphHeight * 0.25}
              ${graphLeft + graphWidth * 0.52} ${graphTop - graphHeight * 0.05}
            Q ${graphLeft + graphWidth * 0.62} ${graphTop + graphHeight * 0.08}
              ${graphLeft + graphWidth * 0.72} ${graphTop + graphHeight * 0.02}
            Q ${graphLeft + graphWidth * 0.86} ${graphTop}
              ${graphLeft + graphWidth} ${graphTop + graphHeight * 0.02}`}
        fill="none"
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Legend */}
      <g transform={`translate(${graphLeft}, ${graphTop + graphHeight + 30})`}>
        <Line x1={0} y1={0} x2={20} y2={0} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={2} />
        <text x={28} y={4} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
          Damping 0.9 (smooth)
        </text>

        <Line x1={0} y1={16} x2={20} y2={16} stroke={ILLUSTRATION_COLORS.dark} strokeWidth={2} strokeDasharray="6,3" />
        <text x={28} y={20} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
          Damping 0.7 (slight bounce)
        </text>

        <Line x1={0} y1={32} x2={20} y2={32} stroke={ILLUSTRATION_COLORS.muted} strokeWidth={2} />
        <text x={28} y={36} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
          Damping 0.5 (bouncy)
        </text>
      </g>

      {/* Examples Panel */}
      <g transform={`translate(${CONTENT.centerX + 40}, ${graphTop})`}>
        <text
          x={0}
          y={0}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Common Uses
        </text>

        {/* Navigation */}
        <g transform="translate(0, 20)">
          <Rect
            x={0}
            y={0}
            width={100}
            height={28}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={18} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Navigation
          </text>
          <text x={108} y={18} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            0.85
          </text>
        </g>

        {/* Button Press */}
        <g transform="translate(0, 56)">
          <Rect
            x={0}
            y={0}
            width={100}
            height={28}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={18} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Button press
          </text>
          <text x={108} y={18} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            0.9
          </text>
        </g>

        {/* Modal */}
        <g transform="translate(0, 92)">
          <Rect
            x={0}
            y={0}
            width={100}
            height={28}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={18} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Modal sheet
          </text>
          <text x={108} y={18} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            0.75
          </text>
        </g>

        {/* Playful */}
        <g transform="translate(0, 128)">
          <Rect
            x={0}
            y={0}
            width={100}
            height={28}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={18} fontSize={10} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Playful bounce
          </text>
          <text x={108} y={18} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            0.5
          </text>
        </g>
      </g>

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 4}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        iOS springs feel natural because they follow real physics
      </text>
    </Illustration>
  );
}
