import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Design Engineer";
  const description = searchParams.get("description") || "";
  const type = searchParams.get("type") || "default";
  const theme = searchParams.get("theme") || "light";

  const isDark = theme === "dark";
  const isLongTitle = title.length > 40;

  // Theme colors
  const colors = {
    bg: isDark ? "#0a0a0a" : "#fafafa",
    text: isDark ? "#fafafa" : "#171717",
    muted: isDark ? "#a3a3a3" : "#737373",
    icon: isDark ? "#fafafa" : "#171717",
    badge: isDark ? "#fafafa" : "#171717",
    badgeText: isDark ? "#0a0a0a" : "#ffffff",
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.bg,
          padding: "60px",
        }}
      >
        {/* Top bar with logo and type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "auto",
          }}
        >
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 32 32"
              fill="none"
            >
              <rect
                x="0"
                y="12"
                width="12"
                height="8"
                fill={colors.icon}
                transform="rotate(45 16 16)"
              />
              <rect
                x="20"
                y="12"
                width="12"
                height="8"
                fill={colors.icon}
                transform="rotate(45 16 16)"
              />
              <rect
                x="12"
                y="0"
                width="8"
                height="12"
                fill={colors.icon}
                transform="rotate(45 16 16)"
              />
              <rect
                x="12"
                y="20"
                width="8"
                height="12"
                fill={colors.icon}
                transform="rotate(45 16 16)"
              />
              <rect
                x="10"
                y="10"
                width="12"
                height="12"
                fill="#FF4400"
                transform="rotate(45 16 16)"
              />
            </svg>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 500,
                color: colors.text,
              }}
            >
              designengineer.xyz
            </span>
          </div>

          {/* Type badge */}
          {type !== "default" && (
            <div
              style={{
                display: "flex",
                backgroundColor: type === "course" ? "#FF4400" : colors.badge,
                color: type === "course" ? "#fff" : colors.badgeText,
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {type}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "auto",
            marginBottom: "60px",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: isLongTitle ? "56px" : "72px",
              fontWeight: 400,
              color: colors.text,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: "24px",
                color: colors.muted,
                lineHeight: 1.4,
                maxWidth: "800px",
              }}
            >
              {description.length > 120
                ? description.slice(0, 120) + "..."
                : description}
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "6px",
            backgroundColor: "#FF4400",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
