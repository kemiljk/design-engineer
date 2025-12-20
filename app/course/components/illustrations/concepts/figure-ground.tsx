import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function FigureGround() {
  const pageWidth = 260;
  const pageHeight = 160;
  const pageX = CONTENT.centerX - pageWidth / 2;
  const pageY = CONTENT.top + 40;
  
  const modalWidth = 140;
  const modalHeight = 100;
  const modalX = CONTENT.centerX - modalWidth / 2;
  const modalY = pageY + (pageHeight - modalHeight) / 2;

  return (
    <Illustration
      title="Figure-Ground"
      description="The brain separates foreground (figure) from background (ground)"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        FIGURE-GROUND RELATIONSHIP
      </Label>

      {/* Page background (ground) */}
      <Rect
        x={pageX}
        y={pageY}
        width={pageWidth}
        height={pageHeight}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />

      {/* Dimmed overlay */}
      <Rect
        x={pageX}
        y={pageY}
        width={pageWidth}
        height={pageHeight}
        fill="currentColor"
        stroke="none"
      />
      <rect
        x={pageX}
        y={pageY}
        width={pageWidth}
        height={pageHeight}
        fill="black"
        fillOpacity={0.4}
      />

      {/* Page content elements (behind overlay) */}
      <Rect
        x={pageX + 12}
        y={pageY + 12}
        width={80}
        height={8}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={pageX + 12}
        y={pageY + 28}
        width={pageWidth - 24}
        height={6}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={pageX + 12}
        y={pageY + 40}
        width={pageWidth - 60}
        height={6}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />

      {/* Modal (figure) */}
      <Rect
        x={modalX}
        y={modalY}
        width={modalWidth}
        height={modalHeight}
        fill={ILLUSTRATION_COLORS.bg}
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />

      {/* Modal shadow */}
      <rect
        x={modalX + 4}
        y={modalY + 4}
        width={modalWidth}
        height={modalHeight}
        fill="black"
        fillOpacity={0.15}
        style={{ filter: "blur(4px)" }}
      />

      {/* Modal content */}
      <Rect
        x={modalX + 12}
        y={modalY + 12}
        width={modalWidth - 24}
        height={10}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <Rect
        x={modalX + 12}
        y={modalY + 30}
        width={modalWidth - 24}
        height={6}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={modalX + 12}
        y={modalY + 42}
        width={modalWidth - 40}
        height={6}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      
      {/* Modal buttons */}
      <Rect
        x={modalX + modalWidth - 70}
        y={modalY + modalHeight - 32}
        width={56}
        height={20}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />

      {/* Labels */}
      <text
        x={pageX + pageWidth + 12}
        y={pageY + 20}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ letterSpacing: "0.05em" }}
      >
        GROUND
      </text>
      <text
        x={pageX + pageWidth + 12}
        y={pageY + 32}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        (dimmed)
      </text>

      <text
        x={pageX + pageWidth + 12}
        y={modalY + modalHeight / 2}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.primary}
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ letterSpacing: "0.05em" }}
      >
        FIGURE
      </text>
      <text
        x={pageX + pageWidth + 12}
        y={modalY + modalHeight / 2 + 12}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        (focused)
      </text>
    </Illustration>
  );
}
