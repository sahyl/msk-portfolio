"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/components/Theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GitHubGrid() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const janFirst = new Date(currentYear, 0, 1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-6 px-4 sm:px-6"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ minHeight: 190 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex justify-center items-center
           overflow-x-auto overflow-y-hidden
           sm:overflow-x-visible sm:overflow-y-visible
           -mx-4 sm:mx-0 px-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative rounded-xl p-4 backdrop-blur-sm bg-card/50 shadow-lg transition-all duration-300 min-w-[max-content] overflow-y-hidden"
          >
            {/* Dot Background (copied from ProjectCard) */}
            <div
              className={`
                absolute inset-0 z-0
                [background-size:20px_20px]
                ${
                  theme === "dark"
                    ? "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                    : "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"
                }
                transition-colors duration-200 ease-out
              `}
            />

            {/* Radial gradient mask */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50 transition-all duration-200 ease-out"></div>

            {/* GitHub Calendar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative z-10"
            >
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
                  light: [
                    "#161b22",
                    "#0e4429",
                    "#006d32",
                    "#26a641",
                    "#39d353",
                  ],
                  dark: ["#ebedf0", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
              />
            </motion.div>

            {/* Flashing light effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
