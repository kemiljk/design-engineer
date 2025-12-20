import {
  Illustration,
  Rect,
  Line,
  ILLUSTRATION_COLORS,
} from "../base/primitives";

export function EngineeringTrackHero() {
  return (
    <Illustration
      title="Engineering Track"
      description="Abstract composition representing code and component architecture"
      width={600}
      height={400}
      className="w-full"
    >
      <text x={40} y={80} fontSize={40} fill={ILLUSTRATION_COLORS.muted} fontFamily="monospace">
        {"<"}
      </text>
      <text x={80} y={80} fontSize={40} fill={ILLUSTRATION_COLORS.primary} fontFamily="monospace" fontWeight="bold">
        Component
      </text>
      <text x={340} y={80} fontSize={40} fill={ILLUSTRATION_COLORS.muted} fontFamily="monospace">
        {"/>"}
      </text>

      <Rect x={60} y={110} width={480} height={200} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={2} />

      <Rect x={80} y={130} width={200} height={80} fill={ILLUSTRATION_COLORS.primary + "20"} stroke={ILLUSTRATION_COLORS.primary} strokeWidth={2} />
      <text x={100} y={165} fontSize={14} fill={ILLUSTRATION_COLORS.primary} fontFamily="monospace">
        {"<Header />"}
      </text>
      <Rect x={100} y={175} width={160} height={20} fill={ILLUSTRATION_COLORS.light} stroke="none" />

      <Rect x={300} y={130} width={220} height={160} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1.5} />
      <text x={320} y={155} fontSize={12} fill={ILLUSTRATION_COLORS.muted} fontFamily="monospace">
        {"<Content>"}
      </text>
      
      <Rect x={320} y={170} width={180} height={30} fill="currentColor" stroke="none" />
      <Rect x={320} y={210} width={140} height={20} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
      <Rect x={320} y={240} width={160} height={20} fill={ILLUSTRATION_COLORS.light} stroke="none" />

      <Rect x={80} y={230} width={200} height={60} fill="none" stroke={ILLUSTRATION_COLORS.muted} strokeWidth={1.5} />
      <text x={100} y={255} fontSize={12} fill={ILLUSTRATION_COLORS.muted} fontFamily="monospace">
        {"<Footer />"}
      </text>
      <Rect x={100} y={265} width={80} height={12} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
      <Rect x={190} y={265} width={80} height={12} fill={ILLUSTRATION_COLORS.light} stroke="none" />

      <Line x1={40} y1={340} x2={560} y2={340} stroke={ILLUSTRATION_COLORS.light} />
      <Rect x={40} y={355} width={100} height={8} fill={ILLUSTRATION_COLORS.primary} stroke="none" />
      <Rect x={160} y={355} width={80} height={8} fill={ILLUSTRATION_COLORS.muted} stroke="none" />
      <Rect x={260} y={355} width={120} height={8} fill={ILLUSTRATION_COLORS.light} stroke="none" />
    </Illustration>
  );
}
