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
      <span className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90">❤</span>
      <span className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0">
        🖤
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
