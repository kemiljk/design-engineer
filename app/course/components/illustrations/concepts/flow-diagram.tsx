import {
  Illustration,
  Rect,
  Arrow,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

interface FlowDiagramProps {
  steps?: string[];
  activeStep?: number;
}

export function FlowDiagram({
  steps = ["Input", "Process", "Validate", "Output"],
  activeStep = 1,
}: FlowDiagramProps) {
  const boxW = 72;
  const boxH = 36;
  const gap = 24;
  const totalWidth = steps.length * boxW + (steps.length - 1) * gap;
  const startX = CONTENT.centerX - totalWidth / 2;
  const centerY = CONTENT.centerY;

  return (
    <Illustration
      title="Process Flow Diagram"
      description="Horizontal process flow showing connected steps"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 16} anchor="middle">
        PROCESS FLOW
      </Label>

      {steps.map((step, index) => {
        const x = startX + index * (boxW + gap);
        const isActive = index === activeStep;

        return (
          <g key={step}>
            <Rect
              x={x}
              y={centerY - boxH / 2}
              width={boxW}
              height={boxH}
              fill={isActive ? ILLUSTRATION_COLORS.primary : "none"}
              stroke={isActive ? ILLUSTRATION_COLORS.primary : "currentColor"}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <text
              x={x + boxW / 2}
              y={centerY + 4}
              fontSize={11}
              fill={isActive ? ILLUSTRATION_COLORS.bg : "currentColor"}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {step}
            </text>

            {/* Arrow to next step */}
            {index < steps.length - 1 && (
              <Arrow
                x1={x + boxW + 4}
                y1={centerY}
                x2={x + boxW + gap - 4}
                y2={centerY}
                stroke={ILLUSTRATION_COLORS.muted}
              />
            )}
          </g>
        );
      })}

      <Label x={CONTENT.centerX} y={CONTENT.bottom - 16} anchor="middle">
        {`STEP ${activeStep + 1} OF ${steps.length}`}
      </Label>
    </Illustration>
  );
}
