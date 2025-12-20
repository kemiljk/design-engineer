import {
  Illustration,
  Rect,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function IaHierarchy() {
  const nodeWidth = 56;
  const nodeHeight = 20;
  const vGap = 28;
  const hGap = 12;

  // Tree structure
  const root = { x: CONTENT.centerX - nodeWidth / 2, y: CONTENT.top + 44, label: "Home" };
  const level1 = [
    { x: CONTENT.left + 30, label: "Products" },
    { x: CONTENT.centerX - nodeWidth / 2, label: "About" },
    { x: CONTENT.right - nodeWidth - 30, label: "Contact" },
  ].map((n, i) => ({ ...n, y: root.y + vGap + nodeHeight }));

  const level2Products = [
    { label: "Category A" },
    { label: "Category B" },
  ];
  const level2About = [
    { label: "Team" },
    { label: "Company" },
  ];

  return (
    <Illustration
      title="Information Architecture"
      description="Site map showing hierarchical content organization"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        INFORMATION ARCHITECTURE
      </Label>

      {/* Root node */}
      <g>
        <Rect
          x={root.x}
          y={root.y}
          width={nodeWidth}
          height={nodeHeight}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={root.x + nodeWidth / 2}
          y={root.y + nodeHeight / 2 + 4}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
        >
          {root.label}
        </text>
      </g>

      {/* Lines from root to level 1 */}
      {level1.map((node) => (
        <Line
          key={node.label}
          x1={root.x + nodeWidth / 2}
          y1={root.y + nodeHeight}
          x2={node.x + nodeWidth / 2}
          y2={node.y}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
      ))}

      {/* Level 1 nodes */}
      {level1.map((node, i) => (
        <g key={node.label}>
          <Rect
            x={node.x}
            y={node.y}
            width={nodeWidth}
            height={nodeHeight}
            fill="currentColor"
            stroke="none"
          />
          <text
            x={node.x + nodeWidth / 2}
            y={node.y + nodeHeight / 2 + 4}
            fontSize={11}
            fill={ILLUSTRATION_COLORS.bg}
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* Level 2 - Products children */}
      {level2Products.map((child, i) => {
        const parentX = level1[0].x + nodeWidth / 2;
        const parentY = level1[0].y + nodeHeight;
        const childX = level1[0].x - 20 + i * (nodeWidth + hGap - 10);
        const childY = parentY + vGap;

        return (
          <g key={child.label}>
            <Line
              x1={parentX}
              y1={parentY}
              x2={childX + nodeWidth / 2}
              y2={childY}
              stroke={ILLUSTRATION_COLORS.muted}
              strokeWidth={1}
            />
            <Rect
              x={childX}
              y={childY}
              width={nodeWidth}
              height={nodeHeight}
              fill={ILLUSTRATION_COLORS.muted}
              stroke="none"
            />
            <text
              x={childX + nodeWidth / 2}
              y={childY + nodeHeight / 2 + 3}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {child.label}
            </text>
          </g>
        );
      })}

      {/* Level 2 - About children */}
      {level2About.map((child, i) => {
        const parentX = level1[1].x + nodeWidth / 2;
        const parentY = level1[1].y + nodeHeight;
        const childX = level1[1].x - 20 + i * (nodeWidth + hGap - 10);
        const childY = parentY + vGap;

        return (
          <g key={child.label}>
            <Line
              x1={parentX}
              y1={parentY}
              x2={childX + nodeWidth / 2}
              y2={childY}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
            />
            <Rect
              x={childX}
              y={childY}
              width={nodeWidth}
              height={nodeHeight}
              fill={ILLUSTRATION_COLORS.muted}
              stroke="none"
            />
            <text
              x={childX + nodeWidth / 2}
              y={childY + nodeHeight / 2 + 3}
              fontSize={10}
              fill={ILLUSTRATION_COLORS.bg}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {child.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g>
        <text
          x={CONTENT.centerX}
          y={CONTENT.bottom - 16}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Hierarchy depth: 3 levels | Clear parent-child relationships
        </text>
      </g>
    </Illustration>
  );
}
