"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[300]">
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant={"ghost"}
        className={"flex items-center gap-1.5"}
      >
        <span>
          {theme === "dark" ? (
            <Sun className={"size-4"} />
          ) : (
            <Moon className={"size-4"} />
          )}
        </span>
        <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
      </Button>
    </div>
  );
}; 