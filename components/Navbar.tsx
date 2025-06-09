"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { IoIosMail } from "react-icons/io"
import { TbBrandLeetcode } from "react-icons/tb"
import { FaXTwitter } from "react-icons/fa6"
import { RiInstagramFill } from "react-icons/ri"

export function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  const [visible, setVisible] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Make navbar visible when scrolling
      setVisible(true)
      setIsScrolling(true)

      // Clear previous timeout if it exists
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Set a new timeout to detect when scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false)

        // Only hide if not being hovered
        if (!isHovering) {
          setVisible(false)
        }
      }, 2000) // 3 seconds delay

      setScrollTimeout(timeout)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [scrollTimeout, isHovering])

  // Handle hover state changes
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)

    // If not scrolling and mouse leaves, hide after delay
    if (!isScrolling) {
      const timeout = setTimeout(() => {
        setVisible(false)
      }, 1000) // 1 second delay after mouse leaves

      setScrollTimeout(timeout)
    }
  }

  return (
    <div className="fixed top-2 left-0 right-0 flex justify-center z-30 print:hidden">
      <nav
        className={`px-4 py-2 bg-white/90 backdrop-blur-sm shadow-md rounded-full transition-all duration-300 ${
          visible || isHovering ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex space-x-5">
          <Link href="https://github.com/sahyl" target="_blank" rel="noopener noreferrer" className="social-icon-link">
            <FiGithub className="w-5 h-5 transition-all duration-300 hover:text-gray-800 hover:scale-125" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/saaahil/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
          >
            <FiLinkedin className="w-5 h-5 transition-all duration-300 hover:text-blue-600 hover:scale-125" />
          </Link>
          <Link href="mailto:mohammedsahilkhan.msk@gmail.com" className="social-icon-link">
            <IoIosMail className="w-5 h-5 transition-all duration-300 hover:text-red-500 hover:scale-125" />
          </Link>
          <Link
            href="https://leetcode.com/u/saaahil/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
          >
            <TbBrandLeetcode className="w-5 h-5 transition-all duration-300 hover:text-yellow-500 hover:scale-125" />
          </Link>
          <Link href="https://x.com/lihaskahn" target="_blank" rel="noopener noreferrer" className="social-icon-link">
            <FaXTwitter className="w-5 h-5 transition-all duration-300 hover:text-gray-800 hover:scale-125" />
          </Link>
          <Link
            href="https://instagram.com/saaahilkhaaan"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
          >
            <RiInstagramFill className="w-5 h-5 transition-all duration-300 hover:text-pink-600 hover:scale-125" />
          </Link>
        </div>
      </nav>
    </div>
  )
}
