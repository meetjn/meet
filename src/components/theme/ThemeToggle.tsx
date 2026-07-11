"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Dark/light switch. Both icons are always rendered and swapped with CSS
 * `dark:` variants — the server never needs to know the theme, so there is
 * no hydration flash or mounted-state dance.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle light or dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative rounded-full text-portfolio-mist hover:bg-portfolio-ash hover:text-portfolio-white"
    >
      <Sun
        className="size-[17px] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      <Moon
        className="absolute size-[17px] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
        aria-hidden
      />
    </Button>
  );
}
