import {
  Illustration,
  Circle,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function FeedbackLoop() {
  const centerX = CONTENT.centerX;
  const centerY = CONTENT.centerY;
  const radius = 60;

  const nodeRadius = 8;

  const getPosition = (angleDeg: number, r: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(angleRad),
      y: centerY + r * Math.sin(angleRad),
    };
  };

  const steps = [
    { label: "USER ACTION", angle: -90, example: "clicks button" },
    { label: "SYSTEM RESPONSE", angle: 0, example: "processes request" },
    { label: "FEEDBACK", angle: 90, example: "shows result" },
    { label: "USER UNDERSTANDS", angle: 180, example: "sees confirmation" },
  ];

  return (
    <Illustration
      title="Feedback Loop"
      description="The interaction loop: action, response, feedback, understanding"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        THE INTERACTION LOOP
      </Label>

      {/* Central circle path */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={2}
        strokeDasharray="4 4"
      />

      {/* Curved arrows between nodes */}
      {steps.map((step, index) => {
        const nextIndex = (index + 1) % steps.length;
        const startAngle = step.angle + 20;
        const endAngle = steps[nextIndex].angle - 20;

        const start = getPosition(startAngle, radius);
        const end = getPosition(endAngle, radius);

        const midAngle = (startAngle + endAngle) / 2;
        const control = getPosition(midAngle, radius + 25);

        // Arrow angle is the tangent at endpoint (direction from control to end)
        const arrowAngle = Math.atan2(end.y - control.y, end.x - control.x);
        const arrowLength = 6;
        const arrowSpread = Math.PI / 6;

        return (
          <g key={`arrow-${index}`}>
            <path
              d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
            />
            <path
              d={`M ${end.x - arrowLength * Math.cos(arrowAngle - arrowSpread)} ${end.y - arrowLength * Math.sin(arrowAngle - arrowSpread)} L ${end.x} ${end.y} L ${end.x - arrowLength * Math.cos(arrowAngle + arrowSpread)} ${end.y - arrowLength * Math.sin(arrowAngle + arrowSpread)}`}
              fill="none"
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* Step 1: USER ACTION (top) */}
      <g>
        <Circle
          cx={centerX}
          cy={centerY - radius}
          r={nodeRadius}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={centerX}
          y={centerY - radius + 3}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
        >
          1
        </text>
        <Label x={centerX} y={centerY - radius - 24} anchor="middle" fontSize={10}>
          USER ACTION
        </Label>
        <text
          x={centerX}
          y={centerY - radius - 38}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity={0.7}
        >
          clicks button
        </text>
      </g>

      {/* Step 2: SYSTEM RESPONSE (right) */}
      <g>
        <Circle
          cx={centerX + radius}
          cy={centerY}
          r={nodeRadius}
          fill="currentColor"
          stroke="none"
        />
        <text
          x={centerX + radius}
          y={centerY + 3}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
        >
          2
        </text>
        <Label x={centerX + radius + 20} y={centerY - 6} anchor="start" fontSize={10}>
          SYSTEM RESPONSE
        </Label>
        <text
          x={centerX + radius + 20}
          y={centerY + 10}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="start"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity={0.7}
        >
          processes request
        </text>
      </g>

      {/* Step 3: FEEDBACK (bottom) */}
      <g>
        <Circle
          cx={centerX}
          cy={centerY + radius}
          r={nodeRadius}
          fill="currentColor"
          stroke="none"
        />
        <text
          x={centerX}
          y={centerY + radius + 3}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
        >
          3
        </text>
        <Label x={centerX} y={centerY + radius + 26} anchor="middle" fontSize={10}>
          FEEDBACK
        </Label>
        <text
          x={centerX}
          y={centerY + radius + 40}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity={0.7}
        >
          shows result
        </text>
      </g>

      {/* Step 4: USER UNDERSTANDS (left) */}
      <g>
        <Circle
          cx={centerX - radius}
          cy={centerY}
          r={nodeRadius}
          fill="currentColor"
          stroke="none"
        />
        <text
          x={centerX - radius}
          y={centerY + 3}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
        >
          4
        </text>
        <Label x={centerX - radius - 20} y={centerY - 6} anchor="end" fontSize={10}>
          USER UNDERSTANDS
        </Label>
        <text
          x={centerX - radius - 20}
          y={centerY + 10}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="end"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity={0.7}
        >
          sees confirmation
        </text>
      </g>

      {/* Center text */}
      <text
        x={centerX}
        y={centerY + 4}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.light}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
      >
        LOOP
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
        Feedback closes the interaction loop
      </text>
    </Illustration>
  );
}

