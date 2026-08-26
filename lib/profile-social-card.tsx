import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const profileCardAlt =
  "Solenoid profile lockup with Solomon Adzape's illustrated avatar";
export const profileCardSize = { width: 1200, height: 630 };
export const profileCardContentType = "image/png";

const publicFile = (...parts: string[]) =>
  path.join(process.cwd(), "public", ...parts);

const selera = readFile(publicFile("fonts", "selera-regular.ttf"));

const mapleMono = readFile(publicFile("fonts", "maple-mono-medium.ttf"));

const avatar = readFile(publicFile("avatar.jpeg")).then(
  (data) => `data:image/jpeg;base64,${data.toString("base64")}`,
);

export const createProfileSocialCard = async () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090909",
          color: "#f4f2ec",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 54,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 42 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={await avatar}
              alt=""
              width="168"
              height="168"
              style={{
                width: 168,
                height: 168,
                borderRadius: 999,
                objectFit: "cover",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Selera",
                fontSize: 168,
                lineHeight: 1,
                letterSpacing: "0.025em",
                textTransform: "lowercase",
              }}
            >
              solenoid
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              background: "rgba(244, 242, 236, 0.16)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Maple Mono",
              fontSize: 24,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#aaa79f",
            }}
          >
            <span>software engineer</span>
            <span>thesolenoid.space</span>
          </div>
        </div>
      </div>
    ),
    {
      ...profileCardSize,
      fonts: [
        { name: "Selera", data: await selera, weight: 400 },
        { name: "Maple Mono", data: await mapleMono, weight: 500 },
      ],
    },
  );
