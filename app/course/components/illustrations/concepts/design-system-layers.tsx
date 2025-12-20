import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function DesignSystemLayers() {
  const layers = [
    { label: "PATTERNS", width: 0.4, fill: ILLUSTRATION_COLORS.light },
    { label: "COMPONENTS", width: 0.55, fill: ILLUSTRATION_COLORS.muted },
    { label: "TOKENS", width: 0.7, fill: "currentColor" },
    { label: "PRINCIPLES", width: 0.85, fill: ILLUSTRATION_COLORS.primary },
  ];

  const layerHeight = 36;
  const layerGap = 8;
  const totalHeight = layers.length * layerHeight + (layers.length - 1) * layerGap;
  const startY = CONTENT.centerY - totalHeight / 2 + 12;

  return (
    <Illustration
      title="Design System Layers"
      description="The layers of a design system from principles to patterns"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        DESIGN SYSTEM LAYERS
      </Label>

      {layers.map((layer, index) => {
        const y = startY + index * (layerHeight + layerGap);
        const width = CONTENT.width * layer.width;
        const x = CONTENT.centerX - width / 2;

        return (
          <g key={layer.label}>
            <Rect
              x={x}
              y={y}
              width={width}
              height={layerHeight}
              fill={layer.fill}
              stroke="none"
            />
            <text
              x={CONTENT.centerX}
              y={y + layerHeight / 2 + 4}
              fontSize={10}
              fill={index === 3 ? ILLUSTRATION_COLORS.bg : ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
              style={{ letterSpacing: "0.05em" }}
            >
              {layer.label}
            </text>
          </g>
        );
      })}

      {/* Arrow indicating hierarchy */}
      <g>
        <line
          x1={CONTENT.right - 20}
          y1={startY + totalHeight + 8}
          x2={CONTENT.right - 20}
          y2={startY - 8}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <polygon
          points={`${CONTENT.right - 24},${startY} ${CONTENT.right - 16},${startY} ${CONTENT.right - 20},${startY - 8}`}
          fill={ILLUSTRATION_COLORS.muted}
        />
        <text
          x={CONTENT.right - 20}
          y={startY + totalHeight + 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ letterSpacing: "0.05em" }}
        >
          ABSTRACTION
        </text>
      </g>
    </Illustration>
  );
}
