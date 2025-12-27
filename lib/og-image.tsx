import { ImageResponse } from "next/og";

type OGImageProps = {
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: "primary" | "dark";
};

async function loadFonts() {
  // Fetch TTF fonts - next/og requires TTF or OTF format (not WOFF/WOFF2)
  // Swiss typography: single sans-serif family with multiple weights
  const [hostGroteskRegular, hostGroteskBold] = await Promise.all([
    // Host Grotesk Regular for body text
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/host-grotesk@latest/latin-400-normal.ttf"
    ).then((res) => res.arrayBuffer()),
    // Host Grotesk Bold for headings
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/host-grotesk@latest/latin-700-normal.ttf"
    ).then((res) => res.arrayBuffer()),
  ]);

  return [
    {
      name: "Host Grotesk",
      data: hostGroteskRegular,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "Host Grotesk",
      data: hostGroteskBold,
      style: "normal" as const,
      weight: 700 as const,
    },
  ];
}

function OGImageTemplate({
  title,
  description,
  badge,
  badgeColor = "dark",
}: OGImageProps) {
  const isLongTitle = title.length > 40;
  const badgeBg = badgeColor === "primary" ? "#FF4400" : "#171717";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        padding: "60px",
        fontFamily: "Host Grotesk",
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0"
              y="12"
              width="12"
              height="8"
              fill="#171717"
              transform="rotate(45 16 16)"
            />
            <rect
              x="20"
              y="12"
              width="12"
              height="8"
              fill="#171717"
              transform="rotate(45 16 16)"
            />
            <rect
              x="12"
              y="0"
              width="8"
              height="12"
              fill="#171717"
              transform="rotate(45 16 16)"
            />
            <rect
              x="12"
              y="20"
              width="8"
              height="12"
              fill="#171717"
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
              color: "#171717",
              letterSpacing: "-0.02em",
            }}
          >
            designengineer.xyz
          </span>
        </div>

        {badge && (
          <div
            style={{
              display: "flex",
              backgroundColor: badgeBg,
              color: "#fff",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {badge}
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
        <h1
          style={{
            fontSize: isLongTitle ? "56px" : "72px",
            fontFamily: "Host Grotesk",
            fontWeight: 700,
            color: "#171717",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: "900px",
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              fontSize: "24px",
              color: "#737373",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {description.length > 120
              ? description.slice(0, 120) + "..."
              : description}
          </p>
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
  );
}

export async function generateOGImage({
  title,
  description,
  badge,
  badgeColor = "dark",
}: OGImageProps) {
  const fonts = await loadFonts();

  return new ImageResponse(
    <OGImageTemplate
      title={title}
      description={description}
      badge={badge}
      badgeColor={badgeColor}
    />,
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
