import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solomon Adzape — Software Engineer",
    short_name: "Solomon Adzape",
    description:
      "Software engineering portfolio of Solomon Adzape, also known as solenoid.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e6",
    theme_color: "#f5f0e6",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
