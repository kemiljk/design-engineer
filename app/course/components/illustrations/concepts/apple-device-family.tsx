import {
  Illustration,
  Rect,
  Label,
  Circle,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function AppleDeviceFamily() {
  return (
    <Illustration
      title="Apple Device Family"
      description="Design considerations for iPhone, iPad, and Apple Watch"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        APPLE DEVICE FAMILY
      </Label>

      {/* iPhone */}
      <g transform={`translate(${CONTENT.left + 20}, ${CONTENT.top + 32})`}>
        <text
          x={35}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          iPhone
        </text>

        {/* iPhone Frame */}
        <Rect
          x={0}
          y={10}
          width={70}
          height={140}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />
        
        {/* Notch */}
        <Rect
          x={20}
          y={10}
          width={30}
          height={12}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />

        {/* Screen content placeholder */}
        <Rect
          x={4}
          y={28}
          width={62}
          height={100}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Tab bar */}
        <Rect
          x={4}
          y={130}
          width={62}
          height={16}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Labels */}
        <text
          x={35}
          y={168}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          375-430pt
        </text>
        <text
          x={35}
          y={180}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Compact Width
        </text>
      </g>

      {/* iPad */}
      <g transform={`translate(${CONTENT.centerX - 80}, ${CONTENT.top + 32})`}>
        <text
          x={80}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          iPad
        </text>

        {/* iPad Frame */}
        <Rect
          x={0}
          y={10}
          width={160}
          height={120}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Camera dot */}
        <Circle
          cx={80}
          cy={18}
          r={3}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />

        {/* Sidebar */}
        <Rect
          x={4}
          y={26}
          width={36}
          height={100}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Content area */}
        <Rect
          x={44}
          y={26}
          width={112}
          height={100}
          fill={ILLUSTRATION_COLORS.light}
          stroke="none"
        />

        {/* Content columns */}
        <Rect
          x={48}
          y={30}
          width={50}
          height={92}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />
        <Rect
          x={102}
          y={30}
          width={50}
          height={92}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.muted}
          strokeWidth={1}
        />

        {/* Labels */}
        <text
          x={80}
          y={148}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          744-1024pt
        </text>
        <text
          x={80}
          y={160}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Regular Width
        </text>
      </g>

      {/* Apple Watch */}
      <g transform={`translate(${CONTENT.right - 90}, ${CONTENT.top + 32})`}>
        <text
          x={35}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Watch
        </text>

        {/* Watch Frame */}
        <Rect
          x={5}
          y={10}
          width={60}
          height={72}
          fill={ILLUSTRATION_COLORS.bg}
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Rounded screen */}
        <Rect
          x={9}
          y={14}
          width={52}
          height={64}
          fill={ILLUSTRATION_COLORS.dark}
          stroke="none"
        />

        {/* Content */}
        <text
          x={35}
          y={38}
          fontSize={14}
          fill={ILLUSTRATION_COLORS.bg}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="bold"
        >
          10:30
        </text>
        <Rect
          x={15}
          y={48}
          width={40}
          height={8}
          fill={ILLUSTRATION_COLORS.primary}
          stroke="none"
        />
        <text
          x={35}
          y={70}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Activity
        </text>

        {/* Crown */}
        <Rect
          x={65}
          y={30}
          width={6}
          height={20}
          fill={ILLUSTRATION_COLORS.muted}
          stroke="none"
        />

        {/* Labels */}
        <text
          x={35}
          y={100}
          fontSize={9}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          162-205pt
        </text>
        <text
          x={35}
          y={112}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui"
        >
          Glanceable
        </text>
      </g>

      {/* Design patterns row */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.bottom - 90})`}>
        <text
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Navigation Patterns
        </text>

        {/* iPhone pattern */}
        <g transform="translate(0, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={24}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={16} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Tab Bar (iPhone)
          </text>
        </g>

        {/* iPad pattern */}
        <g transform="translate(136, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={24}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={16} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Sidebar (iPad)
          </text>
        </g>

        {/* Watch pattern */}
        <g transform="translate(272, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={24}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <text x={8} y={16} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui">
            Vertical List (Watch)
          </text>
        </g>
      </g>

      {/* Bottom note */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 4}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        Optimize for each form factor, don&apos;t just scale
      </text>
    </Illustration>
  );
}
