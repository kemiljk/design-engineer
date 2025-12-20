import {
  Illustration,
  Rect,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function EmptyStateAnatomy() {
  const cardX = CONTENT.centerX - 100;
  const cardY = CONTENT.top + 36;
  const cardWidth = 200;
  const cardHeight = 180;

  return (
    <Illustration
      title="Empty State Anatomy"
      description="The four parts of an effective empty state: illustration, what, why, action"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        EMPTY STATE ANATOMY
      </Label>

      {/* Card container */}
      <Rect
        x={cardX}
        y={cardY}
        width={cardWidth}
        height={cardHeight}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={1}
      />

      {/* Illustration placeholder */}
      <Circle
        cx={cardX + cardWidth / 2}
        cy={cardY + 32}
        r={20}
        fill={ILLUSTRATION_COLORS.light}
        stroke="none"
      />
      
      {/* What - Title */}
      <Rect
        x={cardX + 40}
        y={cardY + 64}
        width={120}
        height={12}
        fill="currentColor"
        stroke="none"
      />

      {/* Why - Description */}
      <Rect
        x={cardX + 24}
        y={cardY + 86}
        width={152}
        height={8}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />
      <Rect
        x={cardX + 40}
        y={cardY + 100}
        width={120}
        height={8}
        fill={ILLUSTRATION_COLORS.muted}
        stroke="none"
      />

      {/* Action - Button */}
      <Rect
        x={cardX + 50}
        y={cardY + 128}
        width={100}
        height={32}
        fill={ILLUSTRATION_COLORS.primary}
        stroke="none"
      />
      <text
        x={cardX + cardWidth / 2}
        y={cardY + 148}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.bg}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
      >
        Get Started
      </text>

      {/* Labels with lines */}
      {/* 1 - Icon */}
      <g>
        <Line
          x1={cardX + cardWidth + 8}
          y1={cardY + 32}
          x2={cardX + cardWidth + 24}
          y2={cardY + 32}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeDasharray="2 2"
        />
        <Circle cx={cardX + cardWidth + 36} cy={cardY + 32} r={10} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        <text x={cardX + cardWidth + 36} y={cardY + 36} fontSize={10} fill={ILLUSTRATION_COLORS.muted} textAnchor="middle" fontWeight="600">1</text>
        <text x={cardX + cardWidth + 52} y={cardY + 36} fontSize={11} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">Icon/Illustration</text>
      </g>

      {/* 2 - What */}
      <g>
        <Line
          x1={cardX + cardWidth + 8}
          y1={cardY + 70}
          x2={cardX + cardWidth + 24}
          y2={cardY + 70}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeDasharray="2 2"
        />
        <Circle cx={cardX + cardWidth + 36} cy={cardY + 70} r={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
        <text x={cardX + cardWidth + 36} y={cardY + 74} fontSize={10} fill={ILLUSTRATION_COLORS.bg} textAnchor="middle" fontWeight="600">2</text>
        <text x={cardX + cardWidth + 52} y={cardY + 74} fontSize={11} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">What happened</text>
      </g>

      {/* 3 - Why */}
      <g>
        <Line
          x1={cardX + cardWidth + 8}
          y1={cardY + 93}
          x2={cardX + cardWidth + 24}
          y2={cardY + 93}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeDasharray="2 2"
        />
        <Circle cx={cardX + cardWidth + 36} cy={cardY + 93} r={10} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
        <text x={cardX + cardWidth + 36} y={cardY + 97} fontSize={10} fill={ILLUSTRATION_COLORS.bg} textAnchor="middle" fontWeight="600">3</text>
        <text x={cardX + cardWidth + 52} y={cardY + 97} fontSize={11} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">Why/Context</text>
      </g>

      {/* 4 - Action */}
      <g>
        <Line
          x1={cardX + cardWidth + 8}
          y1={cardY + 144}
          x2={cardX + cardWidth + 24}
          y2={cardY + 144}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeDasharray="2 2"
        />
        <Circle cx={cardX + cardWidth + 36} cy={cardY + 144} r={10} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
        <text x={cardX + cardWidth + 36} y={cardY + 148} fontSize={10} fill={ILLUSTRATION_COLORS.bg} textAnchor="middle" fontWeight="600">4</text>
        <text x={cardX + cardWidth + 52} y={cardY + 148} fontSize={11} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">Action/CTA</text>
      </g>
    </Illustration>
  );
}
