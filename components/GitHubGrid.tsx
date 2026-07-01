"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { useTheme } from "@/components/Theme-provider";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function GitHubGrid() {
  const { theme } = useTheme();
  const username = "sahyl";

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalContributions, setTotalContributions] = useState(0);
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [loading]);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const data = await res.json();

        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        let total = 0;

        data.contributions.forEach((day: ContributionDay) => {
          total += day.count;
          currentWeek.push(day);
          if (currentWeek.length === 7) {
            weeks.push({ days: currentWeek });
            currentWeek = [];
          }
        });

        if (currentWeek.length) {
          weeks.push({ days: currentWeek });
        }

        setContributions(weeks);
        setTotalContributions(total);

        if (data.contributions.length) {
          setYear(new Date(data.contributions[0].date).getFullYear());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  const monthLabels = useMemo(() => {
    if (!contributions.length) return [];

    const labels: { month: string; position: number }[] = [];
    let lastMonth = -1;

    contributions.forEach((week, index) => {
      const date = new Date(week.days[0].date);
      const month = date.getMonth();

      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], position: index });
        lastMonth = month;
      }
    });

    return labels;
  }, [contributions]);

  function getLevelColor(level: number) {
    if (theme === "light") {
      switch (level) {
        case 0: return "#ebedf0";
        case 1: return "#9be9a8";
        case 2: return "#40c463";
        case 3: return "#30a14e";
        case 4: return "#216e39";
        default: return "#ebedf0";
      }
    }

    switch (level) {
      case 0: return "#161b22";
      case 1: return "#0e4429";
      case 2: return "#006d32";
      case 3: return "#26a641";
      case 4: return "#39d353";
      default: return "#161b22";
    }
  }

  function handleMouseEnter(
    day: ContributionDay,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({
      day,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  }

  function handleMouseLeave() {
    setHoveredDay(null);
  }

  const tooltip =
    hoveredDay &&
    mounted &&
    createPortal(
      <div
        className="fixed z-[9999] px-3 py-2 rounded-md text-xs bg-black text-white shadow-lg pointer-events-none"
        style={{
          left: hoveredDay.x,
          top: hoveredDay.y,
          transform: "translate(-50%,-100%)",
        }}
      >
        {hoveredDay.day.count} contribution
        {hoveredDay.day.count !== 1 && "s"} on {hoveredDay.day.date}
      </div>,
      document.body
    );

  if (loading) {
    return (
      <section className="py-10 px-4">
        <div className="rounded-xl p-6 bg-card animate-pulse h-56" />
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-4 px-4 sm:px-6"
      transition={{ duration: 0.6 }}
      className="py-10 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="GITHUB" color="#f97316" />
        <div className="mt-8">
          <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-xl p-4 backdrop-blur-sm bg-card/50 shadow-xl min-w-max overflow-hidden"
          >
            <div
              className={`absolute inset-0 z-0
              [background-size:20px_20px]
              ${
                theme === "dark"
                  ? "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                  : "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"
              }`}
            />

            <div className="pointer-events-none absolute inset-0 bg-white dark:bg-black opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
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
                  dark: ["#ffffff", "#0e4429", "#006d32", "#26a641", "#39d353"],
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto overflow-y-hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                <div className="flex flex-col min-w-max">
                  {/* Month Labels */}
                  <div className="flex text-xs mb-2">
                    {monthLabels.map((label) => (
                      <div key={label.position} style={{ width: 52 }}>
                        {label.month}
                      </div>
                    ))}
                  </div>

                  {/* Calendar */}
                  <div className="flex gap-[3px]">
                    {contributions.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {week.days.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            onMouseEnter={(e) => handleMouseEnter(day, e)}
                            onMouseLeave={handleMouseLeave}
                            className="rounded-[2px] transition-all hover:scale-125 cursor-pointer"
                            style={{
                              width: 10,
                              height: 10,
                              background: getLevelColor(day.level),
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-4 text-xs">
                    <span>
                      {totalContributions.toLocaleString()} contributions in{" "}
                      {year}
                    </span>

                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          style={{
                            width: 10,
                            height: 10,
                            background: getLevelColor(level),
                          }}
                          className="rounded-[2px]"
                        />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
        </div>
      </div>

      {tooltip}
    </motion.section>
  );
}


// "use client";

// import { GitHubCalendar } from "react-github-calendar";
// import { useTheme } from "@/components/Theme-provider";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function GitHubGrid() {
//   const { theme } = useTheme();
//   const currentYear = new Date().getFullYear();
//   const janFirst = new Date(currentYear, 0, 1);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="py-10 px-4 sm:px-6"
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={theme}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           style={{ minHeight: 190 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//           className="flex justify-center items-center
//            overflow-x-auto overflow-y-hidden
//            sm:overflow-x-visible sm:overflow-y-visible
//            -mx-4 sm:mx-0 px-4"
//         >
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.2 }}
//             className="relative rounded-xl p-4 backdrop-blur-sm bg-card/50 shadow-lg transition-all duration-300 min-w-[max-content] overflow-y-hidden"
//           >
//             {/* Dot Background (copied from ProjectCard) */}
//             <div
//               className={`
//                 absolute inset-0 z-0
//                 [background-size:20px_20px]
//                 ${
//                   theme === "dark"
//                     ? "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
//                     : "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"
//                 }
//                 transition-colors duration-200 ease-out
//               `}
//             />

//             {/* Radial gradient mask */}
//             <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-50 transition-all duration-200 ease-out"></div>

//             {/* GitHub Calendar */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: mounted ? 1 : 0 }}
//               transition={{ delay: 0.2, duration: 0.4 }}
//               className="relative z-10"
//             >
//               <GitHubCalendar
//                 username="sahyl"
//                 blockSize={13}
//                 blockMargin={3}
//                 transformData={(contributions) =>
//                   contributions.filter((day) => new Date(day.date) >= janFirst)
//                 }
//                 fontSize={12}
//                 colorScheme={theme === "dark" ? "dark" : "light"}
//                 theme={{
//                   light: [
//                     "#161b22",
//                     "#0e4429",
//                     "#006d32",
//                     "#26a641",
//                     "#39d353",
//                   ],
//                   dark: ["#ebedf0", "#0e4429", "#006d32", "#26a641", "#39d353"],
//                 }}
//               />
//             </motion.div>

//             {/* Flashing light effect */}
//             <motion.div
//               className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none overflow-hidden"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
//                 animate={{ x: ["-100%", "100%"] }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   repeatDelay: 5,
//                   ease: "easeInOut",
//                 }}
//               />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>
//     </motion.section>
//   );
// }
