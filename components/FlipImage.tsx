"use client"

import Image from "next/image"

export default function FlipImage() {
  return (
    <div className="flex items-center justify-center py-8 bg-white-100">
      <div className="w-32 h-32 mb-4 rounded-full overflow-hidden animate-scale-up print:!opacity-100 print:!transform-none group perspective-1000 cursor-pointer">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
          {/* Front Image */}
          <div className="absolute inset-0 backface-hidden">
            <Image
              src="/msk.png"
              alt="Front Image"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Back Image */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <Image
              src="/sahil.jpg"
              alt="Back Image"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
