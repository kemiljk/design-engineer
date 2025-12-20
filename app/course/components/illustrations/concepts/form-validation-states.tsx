import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function FormValidationStates() {
  const states = [
    { 
      name: "Default", 
      borderColor: ILLUSTRATION_COLORS.light,
      bgColor: ILLUSTRATION_COLORS.bg,
      hasError: false,
      hasSuccess: false,
    },
    { 
      name: "Focus", 
      borderColor: ILLUSTRATION_COLORS.primary,
      bgColor: ILLUSTRATION_COLORS.bg,
      hasError: false,
      hasSuccess: false,
      isFocused: true,
    },
    { 
      name: "Valid", 
      borderColor: "#22c55e",
      bgColor: ILLUSTRATION_COLORS.bg,
      hasError: false,
      hasSuccess: true,
    },
    { 
      name: "Invalid", 
      borderColor: "#ef4444",
      bgColor: ILLUSTRATION_COLORS.bg,
      hasError: true,
      hasSuccess: false,
    },
  ];

  const inputWidth = 140;
  const inputHeight = 32;
  const totalWidth = states.length * inputWidth + (states.length - 1) * 12;
  const startX = CONTENT.centerX - totalWidth / 2;
  const inputY = CONTENT.top + 56;

  return (
    <Illustration
      title="Form Validation States"
      description="Visual states for form input validation"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        FORM VALIDATION STATES
      </Label>

      {states.map((state, index) => {
        const x = startX + index * (inputWidth + 12);

        return (
          <g key={state.name}>
            {/* State label */}
            <text
              x={x + inputWidth / 2}
              y={inputY - 8}
              fontSize={12}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui"
              fontWeight="600"
            >
              {state.name.toUpperCase()}
            </text>

            {/* Input field */}
            <Rect
              x={x}
              y={inputY}
              width={inputWidth}
              height={inputHeight}
              fill={state.bgColor}
              stroke={state.borderColor}
              strokeWidth={state.isFocused ? 2 : 1.5}
            />

            {/* Placeholder/value text */}
            <text
              x={x + 10}
              y={inputY + 20}
              fontSize={11}
              fill={state.hasError || state.hasSuccess ? "currentColor" : ILLUSTRATION_COLORS.muted}
              fontFamily="system-ui"
            >
              {state.hasError ? "invalid@" : state.hasSuccess ? "user@email.com" : "email@example.com"}
            </text>

            {/* Focus ring */}
            {state.isFocused && (
              <rect
                x={x - 2}
                y={inputY - 2}
                width={inputWidth + 4}
                height={inputHeight + 4}
                fill="none"
                stroke={ILLUSTRATION_COLORS.primary}
                strokeWidth={1}
                opacity={0.3}
              />
            )}

            {/* Success icon */}
            {state.hasSuccess && (
              <g transform={`translate(${x + inputWidth - 24}, ${inputY + 8})`}>
                <circle cx="8" cy="8" r="8" fill="#22c55e" />
                <path
                  d="M5 8 L7 10 L11 6"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}

            {/* Error icon */}
            {state.hasError && (
              <g transform={`translate(${x + inputWidth - 24}, ${inputY + 8})`}>
                <circle cx="8" cy="8" r="8" fill="#ef4444" />
                <path
                  d="M5 5 L11 11 M11 5 L5 11"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Error message */}
            {state.hasError && (
              <text
                x={x}
                y={inputY + inputHeight + 16}
                fontSize={12}
                fill="#ef4444"
                fontFamily="system-ui"
              >
                Please enter a valid email
              </text>
            )}

            {/* Success message */}
            {state.hasSuccess && (
              <text
                x={x}
                y={inputY + inputHeight + 16}
                fontSize={12}
                fill="#22c55e"
                fontFamily="system-ui"
              >
                Looks good!
              </text>
            )}
          </g>
        );
      })}

      {/* Bottom tips */}
      <g>
        <text
          x={CONTENT.left}
          y={CONTENT.bottom - 16}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          • Validate on blur, clear errors on input
        </text>
        <text
          x={CONTENT.centerX + 40}
          y={CONTENT.bottom - 16}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          • Don't rely on color alone—use icons + text
        </text>
      </g>
    </Illustration>
  );
}
