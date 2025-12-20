import { Illustration, Rect, Label, ILLUSTRATION_COLORS } from "../base/primitives";
import { GRID, CONTENT, colSpan, colStart } from "../base/grid";

interface ColorPaletteProps {
  colors?: { color: string; label: string }[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const defaultColors = [
    { color: ILLUSTRATION_COLORS.primary, label: "PRIMARY" },
    { color: "#171717", label: "DARK" },
    { color: "#737373", label: "MUTED" },
    { color: "#d4d4d4", label: "LIGHT" },
    { color: "#fafafa", label: "BG" },
  ];

  const palette = colors || defaultColors;
  const swatchSize = 48;
  const gap = 16;
  const totalWidth = palette.length * swatchSize + (palette.length - 1) * gap;
  const startX = CONTENT.centerX - totalWidth / 2;
  const swatchY = CONTENT.centerY - swatchSize / 2;

  return (
    <Illustration
      title="Color Palette"
      description="A row of color swatches with labels"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 16} anchor="middle">
        COLOR PALETTE
      </Label>

      {palette.map((item, index) => {
        const x = startX + index * (swatchSize + gap);
        return (
          <g key={item.label}>
            <Rect
              x={x}
              y={swatchY}
              width={swatchSize}
              height={swatchSize}
              fill={item.color}
              stroke={ILLUSTRATION_COLORS.light}
            />
            <Label
              x={x + swatchSize / 2}
              y={swatchY + swatchSize + 20}
              anchor="middle"
              fontSize={12}
            >
              {item.label}
            </Label>
          </g>
        );
      })}
    </Illustration>
  );
}
