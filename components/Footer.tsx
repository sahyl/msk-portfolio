import Link from 'next/link'
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";





export function Footer() {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <Link href="https://github.com/sahyl" target="_blank" rel="noopener noreferrer">
            <FiGithub className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/in/saaahil/" target="_blank" rel="noopener noreferrer">
            <FiLinkedin className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="mailto:mohammedsahilkhan.msk@gmail.com">
            <IoIosMail className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://leetcode.com/u/saaahil/" target="_blank" rel="noopener noreferrer">
            <TbBrandLeetcode className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://x.com/lihaskahn" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
          <Link href="https://instagram.com/saaahilkhaaan" target="_blank" rel="noopener noreferrer">
            <RiInstagramFill className="w-6 h-6 hover:text-gray-600 transition-colors" />
          </Link>
        </div>
        <p className="text-center font-roboto text-sm">
          &copy; {new Date().getFullYear()} Mohammed Sahil Khan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

