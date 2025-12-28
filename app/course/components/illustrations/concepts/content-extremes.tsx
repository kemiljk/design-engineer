import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ContentExtremes() {
  const colWidth = (CONTENT.width - 30) / 4;
  const startY = CONTENT.top + 48;
  const boxWidth = 80;
  const boxHeight = 48;

  const strategies = [
    {
      label: "TRUNCATE",
      desc: "Cut with ellipsis",
      useCase: "Lists, cards",
    },
    {
      label: "WRAP",
      desc: "Flow to lines",
      useCase: "Descriptions",
    },
    {
      label: "SCROLL",
      desc: "Fixed container",
      useCase: "Fixed regions",
    },
    {
      label: "EXPAND",
      desc: "Show more",
      useCase: "Variable content",
    },
  ];

  return (
    <Illustration
      title="Content Extremes"
      description="Strategies for handling long content: truncate, wrap, scroll, expand"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        HANDLING LONG CONTENT
      </Label>

      {strategies.map((strategy, index) => {
        const x = CONTENT.left + 15 + index * colWidth + colWidth / 2;

        return (
          <g key={strategy.label}>
            {/* Strategy label */}
            <Label x={x} y={startY - 8} anchor="middle" fontSize={10}>
              {strategy.label}
            </Label>

            {/* Visual box */}
            <Rect
              x={x - boxWidth / 2}
              y={startY + 8}
              width={boxWidth}
              height={boxHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
              rx={3}
            />

            {/* Content visualization based on strategy */}
            {strategy.label === "TRUNCATE" && (
              <g>
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 18}
                  width={boxWidth - 16}
                  height={6}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 28}
                  width={boxWidth - 30}
                  height={6}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <text
                  x={x + boxWidth / 2 - 14}
                  y={startY + 35}
                  fontSize={10}
                  fill={ILLUSTRATION_COLORS.muted}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  ...
                </text>
              </g>
            )}

            {strategy.label === "WRAP" && (
              <g>
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 16}
                  width={boxWidth - 16}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 24}
                  width={boxWidth - 16}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 32}
                  width={boxWidth - 16}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 40}
                  width={boxWidth - 32}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
              </g>
            )}

            {strategy.label === "SCROLL" && (
              <g>
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 16}
                  width={boxWidth - 24}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 24}
                  width={boxWidth - 24}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 32}
                  width={boxWidth - 24}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                {/* Scrollbar */}
                <rect
                  x={x + boxWidth / 2 - 12}
                  y={startY + 14}
                  width={4}
                  height={boxHeight - 12}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x + boxWidth / 2 - 12}
                  y={startY + 14}
                  width={4}
                  height={16}
                  fill={ILLUSTRATION_COLORS.muted}
                  rx={2}
                />
              </g>
            )}

            {strategy.label === "EXPAND" && (
              <g>
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 16}
                  width={boxWidth - 16}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 24}
                  width={boxWidth - 16}
                  height={5}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={2}
                />
                {/* Show more button */}
                <rect
                  x={x - 24}
                  y={startY + 36}
                  width={48}
                  height={14}
                  fill={ILLUSTRATION_COLORS.light}
                  rx={3}
                />
                <text
                  x={x}
                  y={startY + 46}
                  fontSize={7}
                  fill={ILLUSTRATION_COLORS.muted}
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  Show more
                </text>
              </g>
            )}

            {/* Description */}
            <text
              x={x}
              y={startY + boxHeight + 24}
              fontSize={10}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {strategy.desc}
            </text>

            {/* Use case */}
            <text
              x={x}
              y={startY + boxHeight + 38}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {strategy.useCase}
            </text>
          </g>
        );
      })}

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Choose based on content importance and layout constraints
      </text>
    </Illustration>
  );
}

