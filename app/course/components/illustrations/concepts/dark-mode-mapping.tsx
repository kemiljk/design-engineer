import {
  Illustration,
  Rect,
  Label,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function DarkModeMapping() {
  const lightColors = [
    { name: "Background", color: "#ffffff", darkColor: "#0a0a0a" },
    { name: "Surface", color: "#f5f5f5", darkColor: "#171717" },
    { name: "Text", color: "#171717", darkColor: "#fafafa" },
    { name: "Muted", color: "#737373", darkColor: "#a3a3a3" },
    { name: "Primary", color: "#2563eb", darkColor: "#3b82f6" },
  ];

  const swatchSize = 28;
  const rowHeight = 36;
  const startY = CONTENT.top + 48;
  const lightX = CONTENT.left + 60;
  const darkX = CONTENT.right - 60;
  const labelWidth = 70;

  return (
    <Illustration
      title="Dark Mode Mapping"
      description="How colors transform between light and dark modes"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        DARK MODE COLOR MAPPING
      </Label>

      {/* Column headers */}
      <text
        x={lightX}
        y={CONTENT.top + 36}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
        fontWeight="600"
      >
        LIGHT
      </text>
      <text
        x={darkX}
        y={CONTENT.top + 36}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
        fontWeight="600"
      >
        DARK
      </text>

      {lightColors.map((item, index) => {
        const y = startY + index * rowHeight;

        return (
          <g key={item.name}>
            {/* Light swatch */}
            <rect
              x={lightX - swatchSize / 2}
              y={y}
              width={swatchSize}
              height={swatchSize}
              fill={item.color}
              stroke={item.color === "#ffffff" ? ILLUSTRATION_COLORS.muted : "none"}
              strokeWidth={1}
            />

            {/* Label */}
            <text
              x={CONTENT.centerX}
              y={y + swatchSize / 2 + 4}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui"
            >
              {item.name}
            </text>

            {/* Arrow */}
            <Line
              x1={lightX + swatchSize / 2 + 8}
              y1={y + swatchSize / 2}
              x2={darkX - swatchSize / 2 - 8}
              y2={y + swatchSize / 2}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <path
              d={`M ${darkX - swatchSize / 2 - 12} ${y + swatchSize / 2 - 4} L ${darkX - swatchSize / 2 - 6} ${y + swatchSize / 2} L ${darkX - swatchSize / 2 - 12} ${y + swatchSize / 2 + 4}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />

            {/* Dark swatch */}
            <rect
              x={darkX - swatchSize / 2}
              y={y}
              width={swatchSize}
              height={swatchSize}
              fill={item.darkColor}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
          </g>
        );
      })}

      {/* Key insight */}
      <g>
        <text
          x={CONTENT.centerX}
          y={CONTENT.bottom - 20}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Invert lightness, not hue • Maintain contrast ratios
        </text>
        <text
          x={CONTENT.centerX}
          y={CONTENT.bottom - 6}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Raised surfaces get lighter in dark mode (opposite of shadows)
        </text>
      </g>
    </Illustration>
  );
}
