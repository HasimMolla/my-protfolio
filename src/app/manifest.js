import { site } from "@/lib/data";

// Next serves this at /manifest.webmanifest and links it automatically, so the
// generator's site.webmanifest is not needed. Its name/short_name were blank
// and its colours were plain white, which doesn't match this site.
export default function manifest() {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfa",
    theme_color: "#fcfcfa",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
