import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function PolishChecklist() {
  const categories = [
    {
      title: "VISUAL",
      items: ["Spacing", "Colors", "Typography"],
      color: ILLUSTRATION_COLORS.primary,
    },
    {
      title: "INTERACTION",
      items: ["Hover", "Focus", "Transitions"],
      color: "currentColor",
    },
    {
      title: "EDGE CASES",
      items: ["Empty", "Loading", "Error"],
      color: ILLUSTRATION_COLORS.muted,
    },
  ];

  const colWidth = (CONTENT.width - 32) / 3;
  const startY = CONTENT.top + 48;

  return (
    <Illustration
      title="Polish Checklist"
      description="The three pillars of interface polish"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        THE POLISH CHECKLIST
      </Label>

      {categories.map((cat, catIndex) => {
        const x = CONTENT.left + catIndex * (colWidth + 16);

        return (
          <g key={cat.title}>
            {/* Category header */}
            <Rect
              x={x}
              y={startY}
              width={colWidth}
              height={24}
              fill={cat.color}
              stroke="none"
            />
            <text
              x={x + colWidth / 2}
              y={startY + 16}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
              style={{ letterSpacing: "0.05em" }}
            >
              {cat.title}
            </text>

            {/* Items */}
            {cat.items.map((item, itemIndex) => {
              const itemY = startY + 32 + itemIndex * 32;

              return (
                <g key={item}>
                  <Rect
                    x={x}
                    y={itemY}
                    width={colWidth}
                    height={28}
                    fill="none"
                    stroke={ILLUSTRATION_COLORS.muted}
                    strokeWidth={1}
                  />
                  
                  {/* Checkbox */}
                  <Rect
                    x={x + 8}
                    y={itemY + 7}
                    width={14}
                    height={14}
                    fill={ILLUSTRATION_COLORS.bg}
                    stroke={cat.color}
                    strokeWidth={1.5}
                  />
                  
                  {/* Checkmark */}
                  <path
                    d={`M ${x + 11} ${itemY + 14} l 3 3 l 5 -6`}
                    fill="none"
                    stroke={cat.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Item label */}
                  <text
                    x={x + 28}
                    y={itemY + 18}
                    fontSize={10}
                    fill={ILLUSTRATION_COLORS.muted}
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {item}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Bottom message */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 4}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Small details compound into great experiences
      </text>
    </Illustration>
  );
}
