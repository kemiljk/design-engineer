import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function JsDataTypes() {
  const types = [
    { name: "String", example: '"hello"', color: ILLUSTRATION_COLORS.primary },
    { name: "Number", example: "42", color: "currentColor" },
    { name: "Boolean", example: "true", color: ILLUSTRATION_COLORS.muted },
    { name: "Array", example: "[1, 2]", color: ILLUSTRATION_COLORS.primary },
    { name: "Object", example: "{...}", color: "currentColor" },
    { name: "null", example: "null", color: ILLUSTRATION_COLORS.light },
  ];

  const cols = 3;
  const rows = 2;
  const boxWidth = 100;
  const boxHeight = 56;
  const gapX = 16;
  const gapY = 12;

  const totalWidth = cols * boxWidth + (cols - 1) * gapX;
  const startX = CONTENT.centerX - totalWidth / 2;
  const startY = CONTENT.top + 40;

  return (
    <Illustration
      title="JavaScript Data Types"
      description="The fundamental data types in JavaScript"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        JAVASCRIPT DATA TYPES
      </Label>

      {types.map((type, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * (boxWidth + gapX);
        const y = startY + row * (boxHeight + gapY);

        return (
          <g key={type.name}>
            <Rect
              x={x}
              y={y}
              width={boxWidth}
              height={boxHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={type.color}
              strokeWidth={2}
            />

            {/* Type name */}
            <text
              x={x + boxWidth / 2}
              y={y + 20}
              fontSize={11}
              fill={type.color}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              {type.name}
            </text>

            {/* Example */}
            <text
              x={x + boxWidth / 2}
              y={y + 40}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {type.example}
            </text>
          </g>
        );
      })}

      {/* Primitives vs Reference label */}
      <g>
        <text
          x={startX + boxWidth * 1.5 + gapX / 2}
          y={startY + boxHeight + gapY + boxHeight + 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          PRIMITIVES (immutable)
        </text>
        <text
          x={startX + boxWidth * 2.5 + gapX * 1.5}
          y={startY + boxHeight + gapY + boxHeight + 24}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          REFERENCE
        </text>
      </g>

      {/* const vs let */}
      <g>
        <Rect
          x={CONTENT.left + 8}
          y={CONTENT.bottom - 28}
          width={60}
          height={22}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={CONTENT.left + 38}
          y={CONTENT.bottom - 13}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="600"
        >
          const
        </text>
        <text
          x={CONTENT.left + 80}
          y={CONTENT.bottom - 13}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          = default choice
        </text>

        <Rect
          x={CONTENT.centerX + 20}
          y={CONTENT.bottom - 28}
          width={50}
          height={22}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <text
          x={CONTENT.centerX + 45}
          y={CONTENT.bottom - 13}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="600"
        >
          let
        </text>
        <text
          x={CONTENT.centerX + 80}
          y={CONTENT.bottom - 13}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          = reassignable
        </text>
      </g>
    </Illustration>
  );
}
