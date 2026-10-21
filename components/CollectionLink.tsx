"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function CollectionLink({ href, children }: { href: string; children: ReactNode }) {
  return <div className="mt-8 text-center">
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="inline-block">
      <Link href={href} className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 border text-black dark:text-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        {children}
      </Link>
    </motion.div>
  </div>;
}
