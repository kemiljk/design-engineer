import {
  Illustration,
  Label,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function DarkModeMapping() {
  const colors = [
    { name: "Background", light: "#ffffff", dark: "#0a0a0a" },
    { name: "Surface", light: "#f5f5f5", dark: "#171717" },
    { name: "Text", light: "#171717", dark: "#fafafa" },
    { name: "Muted", light: "#737373", dark: "#a3a3a3" },
    { name: "Primary", light: "#2563eb", dark: "#3b82f6" },
  ];

  const swatchSize = 28;
  const rowHeight = 34;
  const startY = CONTENT.top + 50;
  const leftColumnX = CONTENT.left + 70;
  const rightColumnX = CONTENT.right - 70;

  return (
    <Illustration
      title="Dark Mode Mapping"
      description="How colours transform between light and dark modes"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Title */}
      <Label x={CONTENT.centerX} y={CONTENT.top + 16} anchor="middle">
        DARK MODE COLOUR MAPPING
      </Label>

      {/* Column headers with background panels */}
      <rect
        x={leftColumnX - 45}
        y={CONTENT.top + 26}
        width={90}
        height={20}
        rx={4}
        fill={ILLUSTRATION_COLORS.light}
        opacity={0.3}
      />
      <text
        x={leftColumnX}
        y={CONTENT.top + 40}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.dark}
        textAnchor="middle"
        fontFamily="system-ui"
        fontWeight="600"
      >
        LIGHT MODE
      </text>

      <rect
        x={rightColumnX - 45}
        y={CONTENT.top + 26}
        width={90}
        height={20}
        rx={4}
        fill={ILLUSTRATION_COLORS.light}
        opacity={0.3}
      />
      <text
        x={rightColumnX}
        y={CONTENT.top + 40}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.dark}
        textAnchor="middle"
        fontFamily="system-ui"
        fontWeight="600"
      >
        DARK MODE
      </text>

      {colors.map((item, index) => {
        const y = startY + index * rowHeight;

        return (
          <g key={item.name}>
            {/* Light mode swatch with border */}
            <rect
              x={leftColumnX - swatchSize / 2}
              y={y}
              width={swatchSize}
              height={swatchSize}
              rx={4}
              fill={item.light}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />

            {/* Centre label */}
            <text
              x={CONTENT.centerX}
              y={y + swatchSize / 2 + 4}
              fontSize={11}
              fill={ILLUSTRATION_COLORS.dark}
              textAnchor="middle"
              fontFamily="system-ui"
              fontWeight="500"
            >
              {item.name}
            </text>

            {/* Arrow */}
            <Line
              x1={leftColumnX + swatchSize / 2 + 12}
              y1={y + swatchSize / 2}
              x2={rightColumnX - swatchSize / 2 - 16}
              y2={y + swatchSize / 2}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
            />
            <path
              d={`M ${rightColumnX - swatchSize / 2 - 20} ${y + swatchSize / 2 - 5} L ${rightColumnX - swatchSize / 2 - 12} ${y + swatchSize / 2} L ${rightColumnX - swatchSize / 2 - 20} ${y + swatchSize / 2 + 5}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dark mode swatch with border */}
            <rect
              x={rightColumnX - swatchSize / 2}
              y={y}
              width={swatchSize}
              height={swatchSize}
              rx={4}
              fill={item.dark}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />
          </g>
        );
      })}

      {/* Key insight box */}
      <rect
        x={CONTENT.left + 30}
        y={CONTENT.bottom - 32}
        width={CONTENT.width - 60}
        height={28}
        rx={4}
        fill={ILLUSTRATION_COLORS.light}
        opacity={0.2}
      />
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 14}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Invert lightness, not hue • Reduce saturation • Maintain contrast ratios
      </text>
    </Illustration>
  );
}
