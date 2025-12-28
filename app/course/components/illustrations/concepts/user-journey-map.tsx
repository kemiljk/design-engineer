import {
  Illustration,
  Circle,
  Line,
  Label,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

const stages = [
  { label: "Discover", emoji: "🔍", sentiment: "neutral" },
  { label: "Evaluate", emoji: "🤔", sentiment: "low" },
  { label: "Try", emoji: "⚡", sentiment: "high" },
  { label: "Use", emoji: "✨", sentiment: "high" },
  { label: "Return", emoji: "🔄", sentiment: "neutral" },
];

const touchpoints = ["Ad", "Landing", "Signup", "App", "Email"];

export function UserJourneyMap() {
  const chartLeft = CONTENT.left + 50;
  const chartWidth = CONTENT.width - 70;
  const stageWidth = chartWidth / stages.length;
  const timelineY = CONTENT.centerY + 15;
  const sentimentRange = 45;

  const getSentimentY = (sentiment: string) => {
    switch (sentiment) {
      case "high":
        return timelineY - sentimentRange;
      case "low":
        return timelineY + sentimentRange * 0.7;
      default:
        return timelineY - sentimentRange * 0.3;
    }
  };

  return (
    <Illustration
      title="User Journey Map"
      description="Mapping the user experience across touchpoints: discover, evaluate, try, use, return"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 12} anchor="middle">
        USER JOURNEY MAP
      </Label>

      {/* Sentiment axis */}
      <g>
        <text
          x={CONTENT.left + 24}
          y={timelineY - sentimentRange + 4}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          😊
        </text>
        <text
          x={CONTENT.left + 24}
          y={timelineY + sentimentRange * 0.7 + 4}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          😟
        </text>
        <Line
          x1={CONTENT.left + 40}
          y1={timelineY - sentimentRange - 5}
          x2={CONTENT.left + 40}
          y2={timelineY + sentimentRange * 0.7 + 10}
          stroke={ILLUSTRATION_COLORS.light}
          strokeWidth={1}
          strokeDasharray="2 2"
        />
      </g>

      {/* Horizontal timeline */}
      <Line
        x1={chartLeft}
        y1={timelineY}
        x2={chartLeft + chartWidth}
        y2={timelineY}
        stroke={ILLUSTRATION_COLORS.light}
        strokeWidth={2}
      />

      {/* Journey curve - smooth bezier */}
      <path
        d={stages
          .map((stage, i) => {
            const x = chartLeft + i * stageWidth + stageWidth / 2;
            const y = getSentimentY(stage.sentiment);
            if (i === 0) return `M ${x} ${y}`;
            const prevX = chartLeft + (i - 1) * stageWidth + stageWidth / 2;
            const prevY = getSentimentY(stages[i - 1].sentiment);
            const cpX = (prevX + x) / 2;
            return `C ${cpX} ${prevY} ${cpX} ${y} ${x} ${y}`;
          })
          .join(" ")}
        fill="none"
        stroke={ILLUSTRATION_COLORS.primary}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Stage markers and labels */}
      {stages.map((stage, index) => {
        const x = chartLeft + index * stageWidth + stageWidth / 2;
        const sentimentY = getSentimentY(stage.sentiment);
        const isLow = stage.sentiment === "low";

        return (
          <g key={stage.label}>
            {/* Vertical connector */}
            <Line
              x1={x}
              y1={timelineY}
              x2={x}
              y2={sentimentY}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1}
              strokeDasharray="2 2"
            />

            {/* Timeline dot */}
            <Circle
              cx={x}
              cy={timelineY}
              r={3}
              fill={ILLUSTRATION_COLORS.bg}
              stroke={ILLUSTRATION_COLORS.light}
              strokeWidth={1.5}
            />

            {/* Sentiment dot */}
            <Circle
              cx={x}
              cy={sentimentY}
              r={5}
              fill={ILLUSTRATION_COLORS.primary}
              stroke="none"
            />

            {/* Emoji - positioned above or below based on sentiment */}
            <text
              x={x}
              y={isLow ? sentimentY + 20 : sentimentY - 12}
              fontSize={11}
              textAnchor="middle"
            >
              {stage.emoji}
            </text>

            {/* Stage label */}
            <text
              x={x}
              y={timelineY + 18}
              fontSize={10}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="500"
            >
              {stage.label}
            </text>
          </g>
        );
      })}

      {/* Touchpoints row */}
      <g>
        <text
          x={CONTENT.left + 24}
          y={timelineY + 70}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
        >
          Touch
        </text>
        {touchpoints.map((tp, i) => (
          <g key={tp}>
            <rect
              x={chartLeft + i * stageWidth + stageWidth / 2 - 24}
              y={timelineY + 58}
              width={48}
              height={18}
              fill={ILLUSTRATION_COLORS.light}
              rx={3}
            />
            <text
              x={chartLeft + i * stageWidth + stageWidth / 2}
              y={timelineY + 70}
              fontSize={9}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {tp}
            </text>
          </g>
        ))}
      </g>

      {/* Bottom caption */}
      <text
        x={CONTENT.centerX}
        y={CONTENT.bottom - 8}
        fontSize={10}
        fill={ILLUSTRATION_COLORS.muted}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Map emotions and touchpoints to reveal experience gaps
      </text>
    </Illustration>
  );
}

