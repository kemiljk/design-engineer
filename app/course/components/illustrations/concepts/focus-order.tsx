import {
  Illustration,
  Rect,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function FocusOrder() {
  const elements = [
    { x: CONTENT.left + 20, y: CONTENT.top + 50, w: 60, h: 20, label: "Logo" },
    { x: CONTENT.left + 100, y: CONTENT.top + 50, w: 40, h: 20, label: "Nav 1" },
    { x: CONTENT.left + 150, y: CONTENT.top + 50, w: 40, h: 20, label: "Nav 2" },
    { x: CONTENT.left + 200, y: CONTENT.top + 50, w: 40, h: 20, label: "Nav 3" },
    { x: CONTENT.right - 70, y: CONTENT.top + 50, w: 50, h: 20, label: "Login" },
    { x: CONTENT.left + 40, y: CONTENT.centerY, w: 200, h: 24, label: "Search Input" },
    { x: CONTENT.left + 250, y: CONTENT.centerY, w: 60, h: 24, label: "Search" },
    { x: CONTENT.left + 40, y: CONTENT.bottom - 50, w: 80, h: 24, label: "Submit" },
  ];

  return (
    <Illustration
      title="Focus Order"
      description="Tab navigation follows logical visual order through the page"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        KEYBOARD FOCUS ORDER
      </Label>

      {/* Page outline */}
      <Rect
        x={CONTENT.left + 8}
        y={CONTENT.top + 32}
        width={CONTENT.width - 16}
        height={CONTENT.height - 56}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />

      {/* Elements with focus numbers */}
      {elements.map((el, i) => (
        <g key={i}>
          {/* Element */}
          <Rect
            x={el.x}
            y={el.y}
            width={el.w}
            height={el.h}
            fill={i === 0 ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.light}
            stroke="none"
          />
          
          {/* Element label */}
          <text
            x={el.x + el.w / 2}
            y={el.y + el.h / 2 + 3}
            fontSize={10}
            fill={i === 0 ? ILLUSTRATION_COLORS.bg : ILLUSTRATION_COLORS.muted}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {el.label}
          </text>

          {/* Focus number */}
          <Circle
            cx={el.x + el.w + 8}
            cy={el.y - 4}
            r={9}
            fill={ILLUSTRATION_COLORS.primary}
            stroke="none"
          />
          <text
            x={el.x + el.w + 8}
            y={el.y}
            fontSize={12}
            fill={ILLUSTRATION_COLORS.bg}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
          >
            {i + 1}
          </text>

          {/* Connection line to next */}
          {i < elements.length - 1 && (
            <Line
              x1={el.x + el.w + 16}
              y1={el.y - 4}
              x2={elements[i + 1].x + elements[i + 1].w + 2}
              y2={elements[i + 1].y - 4}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
              strokeDasharray="4 2"
            />
          )}
        </g>
      ))}

      {/* Tab key indicator */}
      <g>
        <Rect
          x={CONTENT.right - 60}
          y={CONTENT.bottom - 36}
          width={40}
          height={20}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={CONTENT.right - 40}
          y={CONTENT.bottom - 22}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          Tab ↹
        </text>
      </g>
    </Illustration>
  );
}
