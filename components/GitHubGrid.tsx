"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/components/Theme-provider";

export default function GitHubGrid() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const janFirst = new Date(currentYear, 0, 1);

  return (
    <div className="py-6 px-4 sm:px-6">
    <div className="ml-2 scale-93 flex justify-center items-center transition-colors duration-300">
      <GitHubCalendar
        username="sahyl"
        blockSize={13}
        blockMargin={3}
        transformData={(contributions) =>
          contributions.filter((day) => new Date(day.date) >= janFirst)
        }
        fontSize={12}
        colorScheme={theme === "dark" ? "dark" : "light"}
        theme={{
          // LIGHT MODE → darker grid
          light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],

          // DARK MODE → lighter grid
          dark: [
            "#ebedf0",
            "#0e4429",
            "#006d32",
            "#26a641",
            "#39d353",
          ],
        }}
      />
    </div>
    </div>
  );
}
