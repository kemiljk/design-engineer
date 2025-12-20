import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ContrastRatio() {
  const examples = [
    { bg: "#ffffff", fg: "#9ca3af", ratio: "2.9:1", pass: false, label: "Fail" },
    { bg: "#ffffff", fg: "#6b7280", ratio: "4.6:1", pass: true, label: "AA" },
    { bg: "#ffffff", fg: "#374151", ratio: "10.6:1", pass: true, label: "AAA" },
  ];

  const boxWidth = 90;
  const boxHeight = 60;
  const totalWidth = examples.length * boxWidth + (examples.length - 1) * 20;
  const startX = CONTENT.centerX - totalWidth / 2;
  const boxY = CONTENT.top + 56;

  return (
    <Illustration
      title="Contrast Ratio"
      description="WCAG contrast requirements: 4.5:1 for AA, 7:1 for AAA"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        WCAG CONTRAST RATIOS
      </Label>

      {/* Requirements */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.top + 36}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Normal text: 4.5:1 (AA) · 7:1 (AAA)  |  Large text: 3:1 (AA) · 4.5:1 (AAA)
      </text>

      {examples.map((ex, index) => {
        const x = startX + index * (boxWidth + 20);

        return (
          <g key={index}>
            {/* Sample box */}
            <rect
              x={x}
              y={boxY}
              width={boxWidth}
              height={boxHeight}
              fill={ex.bg}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />
            
            {/* Sample text */}
            <text
              x={x + boxWidth / 2}
              y={boxY + 28}
              fontSize={14}
              fill={ex.fg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Sample
            </text>
            <text
              x={x + boxWidth / 2}
              y={boxY + 46}
              fontSize={10}
              fill={ex.fg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Text
            </text>

            {/* Ratio */}
            <text
              x={x + boxWidth / 2}
              y={boxY + boxHeight + 20}
              fontSize={12}
              fill={ex.pass ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="600"
            >
              {ex.ratio}
            </text>

            {/* Pass/Fail indicator */}
            <Rect
              x={x + boxWidth / 2 - 20}
              y={boxY + boxHeight + 30}
              width={40}
              height={18}
              fill={ex.pass ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.light}
              stroke="none"
            />
            <text
              x={x + boxWidth / 2}
              y={boxY + boxHeight + 43}
              fontSize={12}
              fill={ex.pass ? ILLUSTRATION_COLORS.bg : ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              {ex.label}
            </text>

            {/* Color code */}
            <text
              x={x + boxWidth / 2}
              y={boxY + boxHeight + 64}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {ex.fg}
            </text>
          </g>
        );
      })}

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Test with WebAIM, Chrome DevTools, or Stark
      </text>
    </Illustration>
  );
}
