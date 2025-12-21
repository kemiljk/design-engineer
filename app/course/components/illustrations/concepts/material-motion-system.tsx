import {
  Illustration,
  Rect,
  Label,
  Arrow,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function MaterialMotionSystem() {
  const sectionWidth = (CONTENT.width - 32) / 4;
  const sectionHeight = 100;
  const sectionTop = CONTENT.top + 40;

  return (
    <Illustration
      title="Material Motion Patterns"
      description="Material Design's four core motion patterns for transitions"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        MATERIAL MOTION PATTERNS
      </Label>

      {/* Container Transform */}
      <g>
        <text
          x={CONTENT.left + sectionWidth / 2}
          y={sectionTop}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Container Transform
        </text>

        {/* Before state - small card */}
        <Rect
          x={CONTENT.left + sectionWidth / 2 - 20}
          y={sectionTop + 16}
          width={40}
          height={30}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        <Arrow
          x1={CONTENT.left + sectionWidth / 2}
          y1={sectionTop + 54}
          x2={CONTENT.left + sectionWidth / 2}
          y2={sectionTop + 68}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* After state - expanded */}
        <Rect
          x={CONTENT.left + sectionWidth / 2 - 40}
          y={sectionTop + 74}
          width={80}
          height={50}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        <text
          x={CONTENT.left + sectionWidth / 2}
          y={sectionTop + 140}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Card → Detail
        </text>
      </g>

      {/* Shared Axis */}
      <g>
        <text
          x={CONTENT.left + sectionWidth * 1.5 + 8}
          y={sectionTop}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Shared Axis
        </text>

        {/* Horizontal slide */}
        <Rect
          x={CONTENT.left + sectionWidth + 20}
          y={sectionTop + 20}
          width={35}
          height={45}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />
        <Arrow
          x1={CONTENT.left + sectionWidth + 60}
          y1={sectionTop + 42}
          x2={CONTENT.left + sectionWidth + 78}
          y2={sectionTop + 42}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={1}
        />
        <Rect
          x={CONTENT.left + sectionWidth + 82}
          y={sectionTop + 20}
          width={35}
          height={45}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Axis line */}
        <line
          x1={CONTENT.left + sectionWidth + 20}
          y1={sectionTop + 80}
          x2={CONTENT.left + sectionWidth * 2}
          y2={sectionTop + 80}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={1}
          strokeDasharray="4,4"
        />

        {/* X Y Z labels */}
        <g transform={`translate(${CONTENT.left + sectionWidth + 16}, ${sectionTop + 94})`}>
          <text fontSize={9} fill={ILLUSTRATION_COLORS.primary} fontFamily="system-ui" fontWeight="600">
            X
          </text>
          <text x={28} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            Y
          </text>
          <text x={56} fontSize={9} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            Z
          </text>
        </g>

        <text
          x={CONTENT.left + sectionWidth * 1.5 + 8}
          y={sectionTop + 140}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Tabs / Pages
        </text>
      </g>

      {/* Fade Through */}
      <g>
        <text
          x={CONTENT.left + sectionWidth * 2.5 + 16}
          y={sectionTop}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Fade Through
        </text>

        {/* Fading out */}
        <rect
          x={CONTENT.left + sectionWidth * 2 + 24}
          y={sectionTop + 20}
          width={35}
          height={45}
          fill={ILLUSTRATION_COLORS.muted}
          fillOpacity={0.4}
        />

        {/* Arrow */}
        <Arrow
          x1={CONTENT.left + sectionWidth * 2 + 64}
          y1={sectionTop + 42}
          x2={CONTENT.left + sectionWidth * 2 + 82}
          y2={sectionTop + 42}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Fading in */}
        <Rect
          x={CONTENT.left + sectionWidth * 2 + 88}
          y={sectionTop + 20}
          width={35}
          height={45}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Opacity indicators */}
        <text
          x={CONTENT.left + sectionWidth * 2 + 42}
          y={sectionTop + 80}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          0%
        </text>
        <text
          x={CONTENT.left + sectionWidth * 2 + 106}
          y={sectionTop + 80}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          100%
        </text>

        <text
          x={CONTENT.left + sectionWidth * 2.5 + 16}
          y={sectionTop + 140}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Unrelated views
        </text>
      </g>

      {/* Fade */}
      <g>
        <text
          x={CONTENT.right - sectionWidth / 2}
          y={sectionTop}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Fade
        </text>

        {/* Opacity stages */}
        <rect
          x={CONTENT.right - sectionWidth + 8}
          y={sectionTop + 20}
          width={24}
          height={45}
          fill={ILLUSTRATION_COLORS.primary}
          fillOpacity={0.2}
        />
        <rect
          x={CONTENT.right - sectionWidth + 38}
          y={sectionTop + 20}
          width={24}
          height={45}
          fill={ILLUSTRATION_COLORS.primary}
          fillOpacity={0.5}
        />
        <rect
          x={CONTENT.right - sectionWidth + 68}
          y={sectionTop + 20}
          width={24}
          height={45}
          fill={ILLUSTRATION_COLORS.primary}
          fillOpacity={1}
        />

        <text
          x={CONTENT.right - sectionWidth / 2}
          y={sectionTop + 80}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          20% → 50% → 100%
        </text>

        <text
          x={CONTENT.right - sectionWidth / 2}
          y={sectionTop + 140}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Subtle changes
        </text>
      </g>

      {/* Timing section */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.bottom - 80})`}>
        <text
          fontSize={11}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Standard Durations
        </text>

        <g transform="translate(0, 20)">
          {[
            { label: "Small", duration: "100ms", width: 40 },
            { label: "Medium", duration: "250ms", width: 100 },
            { label: "Large", duration: "300ms", width: 120 },
            { label: "Complex", duration: "375ms", width: 150 },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(${i * 120}, 0)`}>
              <Rect
                x={0}
                y={0}
                width={item.width}
                height={6}
                fill={ILLUSTRATION_COLORS.primary}
                stroke="none"
              />
              <text x={0} y={20} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
                {item.label}
              </text>
              <text x={0} y={32} fontSize={8} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
                {item.duration}
              </text>
            </g>
          ))}
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
        Choose patterns based on the relationship between views
      </text>
    </Illustration>
  );
}
