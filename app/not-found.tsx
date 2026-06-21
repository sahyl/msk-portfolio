"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "@/components/Theme-provider";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundColor: "var(--card)",
      }}
    >
      {/* Outer Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#7e7e7e_1.5px,transparent_1px),linear-gradient(to_bottom,#7e7e7e_1.5px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#5f5f5f_1.5px,transparent_1px),linear-gradient(to_bottom,#5f5f5f_1.5px,transparent_1px)]"
        )}
      />

      {/* Radial gradient mask with soft blur */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)] blur-sm"></div>

      <div
        className="w-full max-w-2xl rounded-2xl relative z-10 overflow-hidden"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Inner Dotted Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />

        {/* Inner radial blur mask */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black)] opacity-70 blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-8 py-16 sm:py-20 flex flex-col items-center justify-center text-center">
          {/* 404 Error Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 animate-float"
          >
            <h1
              className="text-7xl sm:text-8xl font-bold text-black dark:text-white select-none"
              style={{
                fontFamily: "var(--font-dm-serif-text)",
                letterSpacing: "0.05em",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
              }}
            >
              404
            </h1>
          </motion.div>

          {/* Error Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-bold mb-4 text-black dark:text-white"
            style={{
              fontFamily: "var(--font-dm-serif-text)",
              letterSpacing: "0.02em",
            }}
          >
            Page Not Found
          </motion.h2>

          {/* Error Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="text-base sm:text-lg mb-8 max-w-md text-black dark:text-white font-mono tracking-wide leading-relaxed"
          >
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
          </motion.p>

          {/* Separator Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="w-24 h-1 mb-8 rounded-full animate-pulse-glow"
            style={{ backgroundColor: "#ef4444" }}
          />

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Home Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/"
                className="px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 border text-black dark:text-white hover:shadow-lg"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                ← Back to Home
              </Link>
            </motion.div>

            {/* Blog Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/#blog"
                className="px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 border text-black dark:text-white hover:shadow-lg"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                Visit Blog →
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 text-xs sm:text-sm text-black dark:text-white font-mono tracking-widest opacity-60 animate-pulse-glow"
          >
            ERROR CODE: 404
          </motion.p>
        </div>
      </div>
    </div>
  );
}
