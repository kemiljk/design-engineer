import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function ComponentStates() {
  const states = [
    { label: "DEFAULT", bgFill: ILLUSTRATION_COLORS.primary, textFill: ILLUSTRATION_COLORS.bg },
    { label: "HOVER", bgFill: "currentColor", textFill: ILLUSTRATION_COLORS.bg },
    { label: "ACTIVE", bgFill: ILLUSTRATION_COLORS.muted, textFill: ILLUSTRATION_COLORS.bg },
    { label: "FOCUS", bgFill: ILLUSTRATION_COLORS.primary, textFill: ILLUSTRATION_COLORS.bg, hasFocusRing: true },
    { label: "DISABLED", bgFill: ILLUSTRATION_COLORS.light, textFill: ILLUSTRATION_COLORS.muted },
  ];

  const buttonWidth = 56;
  const buttonHeight = 28;
  const totalWidth = states.length * buttonWidth + (states.length - 1) * 8;
  const startX = CONTENT.centerX - totalWidth / 2;
  const buttonY = CONTENT.centerY - buttonHeight / 2;

  return (
    <Illustration
      title="Component States"
      description="A button component shown in different interactive states"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        BUTTON STATES
      </Label>

      {states.map((state, index) => {
        const x = startX + index * (buttonWidth + 8);

        return (
          <g key={state.label}>
            {/* Focus ring */}
            {state.hasFocusRing && (
              <Rect
                x={x - 3}
                y={buttonY - 3}
                width={buttonWidth + 6}
                height={buttonHeight + 6}
                fill="none"
                stroke={ILLUSTRATION_COLORS.primary}
                strokeWidth={2}
              />
            )}
            
            {/* Button background */}
            <Rect
              x={x}
              y={buttonY}
              width={buttonWidth}
              height={buttonHeight}
              fill={state.bgFill}
              stroke="none"
            />
            
            {/* Button text */}
            <text
              x={x + buttonWidth / 2}
              y={buttonY + buttonHeight / 2 + 3}
              fontSize={11}
              fill={state.textFill}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="600"
            >
              Button
            </text>

            {/* State label */}
            <Label 
              x={x + buttonWidth / 2} 
              y={buttonY + buttonHeight + 24} 
              anchor="middle"
              fontSize={11}
            >
              {state.label}
            </Label>
          </g>
        );
      })}
    </Illustration>
  );
}
