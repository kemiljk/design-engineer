import {
  Illustration,
  Rect,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

function CheckIcon({ x, y, size = 12, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.15} ${size * 0.5} L ${size * 0.4} ${size * 0.75} L ${size * 0.85} ${size * 0.25}`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

function XIcon({ x, y, size = 12, color }: { x: number; y: number; size?: number; color: string }) {
  const half = size / 2;
  return (
    <g transform={`translate(${x - half}, ${y - half})`}>
      <path
        d={`M ${size * 0.2} ${size * 0.2} L ${size * 0.8} ${size * 0.8} M ${size * 0.8} ${size * 0.2} L ${size * 0.2} ${size * 0.8}`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function FingerTip({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={size / 2}
      ry={size / 2.2}
      fill={ILLUSTRATION_COLORS.primary}
      fillOpacity={0.15}
      stroke={ILLUSTRATION_COLORS.primary}
      strokeWidth={1}
      strokeDasharray="3 2"
    />
  );
}

export function TouchTargetSizes() {
  const targets = [
    { size: 24, label: "24px", status: "bad", desc: "Too small" },
    { size: 32, label: "32px", status: "warning", desc: "Borderline" },
    { size: 44, label: "44px", status: "good", desc: "Recommended" },
  ];

  const spacing = 120;
  const startX = CONTENT.centerX - spacing;
  const centerY = CONTENT.centerY;

  const fingerSize = 44;

  return (
    <Illustration
      title="Touch Gps Sizes"
      description="Minimum touch target sizes for accessible interfaces"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        TOUCH TARGET SIZES
      </Label>

      {targets.map((target, index) => {
        const x = startX + index * spacing;

        return (
          <g key={target.label}>
            {/* Finger overlay */}
            <FingerTip cx={x} cy={centerY} size={fingerSize} />

            {/* Gps button */}
            <Rect
              x={x - target.size / 2}
              y={centerY - target.size / 2}
              width={target.size}
              height={target.size}
              fill={
                target.status === "good"
                  ? ILLUSTRATION_COLORS.primary
                  : target.status === "warning"
                    ? ILLUSTRATION_COLORS.muted
                    : ILLUSTRATION_COLORS.light
              }
              stroke="none"
              rx={4}
            />

            {/* Size label */}
            <Label x={x} y={centerY + 50} anchor="middle" fontSize={11}>
              {target.label}
            </Label>

            {/* Description */}
            <text
              x={x}
              y={centerY + 68}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {target.desc}
            </text>

            {/* Status indicator */}
            {target.status === "good" ? (
              <CheckIcon
                x={x}
                y={centerY + 88}
                size={14}
                color={ILLUSTRATION_COLORS.primary}
              />
            ) : target.status === "bad" ? (
              <XIcon
                x={x}
                y={centerY + 88}
                size={14}
                color={ILLUSTRATION_COLORS.muted}
              />
            ) : (
              <text
                x={x}
                y={centerY + 92}
                fontSize={14}
                fill={ILLUSTRATION_COLORS.muted}
                textAnchor="middle"
              >
                ~
              </text>
            )}
          </g>
        );
      })}

      {/* Finger annotation */}
      <text
        x={CONTENT.left + 20}
        y={centerY - 40}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.primary}
        textAnchor="start"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Average finger
      </text>
      <text
        x={CONTENT.left + 20}
        y={centerY - 28}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.primary}
        textAnchor="start"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        tap area ~44px
      </text>

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        iOS: 44pt minimum · Android: 48dp minimum · WCAG: 44×44 CSS pixels
      </text>
    </Illustration>
  );
}

