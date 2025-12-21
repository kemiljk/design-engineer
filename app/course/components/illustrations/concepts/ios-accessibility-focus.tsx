import {
  Illustration,
  Rect,
  Label,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function IosAccessibilityFocus() {
  const phoneWidth = 140;
  const phoneHeight = 280;
  const phoneLeft = CONTENT.centerX - phoneWidth / 2;
  const phoneTop = CONTENT.top + 20;

  return (
    <Illustration
      title="iOS Accessibility Focus Order"
      description="VoiceOver navigates elements in a logical top-to-bottom, left-to-right order"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        VOICEOVER FOCUS ORDER
      </Label>

      {/* iPhone Frame */}
      <Rect
        x={phoneLeft}
        y={phoneTop}
        width={phoneWidth}
        height={phoneHeight}
        fill={ILLUSTRATION_COLORS.bg}
        stroke={ILLUSTRATION_COLORS.dark}
        strokeWidth={2}
      />

      {/* Notch */}
      <Rect
        x={phoneLeft + phoneWidth / 2 - 30}
        y={phoneTop}
        width={60}
        height={16}
        fill={ILLUSTRATION_COLORS.dark}
        stroke="none"
      />

      {/* Navigation Bar - Focus 1 */}
      <g>
        <Rect
          x={phoneLeft + 10}
          y={phoneTop + 28}
          width={phoneWidth - 20}
          height={24}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
        />
        <text
          x={phoneLeft + phoneWidth / 2}
          y={phoneTop + 44}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Title
        </text>
        <Circle
          cx={phoneLeft + 22}
          cy={phoneTop + 40}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 22}
          y={phoneTop + 44}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          1
        </text>
      </g>

      {/* Hero Image - Focus 2 */}
      <g>
        <Rect
          x={phoneLeft + 10}
          y={phoneTop + 60}
          width={phoneWidth - 20}
          height={60}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={phoneLeft + phoneWidth / 2}
          y={phoneTop + 94}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Image
        </text>
        <Circle
          cx={phoneLeft + 22}
          cy={phoneTop + 72}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 22}
          y={phoneTop + 76}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          2
        </text>
      </g>

      {/* Heading - Focus 3 */}
      <g>
        <Rect
          x={phoneLeft + 10}
          y={phoneTop + 128}
          width={phoneWidth - 20}
          height={16}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <Circle
          cx={phoneLeft + 22}
          cy={phoneTop + 136}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 22}
          y={phoneTop + 140}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          3
        </text>
      </g>

      {/* Body Text - Focus 4 */}
      <g>
        <Rect
          x={phoneLeft + 10}
          y={phoneTop + 150}
          width={phoneWidth - 20}
          height={32}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <Circle
          cx={phoneLeft + 22}
          cy={phoneTop + 162}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 22}
          y={phoneTop + 166}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          4
        </text>
      </g>

      {/* Buttons Row - Focus 5 & 6 */}
      <g>
        <Rect
          x={phoneLeft + 10}
          y={phoneTop + 194}
          width={55}
          height={28}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 37}
          y={phoneTop + 212}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Primary
        </text>
        <Circle
          cx={phoneLeft + 10 + 55 - 8}
          cy={phoneTop + 194 + 8}
          r={8}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <text
          x={phoneLeft + 10 + 55 - 8}
          y={phoneTop + 194 + 12}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          5
        </text>

        <Rect
          x={phoneLeft + 75}
          y={phoneTop + 194}
          width={55}
          height={28}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={phoneLeft + 102}
          y={phoneTop + 212}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Secondary
        </text>
        <Circle
          cx={phoneLeft + 75 + 55 - 8}
          cy={phoneTop + 194 + 8}
          r={8}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <text
          x={phoneLeft + 75 + 55 - 8}
          y={phoneTop + 194 + 12}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          6
        </text>
      </g>

      {/* Tab Bar - Focus 7, 8, 9 */}
      <g>
        <Rect
          x={phoneLeft}
          y={phoneTop + phoneHeight - 44}
          width={phoneWidth}
          height={44}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />
        
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Rect
              x={phoneLeft + 10 + i * 44}
              y={phoneTop + phoneHeight - 38}
              width={32}
              height={32}
              fill="none"
              stroke="none"
            />
            <Circle
              cx={phoneLeft + 26 + i * 44}
              cy={phoneTop + phoneHeight - 26}
              r={8}
              fill={ILLUSTRATION_COLORS.dark}
              stroke="none"
            />
            <text
              x={phoneLeft + 26 + i * 44}
              y={phoneTop + phoneHeight - 22}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui"
              fontWeight="bold"
            >
              {7 + i}
            </text>
          </g>
        ))}
      </g>

      {/* Legend */}
      <g>
        <Circle
          cx={CONTENT.left + 8}
          cy={CONTENT.bottom - 16}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={CONTENT.left + 8}
          y={CONTENT.bottom - 12}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          1
        </text>
        <text
          x={CONTENT.left + 24}
          y={CONTENT.bottom - 12}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          = Focus order (swipe to navigate)
        </text>
      </g>

      {/* Side annotations */}
      <text
        x={CONTENT.right - 80}
        y={phoneTop + 60}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui"
      >
        Top to bottom
      </text>
      <text
        x={CONTENT.right - 80}
        y={phoneTop + 76}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui"
      >
        Left to right
      </text>
      <text
        x={CONTENT.right - 80}
        y={phoneTop + 92}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui"
      >
        within each row
      </text>
    </Illustration>
  );
}
