"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type PointerEvent, type FocusEvent } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, type MotionValue } from "framer-motion";
import { ThemeToggle } from "./Theme-toggle";

function ForceFieldItem({ children, pointerX }: { children: ReactNode; pointerX: MotionValue<number> }) {
  const slot = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const distance = useTransform(pointerX, (x) => {
    if (!slot.current || !Number.isFinite(x) || reduceMotion) return Infinity;
    const bounds = slot.current.getBoundingClientRect();
    return bounds.left + bounds.width / 2 - x;
  });
  const offset = useTransform(distance, (d) => Number.isFinite(d) ? d * Math.exp(-(d * d) / (2 * 48 * 48)) * 0.42 : 0);
  const lift = useTransform(distance, (d) => Number.isFinite(d) ? -5 * Math.exp(-(d * d) / (2 * 22 * 22)) : 0);
  const size = useTransform(distance, (d) => Number.isFinite(d) ? 1 + 0.3 * Math.exp(-(d * d) / (2 * 22 * 22)) : 1);
  const spring = { stiffness: 320, damping: 24, mass: 0.55 };
  const x = useSpring(offset, spring);
  const y = useSpring(lift, spring);
  const scale = useSpring(size, spring);
  return <div ref={slot} className="flex items-center justify-center" data-force-field-slot>
    <motion.div style={{ x, y, scale }} className="flex items-center justify-center" data-force-field-item>
      {children}
    </motion.div>
  </div>;
}

export function Navbar() {
  const pointerX = useMotionValue(Infinity);
  const reduceMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const visible = isScrolling || isHovering || isFocused;
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleMouseLeave = () => {
    pointerX.set(Infinity);
    setIsHovering(false);
  };

  const socialLinks = [
    { href: "https://github.com/sahyl", icon: FiGithub, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/saaahil/",
      icon: FiLinkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:mohammedsahilkhan.msk@gmail.com",
      icon: IoIosMail,
      label: "Email",
    },
    {
      href: "https://leetcode.com/u/saaahil/",
      icon: TbBrandLeetcode,
      label: "LeetCode",
    },
    { href: "https://x.com/lihaskahn", icon: FaXTwitter, label: "Twitter" },
  ];

  const navbarStyle = {
    backdropFilter: isScrolling ? "blur(30px)" : "blur(20px)",
    WebkitBackdropFilter: isScrolling ? "blur(30px)" : "blur(20px)",
    transition: "backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease",
  };

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-30 print:hidden">
          <motion.nav
            initial={{ opacity: 0, y: reduceMotion ? 0 : -20, scale: reduceMotion ? 1 : 0.95 }}
            animate={{ opacity: visible ? 1 : 0, y: visible || reduceMotion ? 0 : -20, scale: visible || reduceMotion ? 1 : 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="liquid-glass rounded-full"
            style={{
              ...navbarStyle,
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              transition: "backdrop-filter 0.4s ease-in-out",
              pointerEvents: visible ? "auto" : "none",
            }}
            aria-label="Social links and appearance"
            onPointerMove={(event: PointerEvent<HTMLElement>) => { if (event.pointerType === "mouse") pointerX.set(reduceMotion ? Infinity : event.clientX); }}
            onPointerLeave={() => pointerX.set(Infinity)}
            onMouseEnter={() => setIsHovering(true)}
            onFocus={() => setIsFocused(true)}
            onBlur={(event: FocusEvent<HTMLElement>) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex gap-4 sm:gap-6 items-center transition-all duration-300">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <ForceFieldItem key={link.label} pointerX={pointerX}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    aria-label={link.label}
                  >

                      <Icon
                        className="w-5 h-5 transition-all duration-300"
                        style={{ color: "var(--foreground)", opacity: 0.8 }}
                      />
                  </Link>
                  </ForceFieldItem>
                );
              })}
              <ForceFieldItem pointerX={pointerX}><ThemeToggle /></ForceFieldItem>
            </div>
          </motion.nav>
    </div>
  );
}
