import {
  Illustration,
  Rect,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function NavigationPatterns() {
  const sectionWidth = (CONTENT.width - 24) / 3;

  return (
    <Illustration
      title="Navigation Patterns"
      description="Common navigation UI patterns: tabs, breadcrumbs, sidebar"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        NAVIGATION PATTERNS
      </Label>

      {/* Section 1: Tabs */}
      <g>
        <text
          x={CONTENT.left + sectionWidth / 2}
          y={CONTENT.top + 40}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          TABS
        </text>

        {/* Tab bar */}
        <Rect
          x={CONTENT.left}
          y={CONTENT.top + 52}
          width={sectionWidth}
          height={80}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Tab items */}
        <Rect
          x={CONTENT.left + 4}
          y={CONTENT.top + 56}
          width={40}
          height={24}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text x={CONTENT.left + 24} y={CONTENT.top + 72} fontSize={11} fill={ILLUSTRATION_COLORS.bg} textAnchor="middle" fontFamily="system-ui" fontWeight="600">
          Home
        </text>

        <Rect
          x={CONTENT.left + 48}
          y={CONTENT.top + 56}
          width={40}
          height={24}
          fill="none"
          stroke="none"
        />
        <text x={CONTENT.left + 68} y={CONTENT.top + 72} fontSize={11} fill={ILLUSTRATION_COLORS.muted} textAnchor="middle" fontFamily="system-ui">
          About
        </text>

        <Rect
          x={CONTENT.left + 92}
          y={CONTENT.top + 56}
          width={40}
          height={24}
          fill="none"
          stroke="none"
        />
        <text x={CONTENT.left + 112} y={CONTENT.top + 72} fontSize={11} fill={ILLUSTRATION_COLORS.muted} textAnchor="middle" fontFamily="system-ui">
          Work
        </text>

        {/* Content area placeholder */}
        <Rect
          x={CONTENT.left + 8}
          y={CONTENT.top + 88}
          width={sectionWidth - 16}
          height={36}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        <text
          x={CONTENT.left + sectionWidth / 2}
          y={CONTENT.top + 148}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Peer navigation
        </text>
      </g>

      {/* Section 2: Breadcrumbs */}
      <g>
        <text
          x={CONTENT.centerX}
          y={CONTENT.top + 40}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          BREADCRUMBS
        </text>

        {/* Breadcrumb container */}
        <Rect
          x={CONTENT.left + sectionWidth + 12}
          y={CONTENT.top + 52}
          width={sectionWidth}
          height={80}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Breadcrumb items */}
        <text
          x={CONTENT.left + sectionWidth + 20}
          y={CONTENT.top + 72}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.primary}
          fontFamily="system-ui"
        >
          Home
        </text>
        <text
          x={CONTENT.left + sectionWidth + 52}
          y={CONTENT.top + 72}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          /
        </text>
        <text
          x={CONTENT.left + sectionWidth + 62}
          y={CONTENT.top + 72}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.primary}
          fontFamily="system-ui"
        >
          Products
        </text>
        <text
          x={CONTENT.left + sectionWidth + 108}
          y={CONTENT.top + 72}
          fontSize={11}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          /
        </text>
        <text
          x={CONTENT.left + sectionWidth + 118}
          y={CONTENT.top + 72}
          fontSize={11}
          fill="currentColor"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Item
        </text>

        {/* Content area */}
        <Rect
          x={CONTENT.left + sectionWidth + 20}
          y={CONTENT.top + 88}
          width={sectionWidth - 16}
          height={36}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        <text
          x={CONTENT.centerX}
          y={CONTENT.top + 148}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Hierarchical location
        </text>
      </g>

      {/* Section 3: Sidebar */}
      <g>
        <text
          x={CONTENT.right - sectionWidth / 2}
          y={CONTENT.top + 40}
          fontSize={12}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          SIDEBAR
        </text>

        {/* Sidebar container */}
        <Rect
          x={CONTENT.right - sectionWidth}
          y={CONTENT.top + 52}
          width={sectionWidth}
          height={80}
          fill="none"
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Sidebar nav */}
        <Rect
          x={CONTENT.right - sectionWidth}
          y={CONTENT.top + 52}
          width={36}
          height={80}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Nav items */}
        <Rect
          x={CONTENT.right - sectionWidth + 4}
          y={CONTENT.top + 58}
          width={28}
          height={16}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <Rect
          x={CONTENT.right - sectionWidth + 4}
          y={CONTENT.top + 78}
          width={28}
          height={16}
          fill="none"
          stroke="none"
        />
        <Rect
          x={CONTENT.right - sectionWidth + 4}
          y={CONTENT.top + 98}
          width={28}
          height={16}
          fill="none"
          stroke="none"
        />

        {/* Content area */}
        <Rect
          x={CONTENT.right - sectionWidth + 44}
          y={CONTENT.top + 60}
          width={sectionWidth - 52}
          height={64}
          fill={ILLUSTRATION_COLORS.bg}
          stroke="none"
        />

        <text
          x={CONTENT.right - sectionWidth / 2}
          y={CONTENT.top + 148}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Persistent sections
        </text>
      </g>

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 4}
        fontSize={11}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Choose based on content hierarchy and user mental models
      </text>
    </Illustration>
  );
}
