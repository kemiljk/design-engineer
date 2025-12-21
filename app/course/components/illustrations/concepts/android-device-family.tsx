import {
  Illustration,
  Rect,
  Label,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function AndroidDeviceFamily() {
  return (
    <Illustration
      title="Android Device Family"
      description="Design for phones, tablets, foldables, and Wear OS"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        ANDROID DEVICE VARIETY
      </Label>

      {/* Phone */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.top + 32})`}>
        <text
          x={30}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Phone
        </text>

        {/* Phone Frame */}
        <Rect
          x={0}
          y={10}
          width={60}
          height={120}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Status bar */}
        <Rect
          x={2}
          y={12}
          width={56}
          height={10}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* App bar */}
        <Rect
          x={2}
          y={22}
          width={56}
          height={16}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Content */}
        <Rect
          x={4}
          y={42}
          width={52}
          height={68}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Bottom nav */}
        <Rect
          x={2}
          y={112}
          width={56}
          height={16}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        <text
          x={30}
          y={148}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Compact (&lt;600dp)
        </text>
      </g>

      {/* Tablet */}
      <g transform={`translate(${CONTENT.left + 90}, ${CONTENT.top + 32})`}>
        <text
          x={65}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Tablet
        </text>

        {/* Tablet Frame */}
        <Rect
          x={0}
          y={10}
          width={130}
          height={100}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Status bar */}
        <Rect
          x={2}
          y={12}
          width={126}
          height={8}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Navigation rail */}
        <Rect
          x={2}
          y={20}
          width={24}
          height={88}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Content area */}
        <Rect
          x={28}
          y={20}
          width={100}
          height={88}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Two columns */}
        <Rect
          x={32}
          y={24}
          width={44}
          height={80}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <Rect
          x={80}
          y={24}
          width={44}
          height={80}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        <text
          x={65}
          y={128}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Expanded (&gt;840dp)
        </text>
      </g>

      {/* Foldable */}
      <g transform={`translate(${CONTENT.left + 248}, ${CONTENT.top + 32})`}>
        <text
          x={55}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Foldable
        </text>

        {/* Foldable Frame - Left half */}
        <Rect
          x={0}
          y={10}
          width={52}
          height={100}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Fold line */}
        <line
          x1={54}
          y1={10}
          x2={54}
          y2={110}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
          strokeDasharray="4,4"
        />

        {/* Foldable Frame - Right half */}
        <Rect
          x={56}
          y={10}
          width={52}
          height={100}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Left content */}
        <Rect
          x={4}
          y={16}
          width={44}
          height={88}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Right content */}
        <rect
          x={62}
          y={16}
          width={44}
          height={88}
          fill={ILLUSTRATION_COLORS.primary}
          fillOpacity={0.2}
        />

        <text
          x={55}
          y={128}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Multi-pane
        </text>
      </g>

      {/* Wear OS */}
      <g transform={`translate(${CONTENT.right - 68}, ${CONTENT.top + 32})`}>
        <text
          x={30}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Wear OS
        </text>

        {/* Watch circle */}
        <Circle
          cx={30}
          cy={56}
          r={40}
          fill={ILLUSTRATION_COLORS.dark}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Screen */}
        <Circle
          cx={30}
          cy={56}
          r={34}
          fill={ILLUSTRATION_COLORS.bg}
          stroke="none"
        />

        {/* Content */}
        <text
          x={30}
          y={48}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          10:30
        </text>
        <Rect
          x={12}
          y={56}
          width={36}
          height={6}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={30}
          y={76}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Steps: 5,432
        </text>

        <text
          x={30}
          y={118}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Glanceable
        </text>
      </g>

      {/* Window Size Classes */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.bottom - 80})`}>
        <text
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Window Size Classes
        </text>

        {/* Compact */}
        <g transform="translate(0, 16)">
          <Rect
            x={0}
            y={0}
            width={100}
            height={20}
            fill={ILLUSTRATION_COLORS.primary}
            stroke="none"
          />
          <text x={8} y={14} fontSize={9} fill={ILLUSTRATION_COLORS.bg} fontFamily="system-ui">
            Compact &lt;600dp
          </text>
        </g>

        {/* Medium */}
        <g transform="translate(108, 16)">
          <Rect
            x={0}
            y={0}
            width={130}
            height={20}
            fill={ILLUSTRATION_COLORS.dark}
            stroke="none"
          />
          <text x={8} y={14} fontSize={9} fill={ILLUSTRATION_COLORS.bg} fontFamily="system-ui">
            Medium 600-840dp
          </text>
        </g>

        {/* Expanded */}
        <g transform="translate(246, 16)">
          <Rect
            x={0}
            y={0}
            width={160}
            height={20}
            fill={ILLUSTRATION_COLORS.muted}
            stroke="none"
          />
          <text x={8} y={14} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Expanded &gt;840dp
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
        Use window size classes for responsive layouts
      </text>
    </Illustration>
  );
}
