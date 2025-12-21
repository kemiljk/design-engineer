import {
  Illustration,
  Rect,
  Label,
  Circle,
  Arrow,
  ILLUSTRATION_COLORS,
} from "../base/primitives";
import { GRID, CONTENT } from "../base/grid";

export function MaterialDynamicColor() {
  return (
    <Illustration
      title="Material Dynamic Color"
      description="Material You extracts colors from wallpaper to personalize the UI"
      width={GRID.width}
      height={GRID.height}
    >
      <Label x={CONTENT.centerX} y={CONTENT.top + 8} anchor="middle">
        MATERIAL YOU - DYNAMIC COLOR
      </Label>

      {/* Wallpaper Source */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.top + 32})`}>
        <text
          x={50}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          User Wallpaper
        </text>

        {/* Wallpaper frame */}
        <Rect
          x={0}
          y={12}
          width={100}
          height={80}
          fill="#7B68C9"
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Abstract shapes on wallpaper */}
        <Circle cx={30} cy={42} r={20} fill="#5E4BA8" stroke="none" />
        <Circle cx={70} cy={62} r={25} fill="#9B89D9" stroke="none" />
        <Rect x={50} y={32} width={30} height={30} fill="#A799E3" stroke="none" />

        {/* Extracted color dots */}
        <g transform="translate(0, 100)">
          <text
            x={50}
            y={0}
            fontSize={9}
            fill={ILLUSTRATION_COLORS.muted}
            textAnchor="middle"
            fontFamily="system-ui"
          >
            Extracted colors
          </text>
          <Circle cx={20} cy={16} r={8} fill="#7B68C9" stroke="none" />
          <Circle cx={40} cy={16} r={8} fill="#5E4BA8" stroke="none" />
          <Circle cx={60} cy={16} r={8} fill="#9B89D9" stroke="none" />
          <Circle cx={80} cy={16} r={8} fill="#A799E3" stroke="none" />
        </g>
      </g>

      {/* Arrow */}
      <Arrow
        x1={CONTENT.left + 120}
        y1={CONTENT.top + 90}
        x2={CONTENT.left + 160}
        y2={CONTENT.top + 90}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Tonal Palette */}
      <g transform={`translate(${CONTENT.centerX - 60}, ${CONTENT.top + 32})`}>
        <text
          x={60}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Tonal Palette
        </text>

        {/* Primary tones */}
        <text
          x={0}
          y={24}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          Primary
        </text>
        {[
          { tone: 100, color: "#FFFFFF" },
          { tone: 90, color: "#EADDFF" },
          { tone: 80, color: "#CAB9E8" },
          { tone: 40, color: "#7B68C9" },
          { tone: 20, color: "#4A3A8A" },
          { tone: 0, color: "#21005D" },
        ].map((item, i) => (
          <Rect
            key={item.tone}
            x={40 + i * 14}
            y={14}
            width={12}
            height={18}
            fill={item.color}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={0.5}
          />
        ))}

        {/* Secondary tones */}
        <text
          x={0}
          y={48}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          Secondary
        </text>
        {[
          { tone: 100, color: "#FFFFFF" },
          { tone: 90, color: "#E8DEF8" },
          { tone: 80, color: "#CCC2DC" },
          { tone: 40, color: "#625B71" },
          { tone: 20, color: "#44404C" },
          { tone: 0, color: "#1D1A22" },
        ].map((item, i) => (
          <Rect
            key={item.tone}
            x={40 + i * 14}
            y={38}
            width={12}
            height={18}
            fill={item.color}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={0.5}
          />
        ))}

        {/* Tertiary tones */}
        <text
          x={0}
          y={72}
          fontSize={8}
          fill={ILLUSTRATION_COLORS.muted}
          fontFamily="system-ui"
        >
          Tertiary
        </text>
        {[
          { tone: 100, color: "#FFFFFF" },
          { tone: 90, color: "#FFD8E4" },
          { tone: 80, color: "#EFB8C8" },
          { tone: 40, color: "#7D5260" },
          { tone: 20, color: "#5D3A46" },
          { tone: 0, color: "#31111D" },
        ].map((item, i) => (
          <Rect
            key={item.tone}
            x={40 + i * 14}
            y={62}
            width={12}
            height={18}
            fill={item.color}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={0.5}
          />
        ))}

        {/* Tone labels */}
        <g transform="translate(40, 86)">
          {[100, 90, 80, 40, 20, 0].map((tone, i) => (
            <text
              key={tone}
              x={i * 14 + 6}
              y={0}
              fontSize={6}
              fill={ILLUSTRATION_COLORS.muted}
              textAnchor="middle"
              fontFamily="system-ui"
            >
              {tone}
            </text>
          ))}
        </g>
      </g>

      {/* Arrow to App */}
      <Arrow
        x1={CONTENT.centerX + 80}
        y1={CONTENT.top + 90}
        x2={CONTENT.centerX + 120}
        y2={CONTENT.top + 90}
        stroke={ILLUSTRATION_COLORS.muted}
        strokeWidth={2}
      />

      {/* Themed App */}
      <g transform={`translate(${CONTENT.right - 100}, ${CONTENT.top + 32})`}>
        <text
          x={40}
          y={0}
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Themed App
        </text>

        {/* App frame */}
        <Rect
          x={0}
          y={12}
          width={80}
          height={130}
          fill="#FFFFFF"
          stroke={ILLUSTRATION_COLORS.dark}
          strokeWidth={2}
        />

        {/* Status bar */}
        <Rect x={2} y={14} width={76} height={8} fill="#EADDFF" stroke="none" />

        {/* App bar */}
        <Rect x={2} y={22} width={76} height={20} fill="#7B68C9" stroke="none" />
        <text
          x={40}
          y={36}
          fontSize={9}
          fill="#FFFFFF"
          textAnchor="middle"
          fontFamily="system-ui"
          fontWeight="600"
        >
          My App
        </text>

        {/* Content with themed colors */}
        <Rect x={6} y={48} width={68} height={40} fill="#EADDFF" stroke="none" />
        <Rect x={10} y={52} width={40} height={8} fill="#21005D" stroke="none" />
        <Rect x={10} y={64} width={55} height={6} fill="#625B71" stroke="none" />
        <Rect x={10} y={74} width={30} height={6} fill="#625B71" stroke="none" />

        {/* FAB */}
        <Circle cx={66} cy={124} r={14} fill="#7B68C9" stroke="none" />
        <text
          x={66}
          y={128}
          fontSize={14}
          fill="#FFFFFF"
          textAnchor="middle"
          fontFamily="system-ui"
        >
          +
        </text>

        {/* Cards */}
        <Rect x={6} y={94} width={68} height={28} fill="#F5F0FF" stroke="none" />
        <Rect x={10} y={98} width={30} height={6} fill="#4A3A8A" stroke="none" />
        <Rect x={10} y={108} width={50} height={4} fill="#625B71" stroke="none" />
      </g>

      {/* Theme modes */}
      <g transform={`translate(${CONTENT.left}, ${CONTENT.bottom - 70})`}>
        <text
          fontSize={10}
          fill={ILLUSTRATION_COLORS.dark}
          fontFamily="system-ui"
          fontWeight="600"
        >
          Theme Modes
        </text>

        {/* Light mode */}
        <g transform="translate(0, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={32}
            fill="#FFFFFF"
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <Rect x={4} y={4} width={24} height={24} fill="#7B68C9" stroke="none" />
          <text x={34} y={14} fontSize={9} fill="#21005D" fontFamily="system-ui" fontWeight="600">
            Light
          </text>
          <text x={34} y={26} fontSize={8} fill="#625B71" fontFamily="system-ui">
            Primary: Tone 40
          </text>
        </g>

        {/* Dark mode */}
        <g transform="translate(136, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={32}
            fill="#1C1B1F"
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <Rect x={4} y={4} width={24} height={24} fill="#CAB9E8" stroke="none" />
          <text x={34} y={14} fontSize={9} fill="#EADDFF" fontFamily="system-ui" fontWeight="600">
            Dark
          </text>
          <text x={34} y={26} fontSize={8} fill="#CCC2DC" fontFamily="system-ui">
            Primary: Tone 80
          </text>
        </g>

        {/* Dynamic */}
        <g transform="translate(272, 16)">
          <Rect
            x={0}
            y={0}
            width={120}
            height={32}
            fill={ILLUSTRATION_COLORS.light}
            stroke={ILLUSTRATION_COLORS.muted}
            strokeWidth={1}
          />
          <Circle cx={16} cy={16} r={12} fill="#7B68C9" stroke="none" />
          <Circle cx={16} cy={16} r={6} fill="#9B89D9" stroke="none" />
          <text x={34} y={14} fontSize={9} fill={ILLUSTRATION_COLORS.dark} fontFamily="system-ui" fontWeight="600">
            Dynamic
          </text>
          <text x={34} y={26} fontSize={8} fill={ILLUSTRATION_COLORS.muted} fontFamily="system-ui">
            From wallpaper
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
        Use color roles to automatically support dynamic color
      </text>
    </Illustration>
  );
}
