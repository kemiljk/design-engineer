import {
  Illustration,
  Rect,
  Label,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function AndroidAccessibilityFocus() {
  const phoneWidth = 140;
  const phoneHeight = 280;
  const phoneLeft = CONTENT.centerX - phoneWidth / 2;
  const phoneTop = CONTENT.top + 20;

  return (
    <Illustration
      title="Android Accessibility Focus Order"
      description="TalkBack navigates elements sequentially for screen reader users"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        TALKBACK FOCUS ORDER
      </Label>

      {/* Android Phone Frame */}
      <Rect
        x={phoneLeft}
        y={phoneTop}
        width={phoneWidth}
        height={phoneHeight}
        fill={ILLUSTRATION_COLORS.bg}
        stroke={ILLUSTRATION_COLORS.dark}
        strokeWidth={2}
      />

      {/* Status Bar */}
      <Rect
        x={phoneLeft}
        y={phoneTop}
        width={phoneWidth}
        height={16}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />

      {/* Top App Bar - Focus 1 */}
      <g>
        <Rect
          x={phoneLeft}
          y={phoneTop + 16}
          width={phoneWidth}
          height={36}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + phoneWidth / 2}
          y={phoneTop + 40}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          App Title
        </text>
        <Circle
          cx={phoneLeft + 20}
          cy={phoneTop + 34}
          r={8}
          fill={ILLUSTRATION_COLORS.bg}
          stroke="none"
        />
        <text
          x={phoneLeft + 20}
          y={phoneTop + 38}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.primary}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          1
        </text>
      </g>

      {/* Card 1 - Focus 2, 3, 4 */}
      <g>
        <Rect
          x={phoneLeft + 8}
          y={phoneTop + 60}
          width={phoneWidth - 16}
          height={80}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        
        {/* Card Image */}
        <Rect
          x={phoneLeft + 16}
          y={phoneTop + 68}
          width={40}
          height={40}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />
        <Circle
          cx={phoneLeft + 16 + 32}
          cy={phoneTop + 68 + 8}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 16 + 32}
          y={phoneTop + 68 + 12}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          2
        </text>

        {/* Card Title */}
        <Rect
          x={phoneLeft + 64}
          y={phoneTop + 68}
          width={56}
          height={12}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <Circle
          cx={phoneLeft + 64 + 48}
          cy={phoneTop + 68 + 6}
          r={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 64 + 48}
          y={phoneTop + 68 + 10}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          3
        </text>

        {/* Card Subtitle */}
        <Rect
          x={phoneLeft + 64}
          y={phoneTop + 84}
          width={40}
          height={8}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Card Action Button */}
        <Rect
          x={phoneLeft + 16}
          y={phoneTop + 116}
          width={48}
          height={20}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + 40}
          y={phoneTop + 130}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Action
        </text>
        <Circle
          cx={phoneLeft + 16 + 40}
          cy={phoneTop + 116 + 6}
          r={8}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <text
          x={phoneLeft + 16 + 40}
          y={phoneTop + 116 + 10}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          4
        </text>
      </g>

      {/* List Items - Focus 5, 6, 7 */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Rect
            x={phoneLeft + 8}
            y={phoneTop + 150 + i * 36}
            width={phoneWidth - 16}
            height={32}
            fill={ILLUSTRATION_COLORS.light}
            stroke="none"
          />
          <Rect
            x={phoneLeft + 16}
            y={phoneTop + 158 + i * 36}
            width={80}
            height={8}
            fill={ILLUSTRATION_COLORS.dark}
            stroke="none"
          />
          <Rect
            x={phoneLeft + 16}
            y={phoneTop + 168 + i * 36}
            width={50}
            height={6}
            fill={ILLUSTRATION_COLORS.muted}
            stroke="none"
          />
          <Circle
            cx={phoneLeft + phoneWidth - 24}
            cy={phoneTop + 166 + i * 36}
            r={8}
            fill={ILLUSTRATION_COLORS.primary}
            stroke="none"
          />
          <text
            x={phoneLeft + phoneWidth - 24}
            y={phoneTop + 170 + i * 36}
            fontSize={9}
            fill={ILLUSTRATION_COLORS.bg}
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="bold"
          >
            {5 + i}
          </text>
        </g>
      ))}

      {/* FAB - Focus 8 */}
      <g>
        <Circle
          cx={phoneLeft + phoneWidth - 28}
          cy={phoneTop + phoneHeight - 60}
          r={20}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={phoneLeft + phoneWidth - 28}
          y={phoneTop + phoneHeight - 56}
          fontSize={16}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="300"
        >
          +
        </text>
        <Circle
          cx={phoneLeft + phoneWidth - 16}
          cy={phoneTop + phoneHeight - 72}
          r={8}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <text
          x={phoneLeft + phoneWidth - 16}
          y={phoneTop + phoneHeight - 68}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          8
        </text>
      </g>

      {/* Navigation Bar */}
      <Rect
        x={phoneLeft}
        y={phoneTop + phoneHeight - 24}
        width={phoneWidth}
        height={24}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />

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
          = TalkBack focus order (swipe to navigate)
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
        48dp minimum
      </text>
      <text
        x={CONTENT.right - 80}
        y={phoneTop + 76}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui"
      >
        touch targets
      </text>
    </Illustration>
  );
}
