import {
  Illustration,
  Rect,
  Circle,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";

export function ConvergenceTrackHero() {
  return (
    <Illustration
      title="Convergence Track"
      description="Abstract composition showing design and engineering merging together"
      width={600}
      height={400}
      className="w-full"
    >
      <Circle cx={150} cy={200} r={80} fill={ILLUSTRATION_COLORS.primary + "30"} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={2} />
      <text x={150} y={185} fontSize={14} fill={ILLUSTRATION_COLORS.primary} textAnchor="middle" fontFamily="system-ui" fontWeight="600">
        DESIGN
      </text>
      <Rect x={120} y={200} width={60} height={8} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      <Rect x={110} y={215} width={80} height={6} fill={ILLUSTRATION_COLORS.primary + "60"} stroke="none" />
      <Rect x={115} y={228} width={70} height={6} fill={ILLUSTRATION_COLORS.primary + "40"} stroke="none" />

      <Circle cx={450} cy={200} r={80} fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={2} />
      <text x={450} y={185} fontSize={14} fill="currentColor" textAnchor="middle" fontFamily="monospace" fontWeight="600">
        {"<CODE />"}
      </text>
      <Rect x={410} y={200} width={80} height={8} fill="currentColor" stroke="none" />
      <Rect x={420} y={215} width={60} height={6} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
      <Rect x={415} y={228} width={70} height={6} fill={ILLUSTRATION_COLORS.muted} stroke="none" />

      <Line x1={230} y1={180} x2={370} y2={180} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={2} />
      <Line x1={235} y1={200} x2={365} y2={200} stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1.5} />
      <Line x1={230} y1={220} x2={370} y2={220} stroke="currentColor" strokeWidth={2} />

      <Circle cx={300} cy={200} r={40} fill={ILLUSTRATION_COLORS.bg} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={3} />
      <Circle cx={300} cy={200} r={35} fill="none" stroke="currentColor" strokeWidth={2} />
      
      <Rect x={285} y={190} width={30} height={20} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      
      <Line x1={150} y1={100} x2={200} y2={130} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={300} y1={80} x2={300} y2={120} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={450} y1={100} x2={400} y2={130} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />

      <Line x1={150} y1={300} x2={200} y2={270} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={300} y1={320} x2={300} y2={280} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />
      <Line x1={450} y1={300} x2={400} y2={270} stroke={ILLUSTRATION_COLORS.light} strokeDasharray="4 4" />

      <text x={300} y={360} fontSize={12} fill={ILLUSTRATION_COLORS.muted} textAnchor="middle" fontFamily="system-ui" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
        Design Engineering
      </text>
    </Illustration>
  );
}
