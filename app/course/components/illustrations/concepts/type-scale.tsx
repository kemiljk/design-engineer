import { Illustration, Label, ILLUSTRATION_COLORS } from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function TypeScale() {
  const sizes = [
    { size: 39, label: "H1", weight: "700" },
    { size: 31, label: "H2", weight: "700" },
    { size: 25, label: "H3", weight: "600" },
    { size: 20, label: "H4", weight: "600" },
    { size: 16, label: "Body", weight: "400" },
    { size: 13, label: "Small", weight: "400" },
    { size: 10, label: "Caption", weight: "400" },
  ];

  const startY = CONTENT.top;
  const rowGap = 6;

  let currentY = startY;

  return (
    <Illustration
      title="Typography MenuScale"
      description="Demonstrates a typographic scale from caption to display sizes"
      width={GRID.width}
      height={GRID.height}
    >
      {sizes.map((item, index) => {
        const y = currentY + item.size;
        currentY = y + rowGap;

        return (
          <g key={item.label}>
            <text
              x={CONTENT.centerX - 24}
              y={y}
              fontSize={item.size}
              fill={index === 0 ? ILLUSTRATION_COLORS.primary : "currentColor"}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight={item.weight}
              textAnchor="end"
            >
              Aa
            </text>
            <Label x={CONTENT.centerX + 24} y={y}>
              {`${item.label.toUpperCase()} · ${item.size}PX`}
            </Label>
          </g>
        );
      })}
    </Illustration>
  );
}
