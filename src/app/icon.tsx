import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Transparent favicon so the tab stays blank (no Vercel / custom mark). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    ),
    { ...size },
  );
}
