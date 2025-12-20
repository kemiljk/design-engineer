import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ResponsiveBreakpoints() {
  const breakpoints = [
    { label: "MOBILE", width: 60, columns: 1 },
    { label: "TABLET", width: 100, columns: 2 },
    { label: "DESKTOP", width: 150, columns: 3 },
  ];

  const totalWidth = breakpoints.reduce((sum, bp) => sum + bp.width, 0) + (breakpoints.length - 1) * 24;
  const startX = CONTENT.centerX - totalWidth / 2;
  const deviceY = CONTENT.top + 36;
  const deviceHeight = CONTENT.height - 72;

  let currentX = startX;

  return (
    <Illustration
      title="Responsive Breakpoints"
      description="The same content adapting to mobile, tablet, and desktop widths"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        RESPONSIVE LAYOUT
      </Label>

      {breakpoints.map((bp, index) => {
        const x = currentX;
        currentX += bp.width + 24;

        const padding = 6;
        const contentWidth = bp.width - padding * 2;
        const contentX = x + padding;
        const contentY = deviceY + padding;
        const contentHeight = deviceHeight - padding * 2;

        const colWidth = (contentWidth - (bp.columns - 1) * 4) / bp.columns;
        const cardHeight = bp.columns === 1 ? 24 : 32;

        return (
          <g key={bp.label}>
            {/* Device frame */}
            <Rect
              x={x}
              y={deviceY}
              width={bp.width}
              height={deviceHeight}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />

            {/* Header bar */}
            <Rect
              x={contentX}
              y={contentY}
              width={contentWidth}
              height={12}
              fill={ILLUSTRATION_COLORS.primary}
              stroke="none"
            />

            {/* Content cards - responsive grid */}
            {Array.from({ length: bp.columns === 1 ? 3 : bp.columns }).map((_, cardIndex) => {
              const row = Math.floor(cardIndex / bp.columns);
              const col = cardIndex % bp.columns;
              const cardX = contentX + col * (colWidth + 4);
              const cardY = contentY + 20 + row * (cardHeight + 6);

              return (
                <Rect
                  key={cardIndex}
                  x={cardX}
                  y={cardY}
                  width={colWidth}
                  height={cardHeight}
                  fill={cardIndex === 0 ? "currentColor" : ILLUSTRATION_COLORS.light}
                  stroke="none"
                />
              );
            })}

            {/* Additional rows for larger screens */}
            {bp.columns > 1 && (
              <>
                {Array.from({ length: bp.columns }).map((_, cardIndex) => {
                  const col = cardIndex % bp.columns;
                  const cardX = contentX + col * (colWidth + 4);
                  const cardY = contentY + 20 + cardHeight + 6 + (cardHeight + 6);

                  return (
                    <Rect
                      key={`row2-${cardIndex}`}
                      x={cardX}
                      y={cardY}
                      width={colWidth}
                      height={cardHeight}
                      fill={ILLUSTRATION_COLORS.light}
                      stroke="none"
                    />
                  );
                })}
              </>
            )}

            {/* Breakpoint label */}
            <Label 
              x={x + bp.width / 2} 
              y={deviceY + deviceHeight + 16} 
              anchor="middle"
              fontSize={11}
            >
              {bp.label}
            </Label>

            {/* Width indicator */}
            <text
              x={x + bp.width / 2}
              y={deviceY + deviceHeight + 28}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {bp.columns} col
            </text>
          </g>
        );
      })}
    </Illustration>
  );
}
