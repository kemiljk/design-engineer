import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Design Engineer Course";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const [instrumentSerifData, hostGroteskData] = await Promise.all([
    fetch(
      new URL("https://fonts.gstatic.com/s/instrumentserif/v4/jizBRFtNs2ka5fXjeivQ4LroWlx-2zIZj1bIkNo.woff")
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("https://fonts.gstatic.com/s/hostgrotesk/v3/Ug8IH5l7TP2eBFt-YolX7PgKuDqpZK7-uh8zpVmVrBQ.woff")
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
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

          <div
            style={{
              display: "flex",
              backgroundColor: "#FF4400",
              color: "#fff",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Course
          </div>
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
              fontSize: "72px",
              fontFamily: "Instrument Serif",
              fontWeight: 400,
              color: "#171717",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Become a Design Engineer
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#737373",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            Master the intersection of design and engineering. Build beautiful, functional products for Web, iOS, and Android.
          </p>
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
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerifData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Host Grotesk",
          data: hostGroteskData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
