import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function HtmlCssJsLayers() {
  const layers = [
    { label: "JAVASCRIPT", desc: "Behavior & Interactivity", color: ILLUSTRATION_COLORS.primary, height: 40 },
    { label: "CSS", desc: "Style & Presentation", color: "currentColor", height: 50 },
    { label: "HTML", desc: "Structure & Content", color: ILLUSTRATION_COLORS.muted, height: 60 },
  ];

  const baseWidth = 200;
  const startY = CONTENT.top + 40;
  let currentY = startY;

  return (
    <Illustration
      title="HTML CSS JS Layers"
      description="The three layers of web development: structure, style, and behavior"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        WEB TECHNOLOGY LAYERS
      </Label>

      {layers.map((layer, index) => {
        const width = baseWidth - index * 30;
        const x = CONTENT.centerX - width / 2;
        const y = currentY;
        currentY += layer.height + 4;

        return (
          <g key={layer.label}>
            {/* Layer rectangle */}
            <Rect
              x={x}
              y={y}
              width={width}
              height={layer.height}
              fill={layer.color}
              stroke="none"
            />

            {/* Label */}
            <text
              x={CONTENT.centerX}
              y={y + layer.height / 2 - 4}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
              style={{ letterSpacing: "0.05em" }}
            >
              {layer.label}
            </text>

            {/* Description */}
            <text
              x={CONTENT.centerX}
              y={y + layer.height / 2 + 12}
              fontSize={11}
              fill={index === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.6)"}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {layer.desc}
            </text>
          </g>
        );
      })}

      {/* Side labels */}
      <g>
        <line
          x1={CONTENT.left + 30}
          y1={startY}
          x2={CONTENT.left + 30}
          y2={currentY - 4}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={CONTENT.left + 24}
          y={startY + (currentY - startY) / 2}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          transform={`rotate(-90, ${CONTENT.left + 24}, ${startY + (currentY - startY) / 2})`}
        >
          PRESENTATION
        </text>
      </g>

      {/* Foundation label */}
      <text
        x={CONTENT.centerX}
        y={currentY + 20}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        HTML is the foundation — CSS and JS enhance it
      </text>

      {/* Analogy */}
      <g>
        <text
          x={CONTENT.right - 60}
          y={startY + 20}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Muscles
        </text>
        <text
          x={CONTENT.right - 60}
          y={startY + 64}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Skin
        </text>
        <text
          x={CONTENT.right - 60}
          y={startY + 120}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Skeleton
        </text>
      </g>
    </Illustration>
  );
}
