import {
  Illustration,
  Rect,
  Label,
  Arrow,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function DesignHandoffFlow() {
  const stageWidth = 100;
  const stageHeight = 60;
  const stageY = CONTENT.top + 50;

  return (
    <Illustration
      title="Design Handoff Flow"
      description="The process of preparing and handing off designs to developers"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        DESIGN TO DEVELOPMENT HANDOFF
      </Label>

      {/* Stage 1: Design */}
      <g transform={`translate(${CONTENT.left}, ${stageY})`}>
        <Rect
          x={0}
          y={0}
          width={stageWidth}
          height={stageHeight}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={stageWidth / 2}
          y={24}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          1. Design
        </text>
        <text
          x={stageWidth / 2}
          y={40}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          opacity={0.8}
        >
          Create mockups
        </text>

        {/* Icon */}
        <Rect
          x={stageWidth / 2 - 8}
          y={-20}
          width={16}
          height={16}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
        />
      </g>

      <Arrow
        x1={CONTENT.left + stageWidth + 8}
        y1={stageY + stageHeight / 2}
        x2={CONTENT.left + stageWidth + 32}
        y2={stageY + stageHeight / 2}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Stage 2: Spec */}
      <g transform={`translate(${CONTENT.left + stageWidth + 40}, ${stageY})`}>
        <Rect
          x={0}
          y={0}
          width={stageWidth}
          height={stageHeight}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
        <text
          x={stageWidth / 2}
          y={24}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          2. Spec
        </text>
        <text
          x={stageWidth / 2}
          y={40}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          opacity={0.8}
        >
          Document details
        </text>

        {/* Icon - document */}
        <Rect
          x={stageWidth / 2 - 7}
          y={-20}
          width={14}
          height={18}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />
        <line
          x1={stageWidth / 2 - 3}
          y1={-14}
          x2={stageWidth / 2 + 3}
          y2={-14}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={1}
        />
        <line
          x1={stageWidth / 2 - 3}
          y1={-10}
          x2={stageWidth / 2 + 3}
          y2={-10}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={1}
        />
      </g>

      <Arrow
        x1={CONTENT.left + stageWidth * 2 + 48}
        y1={stageY + stageHeight / 2}
        x2={CONTENT.left + stageWidth * 2 + 72}
        y2={stageY + stageHeight / 2}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Stage 3: Handoff */}
      <g transform={`translate(${CONTENT.left + stageWidth * 2 + 80}, ${stageY})`}>
        <Rect
          x={0}
          y={0}
          width={stageWidth}
          height={stageHeight}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />
        <text
          x={stageWidth / 2}
          y={24}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          3. Handoff
        </text>
        <text
          x={stageWidth / 2}
          y={40}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          opacity={0.8}
        >
          Share with devs
        </text>

        {/* Icon - handoff */}
        <Circle
          cx={stageWidth / 2 - 8}
          cy={-12}
          r={6}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <Arrow
          x1={stageWidth / 2 - 2}
          y1={-12}
          x2={stageWidth / 2 + 12}
          y2={-12}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />
        <Circle
          cx={stageWidth / 2 + 8}
          cy={-12}
          r={6}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />
      </g>

      <Arrow
        x1={CONTENT.left + stageWidth * 3 + 88}
        y1={stageY + stageHeight / 2}
        x2={CONTENT.left + stageWidth * 3 + 112}
        y2={stageY + stageHeight / 2}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Stage 4: QA */}
      <g transform={`translate(${CONTENT.left + stageWidth * 3 + 120}, ${stageY})`}>
        <Rect
          x={0}
          y={0}
          width={stageWidth}
          height={stageHeight}
          fill={ILLUSTRATION_COLORS.light}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={2}
        />
        <text
          x={stageWidth / 2}
          y={24}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          4. QA
        </text>
        <text
          x={stageWidth / 2}
          y={40}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Verify accuracy
        </text>

        {/* Icon - checkmark */}
        <Circle
          cx={stageWidth / 2}
          cy={-12}
          r={10}
          fill="none"
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
        />
        <polyline
          points={`${stageWidth / 2 - 5},-12 ${stageWidth / 2 - 1},-8 ${stageWidth / 2 + 6},-18`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={2}
        />
      </g>

      {/* Spec Details */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.bottom - 120})`}>
        <text
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          What to Include in Specs
        </text>

        {/* Grid of spec items */}
        {[
          { label: "Spacing", detail: "dp/pt values" },
          { label: "Typography", detail: "Text styles" },
          { label: "Colors", detail: "Semantic tokens" },
          { label: "States", detail: "All variations" },
          { label: "Motion", detail: "Duration & easing" },
          { label: "Accessibility", detail: "Labels & targets" },
        ].map((item, i) => (
          <g key={item.label} transform={`translate(${(i % 3) * 156}, ${Math.floor(i / 3) * 32 + 18})`}>
            <Rect
              x={0}
              y={0}
              width={148}
              height={26}
              fill={ILLUSTRATION_COLORS.light}
              stroke="none"
            />
            <text
              x={8}
              y={12}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.dark}
              fontFamily="system-ui"
              fontWeight="600"
            >
              {item.label}
            </text>
            <text
              x={8}
              y={22}
              fontSize={8}
              fill={ILLUSTRATION_COLORS.muted}
              fontFamily="system-ui"
            >
              {item.detail}
            </text>
          </g>
        ))}
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
        Clear specs reduce back-and-forth and speed up development
      </text>
    </Illustration>
  );
}
