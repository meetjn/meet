import { MapPin } from "lucide-react";

import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-start justify-between gap-4 border-t border-portfolio-smoke px-5 py-6 sm:flex-row sm:items-center sm:px-10 lg:px-[60px]">
      <span className="footer-name">{site.name}</span>
      <span className="footer-note flex items-center gap-2">
        <MapPin className="size-3 shrink-0" />
        {site.location}
      </span>
    </footer>
  );
}
