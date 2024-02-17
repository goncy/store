"use client";

import {useTheme} from "next-themes";

import {Button} from "@/components/ui/button";

export default function ThemeToggle() {
  const {setTheme, theme} = useTheme();

  return (
    <Button
      className="p-1"
      size="sm"
      variant="ghost"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <span className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">❤</span>
      <span className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
        🖤
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
