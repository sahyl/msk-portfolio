"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";
import { getAllBlogPosts } from "@/lib/blog-data";

export function Blog() {
  const blogPosts = getAllBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="BLOG" color="#EF4444" />

        <div className="mt-8 relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px ml-3 md:ml-4"
            style={{ backgroundColor: `var(--primary)`, opacity: 0.25 }}
          />

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="pl-10 md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-6 h-6 rounded-full ml-0.5 md:ml-1.5 z-10 border-2 transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: `var(--primary)`,
                  }}
                />

                <Link href={`/blog/${post.slug}`} className="block group">
                  <div
                    className="p-5 rounded-2xl relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {/* Dot Background */}
                    <div
                      className={cn(
                        "absolute inset-0 z-0",
                        "[background-size:20px_20px]",
                        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                      )}
                    />

                    {/* Radial gradient mask */}
                    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-40" />

                    {/* Flashing light overlay */}
                    <motion.div
                      className="absolute inset-0 z-[1] rounded-2xl pointer-events-none overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 5,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span
                            className="text-sm font-bold font-mono tracking-widest"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h3
                            className="text-lg transition-colors duration-200 group-hover:text-[var(--primary)]"
                            style={{
                              color: "var(--primary)",
                              fontFamily: "var(--font-dm-serif-text)",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {post.title}
                          </h3>
                        </div>

                        {/* Fixed excerpt - now properly uses variable */}
                        <p
                          className="font-mono text-sm leading-relaxed tracking-wide line-clamp-2"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <p
                          className="text-xs font-mono tracking-wider whitespace-nowrap"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}