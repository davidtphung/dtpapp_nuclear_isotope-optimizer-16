
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full w-8 h-8"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-gray-700" />
          ) : (
            <Sun className="h-4 w-4 text-nuclear-500" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Toggle {theme === "light" ? "dark" : "light"} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
