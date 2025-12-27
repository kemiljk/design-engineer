import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

interface FileItem {
  name: string;
  type: "folder" | "file";
  indent: number;
  color?: string;
}

export function TokenFileStructure() {
  const files: FileItem[] = [
    { name: "tokens/", type: "folder", indent: 0 },
    { name: "color/", type: "folder", indent: 1, color: ILLUSTRATION_COLORS.primary },
    { name: "primitive.json", type: "file", indent: 2 },
    { name: "spacing/", type: "folder", indent: 1, color: "#10b981" },
    { name: "scale.json", type: "file", indent: 2 },
    { name: "typography/", type: "folder", indent: 1, color: "#8b5cf6" },
    { name: "font.json", type: "file", indent: 2 },
    { name: "effects/", type: "folder", indent: 1, color: "#f59e0b" },
  ];

  const lineHeight = 32;
  const startX = CONTENT.left + 60;
  const startY = 56;
  const indentWidth = 24;
  const treeHeight = files.length * lineHeight + 24;

  return (
    <Illustration
      title="Token File Structure"
      description="Organised token files by category"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Title */}
      <Label x={GRID.width / 2} y={24} anchor="middle">
        TOKEN FILE ORGANISATION
      </Label>

      {/* File tree container */}
      <Rect
        x={startX - 28}
        y={startY - 20}
        width={240}
        height={treeHeight}
        fill={ILLUSTRATION_COLORS.light}
        rx={8}
        opacity={0.5}
      />

      {/* File tree */}
      {files.map((file, index) => {
        const x = startX + file.indent * indentWidth;
        const y = startY + index * lineHeight;

        return (
          <g key={`${file.name}-${index}`}>
            {/* Tree lines */}
            {file.indent > 0 && (
              <>
                {/* Vertical line */}
                <line
                  x1={x - indentWidth / 2 - 4}
                  y1={y - lineHeight + 8}
                  x2={x - indentWidth / 2 - 4}
                  y2={y + 6}
                  stroke={ILLUSTRATION_COLORS.muted}
                  strokeWidth={1}
                  opacity={0.4}
                />
                {/* Horizontal line */}
                <line
                  x1={x - indentWidth / 2 - 4}
                  y1={y + 6}
                  x2={x - 4}
                  y2={y + 6}
                  stroke={ILLUSTRATION_COLORS.muted}
                  strokeWidth={1}
                  opacity={0.4}
                />
              </>
            )}

                {/* Icon */}
                {file.type === "folder" ? (
                  <g transform={`translate(${x}, ${y})`}>
                    <rect
                      x={0}
                      y={0}
                      width={16}
                      height={14}
                      rx={2}
                      fill={file.color || ILLUSTRATION_COLORS.muted}
                    />
                    <rect
                      x={0}
                      y={0}
                      width={7}
                      height={5}
                      rx={1}
                      fill={file.color || ILLUSTRATION_COLORS.muted}
                    />
                  </g>
                ) : (
                  <g transform={`translate(${x}, ${y})`}>
                    <rect
                      x={0}
                      y={0}
                      width={12}
                      height={14}
                      rx={1}
                      fill="none"
                      stroke={ILLUSTRATION_COLORS.muted}
                      strokeWidth={1.5}
                    />
                    <path
                      d="M 7 0 L 12 5"
                      stroke={ILLUSTRATION_COLORS.muted}
                      strokeWidth={1.5}
                      fill="none"
                    />
                  </g>
                )}

                {/* Name */}
                <text
                  x={x + 22}
                  y={y + 12}
                  fontSize={14}
                  fill={file.type === "folder" ? ILLUSTRATION_COLORS.dark : ILLUSTRATION_COLORS.muted}
                  fontFamily="monospace"
                  fontWeight={file.type === "folder" ? "600" : "400"}
                >
                  {file.name}
                </text>
          </g>
        );
      })}

      {/* Legend - positioned to the right of the tree */}
      <g transform={`translate(${startX + 230}, ${startY + 60})`}>
        <text
          x={0}
          y={0}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Categories
        </text>

        {[
          { label: "Colour", color: ILLUSTRATION_COLORS.primary },
          { label: "Spacing", color: "#10b981" },
          { label: "Typography", color: "#8b5cf6" },
          { label: "Effects", color: "#f59e0b" },
        ].map((item, i) => (
          <g key={item.label} transform={`translate(0, ${24 + i * 36})`}>
            <rect x={0} y={0} width={16} height={16} rx={3} fill={item.color} />
            <text
              x={26}
              y={13}
              fontSize={13}
              fill={ILLUSTRATION_COLORS.dark}
              fontFamily="system-ui"
            >
              {item.label}
            </text>
          </g>
        ))}
      </g>

      {/* Bottom note */}
      <text
        x={GRID.width / 2}
        y={GRID.height - 20}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Group by category • Separate primitive from semantic
      </text>
    </Illustration>
  );
}
