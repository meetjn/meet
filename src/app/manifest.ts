import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Writing & Tools`,
    short_name: site.name,
    description:
      "Backend engineering and distributed systems, drawn out one diagram at a time.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0908",
    theme_color: "#0A0908",
    icons: [
      {
        src: "/icon-empty.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
