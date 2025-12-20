import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ScrollAnimationTypes() {
  const sectionWidth = (CONTENT.width - 32) / 2;
  const leftX = CONTENT.left;
  const rightX = CONTENT.centerX + 16;

  return (
    <Illustration
      title="Scroll Animation Types"
      description="Scroll-triggered vs scroll-linked animations"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        SCROLL ANIMATION TYPES
      </Label>

      {/* Left: Scroll-Triggered */}
      <g>
        <Label x={leftX + sectionWidth / 2} y={CONTENT.top + 40} anchor="middle" fontSize={12}>
          SCROLL-TRIGGERED
        </Label>

        {/* Viewport representation */}
        <rect
          x={leftX + 20}
          y={CONTENT.top + 56}
          width={sectionWidth - 40}
          height={100}
          fill="none"
          stroke={ILLUSTRATION_COLORS.light}
          strokeWidth={1}
          strokeDasharray="4 2"
        />
        <text
          x={leftX + 28}
          y={CONTENT.top + 68}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          viewport
        </text>

        {/* Element entering - triggers animation */}
        <Rect
          x={leftX + 40}
          y={CONTENT.top + 110}
          width={sectionWidth - 80}
          height={30}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        
        {/* Arrow showing element movement */}
        <path
          d={`M ${leftX + sectionWidth / 2} ${CONTENT.top + 170} L ${leftX + sectionWidth / 2} ${CONTENT.top + 150}`}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
          markerEnd="url(#arrowhead)"
        />
        <Circle
          cx={leftX + sectionWidth / 2}
          cy={CONTENT.top + 175}
          r={8}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Description */}
        <text
          x={leftX + sectionWidth / 2}
          y={CONTENT.bottom - 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Plays once when
        </text>
        <text
          x={leftX + sectionWidth / 2}
          y={CONTENT.bottom - 12}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          element enters viewport
        </text>
      </g>

      {/* Right: Scroll-Linked */}
      <g>
        <Label x={rightX + sectionWidth / 2} y={CONTENT.top + 40} anchor="middle" fontSize={12}>
          SCROLL-LINKED
        </Label>

        {/* Page representation with scroll position */}
        <Rect
          x={rightX + 20}
          y={CONTENT.top + 56}
          width={sectionWidth - 40}
          height={100}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Progress bar - tied to scroll */}
        <Rect
          x={rightX + 20}
          y={CONTENT.top + 56}
          width={(sectionWidth - 40) * 0.6}
          height={4}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />

        {/* Scrollbar indicator */}
        <Rect
          x={rightX + sectionWidth - 28}
          y={CONTENT.top + 56}
          width={6}
          height={100}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />
        <Rect
          x={rightX + sectionWidth - 28}
          y={CONTENT.top + 56 + 30}
          width={6}
          height={24}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Parallax elements at different scroll rates */}
        <Rect
          x={rightX + 32}
          y={CONTENT.top + 80}
          width={40}
          height={24}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={rightX + 52}
          y={CONTENT.top + 96}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          0.5×
        </text>

        <Rect
          x={rightX + 80}
          y={CONTENT.top + 100}
          width={40}
          height={24}
          fill="currentColor"
          stroke="none"
        />
        <text
          x={rightX + 100}
          y={CONTENT.top + 116}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          1×
        </text>

        {/* Description */}
        <text
          x={rightX + sectionWidth / 2}
          y={CONTENT.bottom - 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Progress tied directly
        </text>
        <text
          x={rightX + sectionWidth / 2}
          y={CONTENT.bottom - 12}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          to scroll position
        </text>
      </g>

      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={ILLUSTRATION_COLORS.muted} />
        </marker>
      </defs>
    </Illustration>
  );
}
