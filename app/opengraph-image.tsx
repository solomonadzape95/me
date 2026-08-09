import { ImageResponse } from "next/og";

export const alt =
  "Solomon Adzape, also known as solenoid — software engineer and product builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f0e6",
          color: "#2b2722",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#b84932" }}>
          thesolenoid.space
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 82, letterSpacing: "-3px" }}>
            Solomon Adzape
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontFamily: "monospace",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#615a50",
            }}
          >
            Software engineer building AI, desktop, fintech, and onchain products.
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "monospace", fontSize: 24 }}>
          solenoid · product engineer
        </div>
      </div>
    ),
    size,
  );
}
