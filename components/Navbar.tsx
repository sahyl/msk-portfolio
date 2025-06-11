"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { IoIosMail } from "react-icons/io"
import { TbBrandLeetcode } from "react-icons/tb"
import { FaXTwitter } from "react-icons/fa6"
import { RiInstagramFill } from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  const [visible, setVisible] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setVisible(true)
      setIsScrolling(true)

      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      const timeout = setTimeout(() => {
        setIsScrolling(false)
        if (!isHovering) {
          setVisible(false)
        }
      }, 2000)

      setScrollTimeout(timeout)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [scrollTimeout, isHovering])

  const handleMouseEnter = () => {
    setIsHovering(true)
    setVisible(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!isScrolling) {
      const timeout = setTimeout(() => {
        setVisible(false)
      }, 1000)
      setScrollTimeout(timeout)
    }
  }

  const socialLinks = [
    { href: "https://github.com/sahyl", icon: FiGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/saaahil/", icon: FiLinkedin, label: "LinkedIn" },
    { href: "mailto:mohammedsahilkhan.msk@gmail.com", icon: IoIosMail, label: "Email" },
    { href: "https://leetcode.com/u/saaahil/", icon: TbBrandLeetcode, label: "LeetCode" },
    { href: "https://x.com/lihaskahn", icon: FaXTwitter, label: "Twitter" },
    { href: "https://instagram.com/saaahilkhaaan", icon: RiInstagramFill, label: "Instagram" },
  ]

  // Enhanced blur effect during movement
  const navbarStyle = {
    backdropFilter: isScrolling ? "blur(30px)" : "blur(20px)",
    WebkitBackdropFilter: isScrolling ? "blur(30px)" : "blur(20px)",
    transition: "backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease",
  }

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-30 print:hidden">
      <AnimatePresence>
        {(visible || isHovering) && (
          <motion.nav
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-6 py-3 liquid-glass rounded-full"
            style={navbarStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    aria-label={link.label}
                  >
                    <Icon
                      className="w-4 h-4 transition-all duration-300 hover:scale-110"
                      style={{
                        color: "var(--foreground)",
                        opacity: 0.8,
                      }}
                    />
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
