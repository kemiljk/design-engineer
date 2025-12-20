import { ILLUSTRATION_COLORS, STROKE_WIDTHS } from "./colors";

interface IllustrationProps {
  title: string;
  description?: string;
  width?: number;
  height?: number;
  className?: string;
  children: React.ReactNode;
}

export function Illustration({
  title,
  description,
  width = 560,
  height = 360,
  className = "",
  children,
}: IllustrationProps) {
  const titleId = `illustration-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const descId = description ? `${titleId}-desc` : undefined;

  return (
    <svg
      role="img"
      aria-labelledby={descId ? `${titleId} ${descId}` : titleId}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-auto ${className}`}
      style={{ color: ILLUSTRATION_COLORS.dark }}
    >
      <title id={titleId}>{title}</title>
      {description && <desc id={descId}>{description}</desc>}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={ILLUSTRATION_COLORS.bg}
      />
      {children}
    </svg>
  );
}

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function Rect({
  x,
  y,
  width,
  height,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = STROKE_WIDTHS.normal,
}: RectProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

interface CircleProps {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
}

export function Circle({
  cx,
  cy,
  r,
  fill = "none",
  fillOpacity,
  stroke = "currentColor",
  strokeWidth = STROKE_WIDTHS.normal,
}: CircleProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export function Line({
  x1,
  y1,
  x2,
  y2,
  stroke = "currentColor",
  strokeWidth = STROKE_WIDTHS.normal,
  strokeDasharray,
}: LineProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
    />
  );
}

interface LabelProps {
  x: number;
  y: number;
  children: string;
  fontSize?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}

export function Label({
  x,
  y,
  children,
  fontSize = 11,
  fill = ILLUSTRATION_COLORS.muted,
  anchor = "start",
}: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={fontSize}
      fill={fill}
      textAnchor={anchor}
      fontFamily="system-ui, -apple-system, sans-serif"
      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
    >
      {children}
    </text>
  );
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = "currentColor",
  strokeWidth = STROKE_WIDTHS.normal,
}: ArrowProps) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowLength = 8;
  const arrowAngle = Math.PI / 6;

  const arrowX1 = x2 - arrowLength * Math.cos(angle - arrowAngle);
  const arrowY1 = y2 - arrowLength * Math.sin(angle - arrowAngle);
  const arrowX2 = x2 - arrowLength * Math.cos(angle + arrowAngle);
  const arrowY2 = y2 - arrowLength * Math.sin(angle + arrowAngle);

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <polyline
        points={`${arrowX1},${arrowY1} ${x2},${y2} ${arrowX2},${arrowY2}`}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
}

export { ILLUSTRATION_COLORS, STROKE_WIDTHS };
