import {
  Illustration,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ClosurePrinciple() {
  const sectionWidth = (CONTENT.width - 40) / 2;
  const leftCenterX = CONTENT.left + sectionWidth / 2;
  const rightCenterX = CONTENT.right - sectionWidth / 2;
  const centerY = CONTENT.centerY - 10;

  return (
    <Illustration
      title="Closure Principle"
      description="The brain completes incomplete shapes, seeing wholes from parts"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        GESTALT: CLOSURE
      </Label>

      {/* Left side - incomplete circle */}
      <g>
        <Label x={leftCenterX} y={CONTENT.top + 40} anchor="middle">
          INCOMPLETE
        </Label>
        
        {/* Dashed circle - brain sees it as complete */}
        <circle
          cx={leftCenterX}
          cy={centerY}
          r={40}
          fill="none"
          stroke={ILLUSTRATION_COLORS.primary}
          strokeWidth={3}
          strokeDasharray="20 12"
        />

        <text
          x={leftCenterX}
          y={centerY + 68}
          fontSize={12}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Brain sees: circle
        </text>
      </g>

      {/* Right side - Kanizsa triangle illusion */}
      <g>
        <Label x={rightCenterX} y={CONTENT.top + 40} anchor="middle">
          IMPLIED
        </Label>
        
        {/* Three pac-man shapes that create an implied triangle */}
        {[0, 1, 2].map((i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const radius = 36;
          const cx = rightCenterX + Math.cos(angle) * radius;
          const cy = centerY + Math.sin(angle) * radius;
          const pacmanRadius = 18;
          
          // Calculate the angle of the "mouth" opening toward center
          const mouthAngle = Math.atan2(centerY - cy, rightCenterX - cx);
          const mouthOpening = Math.PI / 3; // 60 degrees
          
          const startAngle = mouthAngle - mouthOpening / 2;
          const endAngle = mouthAngle + mouthOpening / 2;
          
          // Create a pac-man arc path
          const x1 = cx + pacmanRadius * Math.cos(endAngle);
          const y1 = cy + pacmanRadius * Math.sin(endAngle);
          const x2 = cx + pacmanRadius * Math.cos(startAngle);
          const y2 = cy + pacmanRadius * Math.sin(startAngle);
          
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${pacmanRadius} ${pacmanRadius} 0 1 0 ${x2} ${y2} Z`}
              fill={ILLUSTRATION_COLORS.primary}
            />
          );
        })}

        {/* Dotted triangle outline to show what brain perceives */}
        <polygon
          points={`${rightCenterX},${centerY - 36} ${rightCenterX - 31},${centerY + 18} ${rightCenterX + 31},${centerY + 18}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        <text
          x={rightCenterX}
          y={centerY + 68}
          fontSize={12}
          fill="currentColor"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Brain sees: triangle
        </text>
      </g>

      {/* Bottom explanation */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom}
        fontSize={12}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        We perceive complete shapes even when parts are missing
      </text>
    </Illustration>
  );
}
