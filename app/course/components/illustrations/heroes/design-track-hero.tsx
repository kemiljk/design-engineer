import {
  Illustration,
  Rect,
  Circle,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";

export function DesignTrackHero() {
  return (
    <Illustration
      title="Design Track"
      description="Abstract composition representing visual design principles"
      width={600}
      height={400}
      className="w-full"
    >
      <Rect x={40} y={60} width={180} height={120} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      <Rect x={40} y={200} width={80} height={80} fill="currentColor" stroke="none" />
      <Rect x={140} y={200} width={80} height={80} fill={ILLUSTRATION_COLORS.muted} stroke="none" />

      <Line x1={260} y1={60} x2={260} y2={280} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={340} y1={60} x2={340} y2={280} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={420} y1={60} x2={420} y2={280} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />

      <text x={280} y={100} fontSize={48} fill="currentColor" fontWeight="bold" fontFamily="system-ui">
        Aa
      </text>
      <text x={280} y={150} fontSize={32} fill={ILLUSTRATION_COLORS.muted} fontWeight="bold" fontFamily="system-ui">
        Bb
      </text>
      <text x={280} y={190} fontSize={24} fill={ILLUSTRATION_COLORS.muted} fontWeight="normal" fontFamily="system-ui">
        Cc
      </text>

      <Circle cx={500} cy={100} r={40} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      <Circle cx={500} cy={200} r={30} fill="currentColor" stroke="none" />
      <Circle cx={500} cy={280} r={20} fill={ILLUSTRATION_COLORS.muted} stroke="none" />

      <Rect x={40} y={310} width={520} height={8} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
      <Rect x={40} y={330} width={400} height={6} fill={ILLUSTRATION_COLORS.light} stroke="none" />
      <Rect x={40} y={346} width={300} height={6} fill={ILLUSTRATION_COLORS.light} stroke="none" />
    </Illustration>
  );
}
