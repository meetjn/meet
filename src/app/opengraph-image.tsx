import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Meet Jain — product infrastructure & financial systems engineering";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #05070c 0%, #0a1628 45%, #0d2818 100%)",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          M
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 20,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          meetjain.xyz
        </span>
      </div>
      <div
        style={{
          fontSize: 62,
          fontWeight: 600,
          color: "white",
          lineHeight: 1.08,
          maxWidth: 920,
        }}
      >
        Meet Jain
      </div>
      <div
        style={{
          fontSize: 28,
          color: "rgba(52, 211, 153, 0.95)",
          marginTop: 18,
          fontWeight: 500,
        }}
      >
        Co-founder · Fintech & financial systems
      </div>
      <div
        style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.62)",
          marginTop: 22,
          maxWidth: 820,
          lineHeight: 1.45,
        }}
      >
        Platform engineering, lending infrastructure & payment systems
      </div>
    </div>,
    { ...size },
  );
}
