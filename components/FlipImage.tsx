"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function FlipImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center w-36 h-36" // Ensure enough space for outer ring
    >
      {/* Rotating Ring Behind */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div
          className="w-36 h-36 rounded-full border-2 border-dashed animate-spin-slow"
          style={{
            borderColor: `var(--primary)`,
            opacity: 0.5,
            animationDuration: "20s",
          }}
        ></div>
      </div>

      {/* Flip Card */}
      <div className="w-32 h-32 rounded-full overflow-hidden group cursor-pointer relative z-10 [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          
          {/* Front Image */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div
              className="absolute inset-0 rounded-full -z-10 blur-sm"
              style={{ backgroundColor: `var(--primary)`, opacity: 0.2 }}
            ></div>
            <Image
              src="/msk.png"
              alt="Mohammed Sahil Khan - AI Portrait"
              width={128}
              height={128}
              className="object-cover w-full h-full rounded-full border-2"
              style={{ borderColor: `var(--border)` }}
              priority
            />
          </div>

          {/* Back Image */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div
              className="absolute inset-0 rounded-full -z-10 blur-sm"
              style={{ backgroundColor: `var(--primary)`, opacity: 0.2 }}
            ></div>
            <Image
              src="/sahil.jpg"
              alt="Mohammed Sahil Khan - Professional Photo"
              width={128}
              height={128}
              className="object-cover w-full h-full rounded-full border-2"
              style={{ borderColor: `var(--border)` }}
              priority
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
