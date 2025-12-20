import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function IconSizing() {
  const sizes = [
    { size: 16, label: "16px", use: "Inline" },
    { size: 20, label: "20px", use: "UI Standard" },
    { size: 24, label: "24px", use: "Navigation" },
    { size: 32, label: "32px", use: "Feature" },
    { size: 48, label: "48px", use: "Hero" },
  ];

  const headerY = CONTENT.top + 8;
  const columnsY = CONTENT.top + 24;
  const startY = CONTENT.top + 38;
  const rowGap = 6;

  const cumulativeY = (index: number) => {
    let y = startY;
    for (let i = 0; i < index; i++) {
      y += sizes[i].size + rowGap;
    }
    return y;
  };

  return (
    <Illustration
      title="Icon Sizing"
      description="Design icons for their target size"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={headerY} anchor="middle">
        ICON SIZING GUIDE
      </Label>

      {/* Header */}
      <g>
        <text
          x={CONTENT.left + 48}
          y={columnsY}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          SIZE
        </text>
        <text
          x={CONTENT.centerX}
          y={columnsY}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          PREVIEW
        </text>
        <text
          x={CONTENT.right - 48}
          y={columnsY}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          USE CASE
        </text>
      </g>

      {sizes.map((item, index) => {
        const y = cumulativeY(index);

        return (
          <g key={item.size}>
            {/* Size label */}
            <text
              x={CONTENT.left + 48}
              y={y + item.size / 2 + 4}
              fontSize={11}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="600"
            >
              {item.label}
            </text>

            {/* Icon placeholder - simple gear icon scaled */}
            <g transform={`translate(${CONTENT.centerX - item.size / 2}, ${y})`}>
              <rect
                x={0}
                y={0}
                width={item.size}
                height={item.size}
                fill="none"
                stroke={ILLUSTRATION_COLORS.light}
                strokeWidth={1}
                strokeDasharray="2 2"
              />
              {/* Simple icon representation */}
              <circle
                cx={item.size / 2}
                cy={item.size / 2}
                r={item.size * 0.35}
                fill="none"
                stroke={ILLUSTRATION_COLORS.primary}
                strokeWidth={Math.max(1.5, item.size / 12)}
              />
              <circle
                cx={item.size / 2}
                cy={item.size / 2}
                r={item.size * 0.15}
                fill={ILLUSTRATION_COLORS.primary}
              />
            </g>

            {/* Use case */}
            <text
              x={CONTENT.right - 48}
              y={y + item.size / 2 + 4}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui"
            >
              {item.use}
            </text>
          </g>
        );
      })}
    </Illustration>
  );
}
