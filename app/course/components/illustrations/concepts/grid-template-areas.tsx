import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function GridTemplateAreas() {
  const gridWidth = 280;
  const gridHeight = 180;
  const gridX = CONTENT.centerX - gridWidth / 2;
  const gridY = CONTENT.top + 40;
  
  const headerHeight = 36;
  const footerHeight = 32;
  const sidebarWidth = 60;
  const mainHeight = gridHeight - headerHeight - footerHeight - 8;

  const areas = [
    { name: "header", x: gridX, y: gridY, w: gridWidth, h: headerHeight, color: ILLUSTRATION_COLORS.primary },
    { name: "sidebar", x: gridX, y: gridY + headerHeight + 4, w: sidebarWidth, h: mainHeight, color: ILLUSTRATION_COLORS.muted },
    { name: "main", x: gridX + sidebarWidth + 4, y: gridY + headerHeight + 4, w: gridWidth - sidebarWidth - 4, h: mainHeight, color: "currentColor" },
    { name: "footer", x: gridX, y: gridY + headerHeight + mainHeight + 8, w: gridWidth, h: footerHeight, color: ILLUSTRATION_COLORS.light },
  ];

  return (
    <Illustration
      title="Grid Template Areas"
      description="Named grid areas for creating complex layouts"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        GRID-TEMPLATE-AREAS
      </Label>

      {/* Grid container outline */}
      <Rect
        x={gridX - 2}
        y={gridY - 2}
        width={gridWidth + 4}
        height={gridHeight + 4}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />

      {/* Grid areas */}
      {areas.map((area) => (
        <g key={area.name}>
          <Rect
            x={area.x}
            y={area.y}
            width={area.w}
            height={area.h}
            fill={area.color}
            stroke="none"
          />
          <text
            x={area.x + area.w / 2}
            y={area.y + area.h / 2 + 4}
            fontSize={area.name === "sidebar" ? 8 : 10}
            fill={ILLUSTRATION_COLORS.bg}
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="600"
          >
            {area.name}
          </text>
        </g>
      ))}

      {/* Code representation */}
      <g>
        <text
          x={CONTENT.centerX}
          y={gridY + gridHeight + 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="monospace"
        >
          &quot;header header header&quot;
        </text>
        <text
          x={CONTENT.centerX}
          y={gridY + gridHeight + 36}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="monospace"
        >
          &quot;sidebar main main&quot;
        </text>
        <text
          x={CONTENT.centerX}
          y={gridY + gridHeight + 48}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="monospace"
        >
          &quot;footer footer footer&quot;
        </text>
      </g>
    </Illustration>
  );
}
