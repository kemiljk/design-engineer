import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function OrganizationSchemes() {
  const colWidth = (CONTENT.width - 30) / 4;
  const startY = CONTENT.top + 48;
  const boxWidth = 100;
  const boxHeight = 70;

  const schemes = [
    {
      label: "ALPHABETICAL",
      type: "Exact",
      items: ["A", "B", "C", "D"],
      useCase: "Directories",
    },
    {
      label: "CHRONOLOGICAL",
      type: "Exact",
      items: ["Today", "Yesterday", "Last week", "Older"],
      useCase: "Activity feeds",
    },
    {
      label: "BY TOPIC",
      type: "Ambiguous",
      items: ["Design", "Code", "Marketing", "Sales"],
      useCase: "Documentation",
    },
    {
      label: "BY TASK",
      type: "Ambiguous",
      items: ["Create", "Edit", "Share", "Export"],
      useCase: "Applications",
    },
  ];

  return (
    <Illustration
      title="Organization Schemes"
      description="Different ways to organize information: alphabetical, chronological, topical, task-based"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        ORGANIZATION SCHEMES
      </Label>

      {schemes.map((scheme, index) => {
        const x = CONTENT.left + 15 + index * colWidth + colWidth / 2;

        return (
          <g key={scheme.label}>
            {/* Scheme label */}
            <Label x={x} y={startY - 8} anchor="middle" fontSize={9}>
              {scheme.label}
            </Label>

            {/* Type badge */}
            <rect
              x={x - 22}
              y={startY + 2}
              width={44}
              height={14}
              fill={scheme.type === "Exact" ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.muted}
              rx={7}
              opacity={0.15}
            />
            <text
              x={x}
              y={startY + 12}
              fontSize={8}
              fill={scheme.type === "Exact" ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
            >
              {scheme.type}
            </text>

            {/* Visual box */}
            <Rect
              x={x - boxWidth / 2}
              y={startY + 22}
              width={boxWidth}
              height={boxHeight}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
              rx={3}
            />

            {/* Items list */}
            {scheme.items.map((item, i) => (
              <g key={`${scheme.label}-${i}`}>
                <rect
                  x={x - boxWidth / 2 + 8}
                  y={startY + 28 + i * 15}
                  width={boxWidth - 16}
                  height={12}
                  fill={i === 0 ? ILLUSTRATION_COLORS.light : "transparent"}
                  rx={2}
                />
                <text
                  x={x - boxWidth / 2 + 14}
                  y={startY + 37 + i * 15}
                  fontSize={8}
                  fill={i === 0 ? "currentColor" : ILLUSTRATION_COLORS.muted}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {item}
                </text>
              </g>
            ))}

            {/* Use case */}
            <text
              x={x}
              y={startY + boxHeight + 36}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {scheme.useCase}
            </text>
          </g>
        );
      })}

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Most products use hybrid schemes
      </text>
    </Illustration>
  );
}

