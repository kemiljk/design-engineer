import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function EventBubbling() {
  const boxWidth = 180;
  const boxHeight = 140;
  const centerX = CONTENT.left + boxWidth / 2 + 20;

  return (
    <Illustration
      title="Event Bubbling"
      description="Events bubble up from child to parent through the DOM tree"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        EVENT BUBBLING
      </Label>

      {/* Document - outermost */}
      <Rect
        x={CONTENT.left + 8}
        y={CONTENT.top + 32}
        width={boxWidth + 24}
        height={boxHeight + 24}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />
      <text
        x={CONTENT.left + 16}
        y={CONTENT.top + 48}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="monospace"
      >
        document
      </text>

      {/* Parent div */}
      <Rect
        x={CONTENT.left + 20}
        y={CONTENT.top + 56}
        width={boxWidth}
        height={boxHeight - 20}
        fill={ILLUSTRATION_COLORS.bg}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />
      <text
        x={CONTENT.left + 28}
        y={CONTENT.top + 72}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="monospace"
      >
        .parent
      </text>

      {/* Child button */}
      <Rect
        x={CONTENT.left + 40}
        y={CONTENT.top + 88}
        width={100}
        height={40}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <text
        x={CONTENT.left + 90}
        y={CONTENT.top + 112}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.bg}
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="600"
      >
        button
      </text>

      {/* Click indicator */}
      <Circle
        cx={CONTENT.left + 90}
        cy={CONTENT.top + 108}
        r={6}
        fill="none"
        stroke={ILLUSTRATION_COLORS.bg}
        strokeWidth={1}
      />

      {/* Bubbling arrows */}
      <g>
        {/* Arrow 1: button → parent */}
        <path
          d={`M ${CONTENT.left + 150} ${CONTENT.top + 108} 
              C ${CONTENT.left + 180} ${CONTENT.top + 108}, 
                ${CONTENT.left + 180} ${CONTENT.top + 80}, 
                ${CONTENT.left + 180} ${CONTENT.top + 70}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
          markerEnd="url(#bubbleArrow)"
        />
        <Circle
          cx={CONTENT.left + 180}
          cy={CONTENT.top + 60}
          r={12}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={CONTENT.left + 180}
          y={CONTENT.top + 64}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontWeight="600"
        >
          1
        </text>

        {/* Arrow 2: parent → document */}
        <path
          d={`M ${CONTENT.left + 195} ${CONTENT.top + 70} 
              C ${CONTENT.left + 210} ${CONTENT.top + 70}, 
                ${CONTENT.left + 210} ${CONTENT.top + 50}, 
                ${CONTENT.left + 210} ${CONTENT.top + 45}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          markerEnd="url(#bubbleArrow2)"
        />
        <Circle
          cx={CONTENT.left + 210}
          cy={CONTENT.top + 36}
          r={12}
          fill="currentColor"
          stroke="none"
        />
        <text
          x={CONTENT.left + 210}
          y={CONTENT.top + 40}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontWeight="600"
        >
          2
        </text>
      </g>

      {/* Explanation - right side */}
      <g>
        <text
          x={CONTENT.right - 100}
          y={CONTENT.top + 52}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.primary}
          fontFamily="system-ui"
          fontWeight="600"
        >
          1. Click fires on button
        </text>
        <text
          x={CONTENT.right - 100}
          y={CONTENT.top + 80}
          fontSize={12}
          fill="currentColor"
          fontFamily="system-ui"
          fontWeight="600"
        >
          2. Bubbles up to parent
        </text>
        <text
          x={CONTENT.right - 100}
          y={CONTENT.top + 108}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
          fontWeight="600"
        >
          3. Then to document
        </text>

        {/* stopPropagation note */}
        <text
          x={CONTENT.right - 100}
          y={CONTENT.top + 140}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="monospace"
        >
          stopPropagation()
        </text>
        <text
          x={CONTENT.right - 100}
          y={CONTENT.top + 154}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          stops the bubble
        </text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker
          id="bubbleArrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={ILLUSTRATION_COLORS.primary} />
        </marker>
        <marker
          id="bubbleArrow2"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
        </marker>
      </defs>

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 4}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Event delegation: listen on parent, check event.target
      </text>
    </Illustration>
  );
}
