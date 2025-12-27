import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function TokenPipeline() {
  const boxWidth = 110;
  const boxHeight = 40;
  const verticalGap = 20;
  const horizontalGap = 56;

  // Vertical flow positions - use full SVG height
  const centerX = GRID.width / 2;
  const startY = 48;

  const steps = [
    { label: "Figma Variables", y: startY, icon: "figma" },
    { label: "Export JSON", y: startY + boxHeight + verticalGap, icon: "json" },
    { label: "Style Dictionary", y: startY + 2 * (boxHeight + verticalGap), icon: "transform" },
  ];

  const outputs = [
    { label: "CSS", x: centerX - horizontalGap - boxWidth / 2, icon: "css" },
    { label: "JS/TS", x: centerX + horizontalGap + boxWidth / 2, icon: "js" },
  ];

  const outputY = startY + 3 * (boxHeight + verticalGap);

  return (
    <Illustration
      title="Token Pipeline"
      description="How tokens flow from design to code"
      width={GRID.width}
      height={GRID.height}
    >
      {/* Title */}
      <Label x={GRID.width / 2} y={24} anchor="middle">
        DESIGN-TO-CODE TOKEN PIPELINE
      </Label>

      {/* Main vertical flow */}
      {steps.map((step, index) => (
        <g key={step.label}>
          {/* Box */}
          <Rect
            x={centerX - boxWidth / 2}
            y={step.y}
            width={boxWidth}
            height={boxHeight}
            fill={index === 0 ? ILLUSTRATION_COLORS.primary : ILLUSTRATION_COLORS.light}
            rx={6}
          />

          {/* Label */}
          <text
            x={centerX}
            y={step.y + boxHeight / 2 + 4}
            fontSize={11}
            fill={index === 0 ? "#ffffff" : ILLUSTRATION_COLORS.dark}
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="600"
          >
            {step.label}
          </text>

          {/* Arrow to next step */}
          {index < steps.length - 1 && (
            <g>
              <line
                x1={centerX}
                y1={step.y + boxHeight + 4}
                x2={centerX}
                y2={step.y + boxHeight + verticalGap - 4}
                stroke={ILLUSTRATION_COLORS.muted}
                strokeWidth={1.5}
              />
              <path
                d={`M ${centerX - 4} ${step.y + boxHeight + verticalGap - 8} L ${centerX} ${step.y + boxHeight + verticalGap - 4} L ${centerX + 4} ${step.y + boxHeight + verticalGap - 8}`}
                fill="none"
                stroke={ILLUSTRATION_COLORS.muted}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </g>
      ))}

      {/* Split arrows to outputs */}
      <g>
        {/* Left branch */}
        <path
          d={`M ${centerX} ${steps[2].y + boxHeight + 4} 
              L ${centerX} ${steps[2].y + boxHeight + 12}
              L ${outputs[0].x} ${steps[2].y + boxHeight + 12}
              L ${outputs[0].x} ${outputY - 4}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1.5}
        />
        <path
          d={`M ${outputs[0].x - 4} ${outputY - 8} L ${outputs[0].x} ${outputY - 4} L ${outputs[0].x + 4} ${outputY - 8}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right branch */}
        <path
          d={`M ${centerX} ${steps[2].y + boxHeight + 12}
              L ${outputs[1].x} ${steps[2].y + boxHeight + 12}
              L ${outputs[1].x} ${outputY - 4}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1.5}
        />
        <path
          d={`M ${outputs[1].x - 4} ${outputY - 8} L ${outputs[1].x} ${outputY - 4} L ${outputs[1].x + 4} ${outputY - 8}`}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Output boxes */}
      {outputs.map((output) => (
        <g key={output.label}>
          <Rect
            x={output.x - boxWidth / 2}
            y={outputY}
            width={boxWidth}
            height={boxHeight}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
            rx={6}
          />
          <text
            x={output.x}
            y={outputY + boxHeight / 2 + 4}
            fontSize={11}
            fill={ILLUSTRATION_COLORS.dark}
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="600"
          >
            {output.label}
          </text>
        </g>
      ))}

      {/* File format hints */}
      <text
        x={outputs[0].x}
        y={outputY + boxHeight + 16}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="monospace"
      >
        variables.css
      </text>
      <text
        x={outputs[1].x}
        y={outputY + boxHeight + 16}
        fontSize={9}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="monospace"
      >
        tokens.ts
      </text>

      {/* Bottom note */}
      <text
        x={GRID.width / 2}
        y={GRID.height - 20}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Single source of truth → Multiple output formats
      </text>
    </Illustration>
  );
}

