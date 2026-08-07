import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Meet Jain — writing on backend engineering and distributed systems";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0908",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: "linear-gradient(to bottom, #F6F2EA, #4C453C)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#F6F2EA",
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <span>Writing</span>
          <span style={{ color: "#2C2620" }}>—</span>
          <span style={{ color: "#98908F" }}>meetjain.xyz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#F6F2EA",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Systems, explained.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#D0C9BD",
              marginTop: 26,
              maxWidth: 860,
              lineHeight: 1.5,
            }}
          >
            Backend engineering and distributed systems, drawn out one diagram
            at a time.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "#98908F",
          }}
        >
          <span style={{ color: "#F6F2EA" }}>Meet Jain</span>
          <span>Lead Backend Engineer · Payments infrastructure</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
