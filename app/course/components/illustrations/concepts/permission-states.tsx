import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

function LockIcon({ x, y, size = 10 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <rect
        x={size * 0.2}
        y={size * 0.45}
        width={size * 0.6}
        height={size * 0.5}
        fill="currentColor"
        rx={1}
      />
      <path
        d={`M ${size * 0.3} ${size * 0.45} L ${size * 0.3} ${size * 0.35} Q ${size * 0.3} ${size * 0.1} ${size * 0.5} ${size * 0.1} Q ${size * 0.7} ${size * 0.1} ${size * 0.7} ${size * 0.35} L ${size * 0.7} ${size * 0.45}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </g>
  );
}

export function PermissionStates() {
  const colWidth = (CONTENT.width - 40) / 3;
  const startY = CONTENT.top + 48;
  const buttonWidth = 90;
  const buttonHeight = 32;

  const states = [
    {
      label: "HIDE",
      desc: "Remove from view",
      pros: "Clean UI",
      cons: "Undiscoverable",
    },
    {
      label: "DISABLE",
      desc: "Show but prevent",
      pros: "Shows existence",
      cons: "Frustrating",
    },
    {
      label: "EXPLAIN",
      desc: "Show with context",
      pros: "Clear path forward",
      cons: "Visual complexity",
    },
  ];

  return (
    <Illustration
      title="Permission States"
      description="Three approaches to handling unavailable features: hide, disable, or explain"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        HANDLING UNAVAILABLE FEATURES
      </Label>

      {states.map((state, index) => {
        const x = CONTENT.left + 20 + index * colWidth + colWidth / 2;

        return (
          <g key={state.label}>
            {/* State label */}
            <Label x={x} y={startY - 8} anchor="middle" fontSize={11}>
              {state.label}
            </Label>

            {/* Visual demonstration */}
            <g>
              {state.label === "HIDE" && (
                <>
                  {/* Empty space with dashed outline */}
                  <Rect
                    x={x - buttonWidth / 2}
                    y={startY + 12}
                    width={buttonWidth}
                    height={buttonHeight}
                    fill="none"
                    stroke={ILLUSTRATION_COLORS.light}
                    strokeWidth={1}
                    rx={4}
                  />
                  <line
                    x1={x - buttonWidth / 2}
                    y1={startY + 12}
                    x2={x + buttonWidth / 2}
                    y2={startY + 12 + buttonHeight}
                    stroke={ILLUSTRATION_COLORS.light}
                    strokeWidth={1}
                    strokeDasharray="4 2"
                  />
                  <line
                    x1={x + buttonWidth / 2}
                    y1={startY + 12}
                    x2={x - buttonWidth / 2}
                    y2={startY + 12 + buttonHeight}
                    stroke={ILLUSTRATION_COLORS.light}
                    strokeWidth={1}
                    strokeDasharray="4 2"
                  />
                </>
              )}

              {state.label === "DISABLE" && (
                <>
                  <Rect
                    x={x - buttonWidth / 2}
                    y={startY + 12}
                    width={buttonWidth}
                    height={buttonHeight}
                    fill={ILLUSTRATION_COLORS.light}
                    stroke="none"
                    rx={4}
                  />
                  <text
                    x={x}
                    y={startY + 12 + buttonHeight / 2 + 4}
                    fontSize={10}
                    fill={ILLUSTRATION_COLORS.muted}
                    textAnchor="middle"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    opacity={0.5}
                  >
                    Export
                  </text>
                </>
              )}

              {state.label === "EXPLAIN" && (
                <>
                  <Rect
                    x={x - buttonWidth / 2}
                    y={startY + 12}
                    width={buttonWidth}
                    height={buttonHeight}
                    fill={ILLUSTRATION_COLORS.light}
                    stroke="none"
                    rx={4}
                  />
                  <g style={{ color: ILLUSTRATION_COLORS.muted }}>
                    <LockIcon x={x - 20} y={startY + 12 + buttonHeight / 2} size={10} />
                  </g>
                  <text
                    x={x + 2}
                    y={startY + 12 + buttonHeight / 2 + 4}
                    fontSize={10}
                    fill={ILLUSTRATION_COLORS.muted}
                    textAnchor="middle"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    Export
                  </text>
                  {/* Tooltip/explanation */}
                  <g>
                    <rect
                      x={x - 42}
                      y={startY + 12 + buttonHeight + 6}
                      width={84}
                      height={20}
                      fill="currentColor"
                      rx={3}
                    />
                    <polygon
                      points={`${x - 4},${startY + 12 + buttonHeight + 6} ${x + 4},${startY + 12 + buttonHeight + 6} ${x},${startY + 12 + buttonHeight + 2}`}
                      fill="currentColor"
                    />
                    <text
                      x={x}
                      y={startY + 12 + buttonHeight + 19}
                      fontSize={7}
                      fill={ILLUSTRATION_COLORS.bg}
                      textAnchor="middle"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      Upgrade to Pro
                    </text>
                  </g>
                </>
              )}
            </g>

            {/* Description */}
            <text
              x={x}
              y={startY + 85}
              fontSize={10}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {state.desc}
            </text>

            {/* Pros */}
            <text
              x={x}
              y={startY + 102}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.primary}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              + {state.pros}
            </text>

            {/* Cons */}
            <text
              x={x}
              y={startY + 116}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              − {state.cons}
            </text>
          </g>
        );
      })}

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Context determines the right approach
      </text>
    </Illustration>
  );
}

